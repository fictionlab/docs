import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";

/**
 * Automatically detect documentation directories.
 * Includes "docs" + any folder ending with "_versioned_docs".
 */
function detectDocsDirs(root = ".") {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const docsDirs = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === "docs" || entry.name.endsWith("_versioned_docs")) {
        docsDirs.push(entry.name);
      }
    }
  }

  if (docsDirs.length === 0) {
    console.warn("⚠️ No documentation directories found.");
  } else {
    console.log(`📚 Found documentation sources: ${docsDirs.join(", ")}`);
  }

  return docsDirs;
}

/**
 * Recursively build a tree structure of documentation content.
 * @param {string} dir - Directory path to scan
 * @returns {Array} Tree structure
 */
function buildTree(dir) {
  console.log(`📂 Scanning directory: ${dir}`);

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const tree = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // If folder → recurse
    if (entry.isDirectory()) {
      console.log(`📁 Entering folder: ${entry.name}`);
      tree.push({
        type: "folder",
        name: entry.name,
        path: fullPath,
        children: buildTree(fullPath),
      });
    }

    // If .md or .mdx file → extract frontmatter
    else if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
      console.log(`📝 Reading file: ${entry.name}`);
      const content = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(content);

      tree.push({
        type: "file",
        name: entry.name,
        path: fullPath,
        frontmatter: data,
      });
    }
  }

  return tree;
}

/**
 * Main process — automatically detects documentation directories
 * and generates a full tree with frontmatter data.
 */
console.log("🚀 Starting documentation tree generation...");

const ROOT_DIR = ".";
const OUTPUT_FILE = "docs-tree.json";
const detectedDirs = detectDocsDirs(ROOT_DIR);

const allDocs = [];

for (const dir of detectedDirs) {
  console.log(`🔎 Processing documentation source: ${dir}`);
  const tree = buildTree(dir);
  allDocs.push({
    source: dir,
    tree,
  });
}

fs.writeJsonSync(OUTPUT_FILE, allDocs, { spaces: 2 });
console.log(`✅ Documentation tree successfully written to ${OUTPUT_FILE}`);
