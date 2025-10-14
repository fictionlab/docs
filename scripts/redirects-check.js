#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');

const argv = yargs(hideBin(process.argv))
  .option('ref', {
    alias: 'r',
    type: 'string',
    description: 'Ref to compare',
    default: 'HEAD',
  })
  .option('base', {
    alias: 'b',
    type: 'string',
    description: 'Base ref to compare against',
    default: 'origin/development',
  })
  .help()
  .alias('help', 'h').argv;

const compareRef = argv.ref;
const baseBranch = argv.base;
console.log(`Comparing ${compareRef} against ${baseBranch}`);

function pathToUrl(path) {
  // Normalize Windows backslashes to forward slashes
  let p = path.replace(/\\/g, '/');

  // Handle versioned docs like:
  // integrations_versioned_docs/version-noetic/[rest]  -> /integrations/noetic/[rest]
  const versionedMatch = p.match(/^([^\/]+)_versioned_docs\/version-([^\/]+)\/(.*)$/);
  if (versionedMatch) {
    const category = versionedMatch[1];
    const versionName = versionedMatch[2];
    const rest = versionedMatch[3];
    let canonical = `/${category}/${versionName}/${rest}`;
    canonical = canonical
      .replace(/\.mdx?$/, '')
      .replace(/\/index$/, '');
    let parts = canonical.split('/');
    // Remove duplicate last part (e.g., /foo/bar/bar -> /foo/bar)
    if (parts.length >= 2 && parts.at(-1) === parts.at(-2)) {
      parts.pop();
    }
    return parts.join('/');
  }

  const canonicalUrl =
    '/' +
    p
      .replace(/^docs\//, '')
      .replace(/\.mdx?$/, '')
      .replace(/\/index$/, '');

  parts = canonicalUrl.split('/');

  // Remove duplicate last part (e.g., /foo/bar/bar -> /foo/bar)
  if (parts.length >= 2 && parts.at(-1) === parts.at(-2)) {
    parts.pop();
  }

  return parts.join('/');
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

// include both docs/ and any *_versioned_docs/ pathspecs
const diff = execSync(
  `git diff --name-status ${baseBranch}...${compareRef} -- docs/ '*_versioned_docs/'`,
)
  .toString()
  .trim()
  .split('\n');

let added = [];
let deleted = [];
if (diff.length === 1 && diff[0] === '') {
  console.log('No added or deleted pages');
  process.exit(0);
}

diff.forEach((line) => {
  const [status, file1, file2] = line.split(/\s+/);
  if ((file1 && (file1.endsWith('.md') || file1.endsWith('.mdx'))) || (file2 && (file2.endsWith('.md') || file2.endsWith('.mdx')))) {
    // For rename operations file1 -> file2
    if (file1 && (file1.endsWith('.md') || file1.endsWith('.mdx'))) {
      if (status === 'A') added.push(pathToUrl(file1));
      if (status === 'D') deleted.push(pathToUrl(file1));
    }
    if (status && status.startsWith('R')) {
      // file1 is old path, file2 is new path
      if (file1 && (file1.endsWith('.md') || file1.endsWith('.mdx'))) deleted.push(pathToUrl(file1));
      if (file2 && (file2.endsWith('.md') || file2.endsWith('.mdx'))) added.push(pathToUrl(file2));
    }
    // For pure add where file2 is present instead of file1 (rare with this git format),
    // ensure we capture it:
    if (status === 'A' && file2 && (file2.endsWith('.md') || file2.endsWith('.mdx'))) {
      if (!file1 || file1 === '') added.push(pathToUrl(file2));
    }
  }
});

// Remove pages that either:
//  * are both in added and deleted. For example, /foo/bar/index.mdx renamed to /foo/bar/bar.mdx
//  * have a name starting with an underscore. For example, /foo/bar/_baz.mdx (these are usually template or utility pages)
const intersection = added.filter((url) => deleted.includes(url));
added = added
  .filter((url) => !intersection.includes(url))
  .filter((url) => !url.split('/').at(-1).startsWith('_'));
deleted = deleted
  .filter((url) => !intersection.includes(url))
  .filter((url) => !url.split('/').at(-1).startsWith('_'));

console.log('Added pages:');
added.forEach((url) => console.log(`  ${url}`));
console.log('Deleted pages:');
deleted.forEach((url) => console.log(`  ${url}`));

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
