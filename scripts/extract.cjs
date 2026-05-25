const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/.system_generated/steps/1082/content.md', 'utf8');
const dom = new JSDOM(content);
const document = dom.window.document;

// The initiatives might be in rows or headings
const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6, .vc_custom_heading')).filter(el => {
  return /जनपक्ष फेलोशिप कार्यक्रम|संविधान ज्ञान प्रतियोगिता|जनपक्ष सम्मेलन|राजदीप सरदेसाई पुस्तक विमोचन/i.test(el.textContent);
});

const results = {};

headings.forEach(heading => {
  // Find the closest parent row or section
  let container = heading.closest('.vc_row') || heading.closest('section') || heading.parentElement;
  
  if (container) {
    const title = heading.textContent.trim();
    if (!results[title]) {
        const imgs = Array.from(container.querySelectorAll('img')).map(img => img.src);
        const baseImgs = [...new Set(imgs)].filter(src => src && !src.match(/-\d+x\d+\./) && src.includes('wp-content/uploads'));
        if (baseImgs.length > 0) {
            results[title] = baseImgs;
        }
    }
  }
});

console.log(JSON.stringify(results, null, 2));
