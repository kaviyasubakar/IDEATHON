import fs from 'fs';

const extraTranslations = {
    "Kurung Kumey": { hi: "कुरुंग कुमेय", ta: "குருங் குமே" },
    "Kra Daadi": { hi: "करा दादी", ta: "க்ரா தாடி" },
    "Lower Subansiri": { hi: "निचली सुबनसिरी", ta: "கீழ் சுபன்சிரி" },
    "Upper Subansiri": { hi: "ऊपरी सुबनसिरी", ta: "மேல் சுபன்சிரி" },
    "West Siang": { hi: "पश्चिम सियांग", ta: "மேற்கு சியாங்" },
    "Siang": { hi: "सियांग", ta: "சியாங்" },
    "Upper Siang": { hi: "ऊपरी सियांग", ta: "மேல் சியாங்" },
    "Lower Dibang Valley": { hi: "निचली दिबांग घाटी", ta: "கீழ் திபாங் பள்ளத்தாக்கு" },
    "Dibang Valley": { hi: "दिबांग घाटी", ta: "திபாங் பள்ளத்தாக்கு" },
    "Biswanath": { hi: "बिश्वनाथ", ta: "பிஸ்வநாத்" },
    "Charaideo": { hi: "चराईदेव", ta: "சரைதியோ" },
    "Majuli": { hi: "माजुली", ta: "மஜுலி" },
    "Nalbari": { hi: "नलबाड़ी", ta: "நல்பாரி" },
    "South Salmara-Mankachar": { hi: "दक्षिण सालमारा-मानकचर", ta: "தெற்கு சல்மாரா-மன்காச்சார்" },
    "West Karbi Anglong": { hi: "पश्चिम कार्बी आंगलोंग", ta: "மேற்கு கார்பி ஆங்லாங்" },
    "Sukma": { hi: "सुकमा", ta: "சுக்மா" },
    "Banaskantha": { hi: "बनासकांठा", ta: "பனஸ்கந்தா" },
    "Botad": { hi: "बोटाद", ta: "போடாட்" },
    "Nuh": { hi: "नूंह", ta: "நூஹ்" },
    "Latehar": { hi: "लातेहार", ta: "லதேஹார்" },
    "Kodagu": { hi: "कोडागु", ta: "குடகு" },
    "Morena": { hi: "मुरैना", ta: "முரினா" },
    "Umaria": { hi: "उमरिया", ta: "உமரியா" },
    "Jiribam": { hi: "जिरिबाम", ta: "ஜிரிபாம்" },
    "Kakching": { hi: "काकचिंग", ta: "காக்சிங்" },
    "Kamjong": { hi: "कामजोंग", ta: "காம்ஜோங்" },
    "Kangpokpi": { hi: "कांगपोकपी", ta: "காங்போக்பி" },
    "Pherzawl": { hi: "फेरज़ोल", ta: "பெர்ஸாவல்" },
    "Tengnoupal": { hi: "टेंगनौपाल", ta: "டெக்னௌபால்" },
    "North Garo Hills": { hi: "उत्तर गारो हिल्स", ta: "வடக்கு காரோ ஹில்ஸ்" },
    "South Garo Hills": { hi: "दक्षिण गारो हिल्स", ta: "தெற்கு காரோ ஹில்ஸ்" },
    "South West Garo Hills": { hi: "दक्षिण पश्चिम गारो हिल्स", ta: "தென்மேற்கு காரோ ஹில்ஸ்" },
    "South West Khasi Hills": { hi: "दक्षिण पश्चिम खासी हिल्स", ta: "தென்மேற்கு காசி ஹில்ஸ்" },
    "West Jaintia Hills": { hi: "पश्चिम जयंतिया हिल्स", ta: "மேற்கு ஜெயின்டியா ஹில்ஸ்" },
    "Hnahthial": { hi: "हनाहथियाल", ta: "ஹ்னாத்தியால்" },
    "Khawzawl": { hi: "खव्ज़ोल", ta: "காவ்சாவல்" },
    "Saitual": { hi: "साइतुल", ta: "சைதுவால்" },
    "Kiphire": { hi: "किफिर", ta: "கிபைர்" },
    "Longleng": { hi: "लोंगलेंग", ta: "லாங்லெங்" },
    "Peren": { hi: "पेरेन", ta: "பெரேன்" },
    "Angul": { hi: "अंगुल", ta: "அங்குல்" },
    "Anugul": { hi: "अंगुल", ta: "அங்குல்" },
    "North Sikkim": { hi: "उत्तरी सिक्किम", ta: "வடக்கு சிக்கிம்" },
    "South Sikkim": { hi: "दक्षिणी सिक्किम", ta: "தெற்கு சிக்கிம்" },
    "West Sikkim": { hi: "पश्चिमी सिक्किम", ta: "மேற்கு சிக்கிம்" },
    "Bhadradri Kothagudem": { hi: "भद्राद्री कोठागुडेम", ta: "பத்ராத்ரி கோத்தகுடெம்" },
    "Jayashankar Bhupalpally": { hi: "जयशंकर भूपालपल्ली", ta: "ஜெயசங்கர் பூபாலபள்ளி" },
    "Jogulamba Gadwal": { hi: "जोगुलम्बा गडवाल", ta: "ஜோகுலம்பா கட்வால்" },
    "Komaram Bheem Asifabad": { hi: "कोमाराम भीम आसिफाबाद", ta: "குமரம் பீம் ஆசிபாபாத்" },
    "Peddapalli": { hi: "पेद्दापल्ली", ta: "பெத்தப்பள்ளி" },
    "Hanumakonda": { hi: "हनुमकोंडा", ta: "ஹனுமகொண்டா" },
    "Sepahijala": { hi: "सिपाहीजला", ta: "சிபாஹிஜாலா" },
    "Badwani": { hi: "बड़वानी", ta: "பட்வானி" },
    "Barwani": { hi: "बड़वानी", ta: "பட்வானி" }
};

let content = fs.readFileSync('src/data/districtTranslations.js', 'utf8');

// remove trailing `};\n`
content = content.replace(/};\s*$/, '');

Object.entries(extraTranslations).forEach(([k, v]) => {
    content += `    "${k}": { hi: "${v.hi}", ta: "${v.ta}" },\n`;
});

content += "};\n";

fs.writeFileSync('src/data/districtTranslations.js', content);
console.log("Appended missing translations!");
