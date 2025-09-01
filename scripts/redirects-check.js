const fs = require('fs');
const { execSync } = require('child_process');

const baseBranch = process.argv[2] || 'origin/development';
console.log(`Comparing against ${baseBranch}...HEAD`);

function pathToUrl(path) {
  return (
    '/' +
    path
      .replace(/^docs\//, '')
      .replace(/\.mdx?$/, '')
      .replace(/\/index$/, '/')
  );
}

function parseRedirects(file) {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => {
      const [from, to, code] = line.split(/\s+/);
      return { from, to, code };
    });
}

function matchRedirect(url, redirects) {
  return redirects.find((r) => {
    if (r.from.includes('*')) {
      const regex = new RegExp('^' + r.from.replace('*', '.*') + '$');
      return regex.test(url);
    }
    return r.from === url;
  });
}

const diff = execSync(`git diff --name-status ${baseBranch}...HEAD -- docs/`)
  .toString()
  .trim()
  .split('\n');

const added = [];
const deleted = [];
if (diff.length === 1 && diff[0] === '') {
  console.log('No added or deleted pages');
  process.exit(0);
}

diff.forEach((line) => {
  const [status, file] = line.split(/\s+/);
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    if (status === 'A') added.push(pathToUrl(file));
    if (status === 'D') deleted.push(pathToUrl(file));
  }
});

const redirects = parseRedirects('static/_redirects');
let foundProblems = 0;

deleted.forEach((url) => {
  if (!matchRedirect(url, redirects)) {
    console.warn(`Missing redirect for deleted page: ${url}`);
    foundProblems = 1;
  }
});

added.forEach((url) => {
  if (matchRedirect(url, redirects)) {
    console.warn(`Potential conflicting redirect for new page: ${url}`);
    foundProblems = 1;
  }
});

if (foundProblems)
  console.log('Problems found with redirects for added or deleted pages');
else
  console.log('All redirects specified correctly for added or deleted pages');

process.exit(foundProblems);
