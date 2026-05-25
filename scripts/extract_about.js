import fs from 'fs';

const html = fs.readFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/.system_generated/steps/862/content.md', 'utf-8');

// simple regex to extract text inside paragraph and heading tags, or just extract text using regex
let result = '';

const matches = html.matchAll(/<(h[1-6]|p|li|td)[^>]*>(.*?)<\/\1>/gi);
for (const match of matches) {
    let text = match[2].replace(/<[^>]+>/g, '').trim();
    if (text.length > 5) {
        result += text + '\n\n';
    }
}

fs.writeFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/scratch/about_content.txt', result);
console.log('Extracted to about_content.txt');
