const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en.json');
const hiPath = path.join(__dirname, 'src/locales/hi.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

enData.translation.about.pointers = [
  {
    title: "Birth & Early Education",
    desc: "Born in a simple family environment, laid a strong foundation through early education."
  },
  {
    title: "Global Technical Studies",
    desc: "Pursued higher education from India to Australia to expand technical knowledge."
  },
  {
    title: "Teaching & Telecom",
    desc: "Promoted innovation and development by being active in the education and telecommunications sector."
  },
  {
    title: "Industry & Entrepreneurship",
    desc: "Worked on job creation and economic empowerment through entrepreneurship."
  },
  {
    title: "Educational Institutions",
    desc: "Established and supported educational institutions for quality education."
  },
  {
    title: "Social Leadership",
    desc: "Prioritized responsible leadership and public service for the upliftment of society."
  }
];

hiData.translation.about.pointers = [
  {
    title: "जन्म और प्रारंभिक शिक्षा",
    desc: "सरल पारिवारिक परिवेश में जन्म लेकर प्रारंभिक शिक्षा के माध्यम से मजबूत बुनियाद रखी।"
  },
  {
    title: "भारत से ऑस्ट्रेलिया तक तकनीकी अध्ययन",
    desc: "तकनीकी ज्ञान के विस्तार हेतु भारत से ऑस्ट्रेलिया तक उच्च शिक्षा प्राप्त की।"
  },
  {
    title: "शिक्षण और दूरसंचार क्षेत्र",
    desc: "शिक्षा और दूरसंचार क्षेत्र में सक्रिय रहकर नवाचार और विकास को बढ़ावा दिया।"
  },
  {
    title: "उद्योग व उद्यमिता",
    desc: "उद्यमिता के माध्यम से रोजगार सृजन और आर्थिक सशक्तिकरण पर कार्य किया।"
  },
  {
    title: "शिक्षा संस्थान",
    desc: "गुणवत्तापूर्ण शिक्षा के लिए शैक्षणिक संस्थानों की स्थापना और सहयोग किया।"
  },
  {
    title: "सामाजिक नेतृत्व",
    desc: "समाज के उत्थान हेतु जिम्मेदार नेतृत्व और जनसेवा को प्राथमिकता दी।"
  }
];

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2));

console.log("Translations updated successfully!");
