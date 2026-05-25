const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/.system_generated/steps/1240/content.md', 'utf8');
const dom = new JSDOM(content);
const document = dom.window.document;

// Extract images
const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && src.includes('wp-content/uploads'));
const baseImgs = [...new Set(images)].filter(src => !src.match(/-\d+x\d+\./));

console.log("Total unique base images found:", baseImgs.length);
console.log(baseImgs.slice(0, 5)); // show first 5

// Extract categories or text if any
const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, .vc_custom_heading')).map(h => h.textContent.trim()).filter(Boolean);
console.log("Headings:", [...new Set(headings)]);
