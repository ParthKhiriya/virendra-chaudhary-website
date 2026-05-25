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

      // Find group-hover: and add group-active: and group-focus:
      const regexGroup = /group-hover:([a-zA-Z0-9_\-\[\]/]+)/g;
      content = content.replace(regexGroup, (match, p1) => {
        return `${match} group-active:${p1} group-focus:${p1}`;
      });

      // Find hover: and add active: and focus: 
      const regexHover = /(?<!group-)hover:([a-zA-Z0-9_\-\[\]/]+)/g;
      content = content.replace(regexHover, (match, p1) => {
        return `${match} active:${p1} focus:${p1}`;
      });

      // Also add tabIndex={0} to any element with a group class so it can receive focus on touch
      const groupRegex = /className=(["'`])([^"'`]*\bgroup\b[^"'`]*)\1/g;
      content = content.replace(groupRegex, (match) => {
        // Only add tabIndex if it's not already there in the line
        if (match.includes('tabIndex')) return match;
        return `tabIndex={0} ${match}`;
      });
      
      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

try {
  processDir('./src');
  console.log("Successfully added touch variants to all files!");
} catch (e) {
  console.error("Error:", e);
}
