const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const hiPath = path.join(__dirname, 'src/locales/hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

enData.translation.hero.subtitle = "A life — that walked alongside society.";
hiData.translation.hero.subtitle = "एक जीवन — जो समाज के साथ चला।";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2));

console.log("Hero subtitle updated successfully!");
