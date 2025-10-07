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

const diff = execSync(
  `git diff --name-status ${baseBranch}...${compareRef} -- docs/`,
)
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

console.log("Added pages:");
added.forEach((url) => console.log(`  ${url}`));
console.log("Deleted pages:");
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
