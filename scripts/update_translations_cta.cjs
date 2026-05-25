const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const hiPath = path.join(__dirname, 'src/locales/hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

enData.translation.cta = {
  subtitle: "Contribute to society building",
  title: "Service - A Natural Extension",
  desc: "With the people, for the people - this has been the basis of social work.",
  button: "View Social Work"
};

hiData.translation.cta = {
  subtitle: "समाज निर्माण में सहयोग करें",
  title: "सेवा - एक स्वाभाविक विस्तार",
  desc: "लोगों के साथ, लोगों के लिए - यही सामाजिक कार्य का आधार रहा है।",
  button: "सामाजिक कार्य देखें"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2));

console.log("Translations updated successfully for CTA!");
