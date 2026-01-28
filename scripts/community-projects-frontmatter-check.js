const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

// Define the keys that must be present in the front matter.
const REQUIRED_KEYS = [
  'title',
  'description',
  'authors',
  'tags',
  'image',
  'company',
];

// Path to your MDX files for community projects.
const DOCS_PATHS = ['communityProjects/**/*.mdx'];

function validateFrontMatter() {
  const filePaths = DOCS_PATHS.flatMap((pattern) => glob.sync(pattern));
  const errors = [];

  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    // Check for required keys
    REQUIRED_KEYS.forEach((key) => {
      if (!data[key]) {
        errors.push(`Missing key '${key}' in ${filePath}`);
      }
    });
  });

  if (errors.length > 0) {
    console.error('Validation Errors:');
    errors.forEach((error) => console.error(error));
    process.exit(1);
  } else {
    console.log('All community project files have valid front matter.');
  }
}

validateFrontMatter();
