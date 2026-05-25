import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let originalContent = content;

      // Remove group-active:xyz and group-focus:xyz
      content = content.replace(/ group-active:[a-zA-Z0-9_\-\[\]/]+/g, '');
      content = content.replace(/ group-focus:[a-zA-Z0-9_\-\[\]/]+/g, '');

      // Remove active:xyz and focus:xyz
      content = content.replace(/ active:[a-zA-Z0-9_\-\[\]/]+/g, '');
      content = content.replace(/ focus:[a-zA-Z0-9_\-\[\]/]+/g, '');
      
      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

try {
  processDir('./src');
  console.log("Successfully removed touch variants!");
} catch (e) {
  console.error("Error:", e);
}
