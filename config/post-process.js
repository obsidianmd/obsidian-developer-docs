const fs = require('fs/promises');
const path = require('path');

// Set the folder path
const folderPath = '../en/Reference/TypeScript API/';
const sourceDir = folderPath;
const targetDir = folderPath;

// Read the folder contents
async function renameFiles(folderPath) {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      // Step 1: Replace escaped backtick with normal backtick
      try {
        let filePath = path.join(folderPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const newContent = fileContent.replace(/\\`/g, '`');
        await fs.writeFile(filePath, newContent, 'utf-8');
        console.log(`Replaced all occurrences of escaped backtick with backtick in: ${filePath}`);
      } catch (err) {
        console.error(`Error processing file: ${err.message}`);
      }

      // Remove index
      if (file === 'index.md') {
        await fs.unlink(folderPath + file);
      }

      // Step 2: Remove all "obsidian." prefixes
      if (file.startsWith('obsidian.') && file.endsWith('.md')) {
        const newFileName = file.replace('obsidian.', '').replace('Plugin_2', 'Plugin');
        const oldFilePath = path.join(folderPath, file);
        const newFilePath = path.join(folderPath, newFileName);

        // Rename the file
        try {
          await fs.rename(oldFilePath, newFilePath);
          console.log(`Successfully renamed: ${file} to ${newFileName}`);

          // Step 2: add alias so links still work
          const fileContent = await fs.readFile(newFilePath, 'utf-8');
          let newFileContent = `---
alias: "${file}"
cssClass: hide-title
---

`+ fileContent;

          // Somehow we still get Plugin_2 even if `obsidian.d.ts` doesn't contain any reference to it
          newFileContent = newFileContent.replace('Plugin_2', 'Plugin');
          await fs.writeFile(newFilePath, newFileContent, 'utf-8');
        } catch (err) {
          console.error(`Error renaming file: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
}

// Step 3: Organize files into folders by separating by '.'
async function createDirectoryIfNotExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (err) {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function moveFileToHierarchy(filePath) {
  const fileName = path.basename(filePath, '.md');
  const [category, ...nameParts] = fileName.split('.');
  if (nameParts.length === 0) {
    return;
  }
  const name = nameParts.join('.');

  const targetCategoryDir = path.join(targetDir, category);
  await createDirectoryIfNotExists(targetCategoryDir);

  const targetPath = path.join(targetCategoryDir, `${name}.md`);
  await fs.rename(filePath, targetPath);
}

async function folderExists(folderPath) {
  try {
    const stats = await fs.stat(folderPath);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

async function organizeIntoFolders() {
  await createDirectoryIfNotExists(targetDir);

  try {
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(sourceDir, file);
        await moveFileToHierarchy(filePath);
      }
    }

    const remainingFiles = await fs.readdir(sourceDir);
    for (const file of remainingFiles) {
      if (!file.endsWith('.md')) {
        continue;
      }

      const fileName = path.basename(file, '.md');

      if (await folderExists(path.join(sourceDir, fileName))) {
        const filePath = path.join(sourceDir, file);
        const targetPath = path.join(sourceDir, fileName, file)
        await fs.rename(filePath, targetPath);
        console.log('Moved ', filePath, ' to ', targetPath);
      }
    }

  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
}

async function main() {
  await renameFiles(folderPath);;
  await organizeIntoFolders();
}

main();