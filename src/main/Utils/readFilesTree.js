const fs = require("fs");
const path = require("path");

/**
 * Traverse the file tree starting from a given path and print it.
 * @param {string} currentPath - The path from which the file tree will be generated.
 * @param {string} prefix - The current indentation.
 * @param {string[]} ignoreList - The list of files to ignore.
 */
function traverseFiles(currentPath, ignoreList = [], prefix = "") {
  // Error handling to check path existence
  if (!fs.existsSync(currentPath)) {
    console.log("The provided path does not exist");
    return;
  }

  const files = fs.readdirSync(currentPath);

  for (const file of files) {
    // Ignore files in the ignore list
    if (ignoreList.includes(file)) {
      continue;
    }

    const curPath = path.join(currentPath, file);

    if (fs.lstatSync(curPath).isDirectory()) {
      console.log(`${prefix}|_ ${file}`);
      traverseFiles(curPath, ignoreList, prefix + "   ");
    } else {
      console.log(`${prefix}|_ ${file}`);
    }
  }
}

const folderPath = "./";

// Convert relative path to absolute path
const absolutePath = path.resolve(folderPath);

// Get the name of the folder
const folderName = absolutePath.split("/").pop();
console.log(folderName);

// Use of the function
traverseFiles(folderPath, [
  "node_modules",
  ".git",
  ".github",
  ".gitignore",
  "dist",
  "docs",
  "scripts",
  "LICENSE.txt",
  "README.md",
  "package-lock.json",
  "tests",
]);
