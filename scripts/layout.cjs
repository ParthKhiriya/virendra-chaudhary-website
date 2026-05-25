const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('C:/Users/khiri/.gemini/antigravity/brain/25ed33ca-f84a-432c-8167-d52d2e8c2c9e/.system_generated/steps/1082/content.md', 'utf8');
const dom = new JSDOM(content);
const document = dom.window.document;

const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6, .vc_custom_heading')).filter(el => {
  return /जनपक्ष फेलोशिप कार्यक्रम|संविधान ज्ञान प्रतियोगिता|जनपक्ष सम्मेलन|राजदीप सरदेसाई पुस्तक विमोचन/i.test(el.textContent);
});

headings.forEach((heading, idx) => {
  if(idx === 0) { // Just look at the first initiative to understand structure
    let row = heading.closest('.vc_row');
    if (row) {
      console.log(row.outerHTML);
    }
  }
});
