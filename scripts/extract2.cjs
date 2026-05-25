const fs = require('fs');
const content = fs.readFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/.system_generated/steps/1398/content.md', 'utf8');
const regex = /<img[^>]+src=["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg))["']/gi;
let match;
const images = new Set();
while ((match = regex.exec(content)) !== null) {
  images.add(match[1]);
}
console.log([...images].join('\n'));
