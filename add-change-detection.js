const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function walk(dir) {
  let results = [];
  const list = await readdir(dir);
  for (let file of list) {
    file = path.resolve(dir, file);
    const fileStat = await stat(file);
    if (fileStat && fileStat.isDirectory()) {
      results = results.concat(await walk(file));
    } else {
      if (file.endsWith('.component.ts')) {
        results.push(file);
      }
    }
  }
  return results;
}

async function processFiles() {
  const files = await walk(path.join(__dirname, 'angular-frontend', 'src', 'app'));
  let updatedCount = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Check if ChangeDetectionStrategy is in the file
    if (!content.includes('ChangeDetectionStrategy.OnPush')) {
      // Find @Component({
      const componentRegex = /@Component\s*\(\s*\{/;
      if (componentRegex.test(content)) {
        content = content.replace(componentRegex, '@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,');
        changed = true;
      }
    }

    // If we added it, ensure it is imported
    if (changed) {
      // Check if ChangeDetectionStrategy is imported
      const importRegex = /import\s+\{([^}]*)\}\s+from\s+['"]@angular\/core['"]/;
      const match = content.match(importRegex);
      if (match) {
        const imports = match[1];
        if (!imports.includes('ChangeDetectionStrategy')) {
          const newImports = imports + ', ChangeDetectionStrategy';
          content = content.replace(match[0], `import {${newImports}} from '@angular/core'`);
        }
      } else {
         // This means we might not have matched the import nicely, let's just prepend if not present
         if (!content.includes('ChangeDetectionStrategy')) {
            content = `import { ChangeDetectionStrategy } from '@angular/core';\n` + content;
         }
      }
      fs.writeFileSync(file, content, 'utf8');
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} files with ChangeDetectionStrategy.OnPush`);
}

processFiles().catch(console.error);