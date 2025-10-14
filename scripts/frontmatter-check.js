const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Define the keys that must be present in the front matter.
const REQUIRED_KEYS = [
  'title',
  'sidebar_label',
  'keywords',
  'description',
  'image',
];

// Path to your MDX files.
const DOCS_PATHS = [
  'docs/**/*.mdx',
  '*_versioned_docs/**/*.mdx',
];

function validateFrontMatter() {
  const filePaths = DOCS_PATHS.flatMap((pattern) => glob.sync(pattern));
  const errors = [];

  for (const filePath of filePaths) {
    // Rule: Exclude files starting with an underscore.
    if (path.basename(filePath).startsWith('_')) {
      console.log(`- Skipping file: ${filePath}`);
      continue;
    }

    // Rule: Exclude files in the guidelines category
    if (filePath.includes('docs\\guidelines') || filePath.includes('docs/guidelines')) {
      console.log(`- Skipping guideline: ${filePath}`);
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter } = matter(fileContent);

    const missingKeys = REQUIRED_KEYS.filter((key) => !(key in frontMatter));

    if (missingKeys.length > 0) {
      errors.push({
        file: filePath,
        missing: missingKeys,
      });
    }
  }

  if (errors.length > 0) {
    console.error('Front matter validation failed!');
    errors.forEach((error) => {
      console.error(`\nFile: ${error.file}`);
      console.error(`  Missing keys: ${error.missing.join(', ')}`);
    });
    // Exit with a non-zero exit code to fail the CI job.
    process.exit(1);
  } else {
    console.log('All MDX files have the required front matter keys.');
  }
}

validateFrontMatter();
