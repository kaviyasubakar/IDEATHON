
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Send, CloudRain, IndianRupee, Sprout, Bug, FlaskConical, Loader2, Globe } from 'lucide-react';

const VoiceAssistant = ({ onClose, userLanguage: initialLanguage }) => {
    const [currentLanguage, setCurrentLanguage] = useState(initialLanguage || 'en');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [inputQuery, setInputQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Language Mappings
    const languageMap = {
        'en': { code: 'en-US', name: 'English', greeting: 'How can I help you today?' },
        'hi': { code: 'hi-IN', name: 'हिन्दी', greeting: 'आज मैं आपकी कैसे मदद कर सकता हूँ?' },
        'pa': { code: 'pa-IN', name: 'ਪੰਜਾਬੀ', greeting: 'ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?' },
        'ta': { code: 'ta-IN', name: 'தமிழ்', greeting: 'இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' },
        'te': { code: 'te-IN', name: 'te-IN', greeting: 'ఈరోజు నేను మీకు ఎలా సహాయపడగలను?' },
        'mr': { code: 'mr-IN', name: 'मराठी', greeting: 'आज मी तुम्हाला कशी मदत करू शकतो?' },
        'gu': { code: 'gu-IN', name: 'ગુજરાતી', greeting: 'આજે હું તમને કેવી રીતે મદદ કરી શકું?' },
        'kn': { code: 'kn-IN', name: 'ಕನ್ನಡ', greeting: 'ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?' },
        'ml': { code: 'ml-IN', name: 'മലയാളം', greeting: 'ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?' },
        'bn': { code: 'bn-IN', name: 'বাংলা', greeting: 'আজ আপনাকে কীভাবে সাহায্য করতে পারি?' },
        'or': { code: 'or-IN', name: 'ଓଡ଼ିଆ', greeting: 'ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?' },
        'sa': { code: 'hi-IN', name: 'संस्कृतम्', greeting: 'अद्य अहं भवतां कथं साहाय्यं कर्तुं शक्नोमि?' }, // Using Hindi voice as proxy
        'ur': { code: 'ur-PK', name: 'اردو', greeting: 'آج میں آپ کی کیا مدد کر سکتا ہوں؟' },
        'ne': { code: 'ne-NP', name: 'नेपाली', greeting: 'आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?' }
    };

    const translations = {
        'en': {
            hello: "Namaste! I am your Agri Shakthi. How can I assist you with your farming needs?",
            weather: "The weather in Vellore is partly cloudy. Heavy rain is expected tomorrow.",
            market: "Paddy is selling at ₹2,150 per quintal. Maize is at ₹1,920.",
            crop: "We recommend planting Paddy (ADT 45) or Sugarcane this season.",
            error: "I didn't quite understand. Could you ask about weather, prices, or crops?",
            tip: "Tap a suggestion above, use the mic, or type below...",
            think: "Thinking...",
            placeholder: "Type your question...",
            s1L: "Weather", s1Q: "What is the weather today?",
            s2L: "Market Prices", s2Q: "What are the market prices?",
            s3L: "Crop Advice", s3Q: "What should I plant?",
            s4L: "Pest Control", s4Q: "How to identify pests?",
            s5L: "Fertilizer", s5Q: "Recommend fertilizer for my soil.",
            notsupported: "Microphone not supported. Please use the chat.",
            title: "Agri Shakthi Voice",
            listening: "Listening..."
        },
        'hi': {
            hello: "नमस्ते! मैं आपका एग्री शक्ति हूँ। मैं आपकी खेती की ज़रूरतों में कैसे मदद कर सकता हूँ?",
            weather: "वेल्लोर में मौसम आंशिक रूप से बादल छाए रहेंगे। कल भारी बारिश की संभावना है।",
            market: "धान ₹2,150 प्रति क्विंटल पर बिक रहा है। मक्का ₹1,920 पर है।",
            crop: "हम इस मौसम में धान या गन्ना लगाने की सलाह देते हैं।",
            error: "मुझे समझ नहीं आया। क्या आप मौसम, कीमतों या फसलों के बारे में पूछ सकते हैं?",
            tip: "ऊपर दिए गए सुझाव पर टैप करें, माइक का उपयोग करें, या नीचे टाइप करें...",
            think: "सोच रहा हूँ...",
            placeholder: "अपना प्रश्न टाइप करें...",
            s1L: "मौसम", s1Q: "आज मौसम कैसा है?",
            s2L: "बाजार भाव", s2Q: "बाजार के भाव क्या हैं?",
            s3L: "फसल सलाह", s3Q: "मुझे क्या लगाना चाहिए?",
            s4L: "कीट नियंत्रण", s4Q: "कीटों की पहचान कैसे करें?",
            s5L: "उर्वरक", s5Q: "मेरी मिट्टी के लिए उर्वरक सुझाएं।",
            notsupported: "माइक्रोफ़ोन समर्थित नहीं है। कृपया चैट का उपयोग करें।",
            title: "एग्री शक्ति वॉयस",
            listening: "सुन रहा हूँ..."
        },
        'pa': {
            hello: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਐਗਰੀ ਸ਼ਕਤੀ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਖੇਤੀ ਦੀਆਂ ਜ਼ਰੂਰਤਾਂ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
            weather: "ਵੇਲੋਰ ਵਿੱਚ ਮੌਸਮ ਅੰਸ਼ਕ ਤੌਰ 'ਤੇ ਬੱਦਲਵਾਈ ਰਹੇਗਾ। ਕੱਲ੍ਹ ਭਾਰੀ ਮੀਂਹ ਦੀ ਉਮੀਦ ਹੈ।",
            market: "ਝੋਨਾ ₹2,150 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਵਿਕ ਰਿਹਾ ਹੈ। ਮੱਕੀ ₹1,920 'ਤੇ ਹੈ।",
            crop: "ਅਸੀਂ ਇਸ ਸੀਜ਼ਨ ਵਿੱਚ ਝੋਨਾ ਜਾਂ ਗੰਨਾ ਲਗਾਉਣ ਦੀ ਸਲਾਹ ਦਿੰਦੇ ਹਾਂ।",
            error: "ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਇਆ। ਕੀ ਤੁਸੀਂ ਮੌਸਮ, ਕੀਮਤਾਂ ਜਾਂ ਫਸਲਾਂ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ?",
            tip: "ਉੱਪਰ ਦਿੱਤੇ ਸੁਝਾਅ 'ਤੇ ਟੈਪ ਕਰੋ, ਮਾਈਕ ਦੀ ਵਰਤੋਂ ਕਰੋ, ਜਾਂ ਹੇਠਾਂ ਟਾਈਪ ਕਰੋ...",
            think: "ਸੋਚ ਰਿਹਾ ਹੈ...",
            placeholder: "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
            s1L: "ਮੌਸਮ", s1Q: "ਅੱਜ ਮੌਸਮ ਕਿਹੋ ਜਿਹਾ ਹੈ?",
            s2L: "ਮੰਡੀ ਦੇ ਭਾਅ", s2Q: "ਮੰਡੀ ਦੇ ਭਾਅ ਕੀ ਹਨ?",
            s3L: "ਫਸਲ ਸਲਾਹ", s3Q: "ਮੈਨੂੰ ਕੀ ਬੀਜਣਾ ਚਾਹੀਦਾ ਹੈ?",
            s4L: "ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ", s4Q: "ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਿਵੇਂ ਕਰੀਏ?",
            s5L: "ਖਾਦ", s5Q: "ਮੇਰੀ ਮਿੱਟੀ ਲਈ ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕਰੋ।",
            notsupported: "ਮਾਈਕ੍ਰੋਫੋਨ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਚੈਟ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
            title: "ਐਗਰੀ ਸ਼ਕਤੀ ਵੌਇਸ",
            listening: "ਸੁਣ ਰਿਹਾ ਹੈ..."
        },
        'ta': {
            hello: "வணக்கம்! நான் உங்கள் அக்ரி சக்தி. உங்கள் விவசாயத் தேவைகளுக்கு நான் எவ்வாறு உதவ முடியும்?",
            weather: "வேலூரில் வானிலை ஓரளவு மேகமூட்டமாக இருக்கும். நாளை கனமழை பெய்ய வாய்ப்புள்ளது.",
            market: "நெல்லின் விலை குவின்டாலுக்கு ₹2,150 ஆகும். சோளம் ₹1,920.",
            crop: "இந்த பருவத்தில் நெல் அல்லது கரும்பு பயிரிட நாங்கள் பரிந்துரைக்கிறோம்.",
            error: "எனக்குப் புரியவில்லை. வானிலை, விலைகள் அல்லது பயிர்கள் பற்றி கேட்க முடியுமா?",
            tip: "மேலே உள்ள ஆலோசனையைத் தட்டவும், மைக்கைப் பயன்படுத்தவும் அல்லது கீழே தட்டச்சு செய்யவும்...",
            think: "யோசிக்கிறது...",
            placeholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்...",
            s1L: "வானிலை", s1Q: "இன்று வானிலை எப்படி இருக்கிறது?",
            s2L: "சந்தை விலைகள்", s2Q: "சந்தை விலைகள் என்ன?",
            s3L: "பயிர் ஆலோசனை", s3Q: "நான் எதை நடவு செய்ய வேண்டும்?",
            s4L: "பூச்சி கட்டுப்பாடு", s4Q: "பூச்சிகளை எவ்வாறு கண்டறிவது?",
            s5L: "உரம்", s5Q: "எனது மண்ணுக்கு உரம் பரிந்துரைக்க.",
            notsupported: "மைக்ரோஃபோன் ஆதரிக்கப்படவில்லை. அரட்டையைப் பயன்படுத்தவும்.",
            title: "அக்ரி சக்தி குரல்",
            listening: "கேட்கிறது..."
        },
        'te': {
            hello: "నమస్తే! నేను మీ అగ్రి శక్తి. వ్యవసాయంలో మీకు నేనెలా సహాయపడగలను?",
            weather: "వెల్లూరులో వాతావరణం పాక్షికంగా మేఘావృతమై ఉంటుంది. రేపు భారీ వర్షం పడే అవకాశం ఉంది.",
            market: "వరి క్వింటాల్ కు ₹2,150. మొక్కజొన్న ₹1,920.",
            crop: "ఈ సీజన్‌లో వరి లేదా చెరకు పండించాలని మేము సిఫార్సు చేస్తున్నాము.",
            error: "వాతావరణం, ధరలు లేదా పంటల గురించి దయచేసి అడగగలరా?",
            tip: "పైన ఉన్న సూచనను నొక్కండి, మైక్ ఉపయోగించండి లేదా టైప్ చేయండి...",
            think: "ఆలోచిస్తోంది...",
            placeholder: "మీ ప్రశ్నను టైప్ చేయండి...",
            s1L: "వాతావరణం", s1Q: "ఈరోజు వాతావరణం ఎలా ఉంది?",
            s2L: "మార్కెట్ ధరలు", s2Q: "మార్కెట్ ధరలు ఏమిటి?",
            s3L: "పంట సలహా", s3Q: "నేను ఏమి నాటాలి?",
            s4L: "తెగులు నివారణ", s4Q: "తెగుళ్ళను ఎలా గుర్తించాలి?",
            s5L: "ఎరువులు", s5Q: "మామిడికి ఎరువులను సిఫార్సు చేయండి.",
            notsupported: "మైక్రోఫోన్ పని చేయడం లేదు. దయచేసి చాట్ వాడండి.",
            title: "అగ్రి శక్తి వాయిస్",
            listening: "వింటున్నాను..."
        },
        'mr': {
            hello: "नमस्कार! मी तुमचा कृषी सखा. मी तुम्हाला कशी मदत करू शकतो?",
            weather: "आज हवामान सामान्य राहील.",
            market: "बाजार भाव सामान्य आहेत.",
            crop: "आम्ही ऊस आणि सोयाबीनची शिफारस करतो.",
            error: "मला समजले नाही. कृपया हवामान, भाव किंवा पिकांबद्दल विचारा.",
            tip: "वरील पर्याय निवडा, माईक वापरा किंवा खाली टाईप करा...",
            think: "विचार करत आहे...",
            placeholder: "तुमचा प्रश्न टाईप करा...",
            s1L: "हवामान", s1Q: "आज हवामान कसे आहे?",
            s2L: "बाजार भाव", s2Q: "बाजार भाव काय आहेत?",
            s3L: "पीक सल्ला", s3Q: "मी काय पेरावे?",
            s4L: "कीड नियंत्रण", s4Q: "किटकांची ओळख कशी करावी?",
            s5L: "खत", s5Q: "माझ्या मातीसाठी खत सुचवा.",
            notsupported: "मायक्रोफोन सपोर्टेड नाही. कृपया चॅट वापरा.",
            title: "अॅग्री शक्ती व्हॉइस",
            listening: "ऐकत आहे..."
        },
        'or': {
            hello: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ଏଗ୍ରି ଶକ୍ତି | ମୁଁ ଆପଣଙ୍କର ଚାଷ ଆବଶ୍ୟକତା ସହିତ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
            weather: "ଭେଲୋରରେ ପାଗ ଆଂଶିକ ମେଘୁଆ ରହିବ | ଆସନ୍ତାକାଲି ପ୍ରବଳ ବର୍ଷା ହେବାର ସମ୍ଭାବନା ଅଛି |",
            market: "ଧାନ କ୍ୱିଣ୍ଟାଲ ପିଛା ୨,୧୫୦ ଟଙ୍କାରେ ବିକ୍ରି ହେଉଛି। ମକା ୧,୯୨୦ ଟଙ୍କାରେ ଅଛି |",
            crop: "ଆମେ ଏହି season ତୁରେ ଧାନ କିମ୍ବା ଆଖୁ ଚାଷ କରିବାକୁ ସୁପାରିଶ କରୁ |",
            error: "ମୁଁ ବୁଝି ପାରିଲି ନାହିଁ | ଆପଣ ପାଗ, ମୂଲ୍ୟ କିମ୍ବା ଫସଲ ବିଷୟରେ ପଚାରିପାରିବେ କି?",
            tip: "ଉପରେ ଥିବା ପରାମର୍ଶକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ, କିମ୍ବା ତଳେ ଟାଇପ୍ କରନ୍ତୁ...",
            think: "ଚିନ୍ତା କରୁଛି...",
            placeholder: "ଆପଣଙ୍କର ପ୍ରଶ୍ନ ଟାଇପ୍ କରନ୍ତୁ...",
            s1L: "ପାଗ", s1Q: "ଆଜିର ପାଗ କିପରି ଅଛି?",
            s2L: "ମୂଲ୍ୟ", s2Q: "ବଜାର ମୂଲ୍ୟ କ’ଣ?",
            s3L: "ଫସଲ ପରାମର୍ଶ", s3Q: "ମୁଁ କ’ଣ ଲଗାଇବି?",
            s4L: "କୀଟ ନିୟନ୍ତ୍ରଣ", s4Q: "ଦୟାକରି କୀଟ ଚିହ୍ନଟ କରନ୍ତୁ?",
            s5L: "ସାର", s5Q: "ମୋର ମାଟି ପାଇଁ ସାର ପରାମର୍ଶ ଦିଅନ୍ତୁ |",
            notsupported: "ମାଇକ୍ରୋଫୋନ ସମର୍ଥିତ ନୁହେଁ |",
            title: "ଏଗ୍ରି ଶକ୍ତି ଭଏସ୍",
            listening: "ଶୁଣୁଛି..."
        },
        'sa': {
            hello: "नमो नमः! अहं तव कृषि-सखा अस्मि। अहं भवतः कृषिकार्ये कथं साहाय्यं कर्तुं शक्नोमि?",
            weather: "वेल्लूर-नगरे मेघसावृतं भविष्यति। श्वः अतिवृष्टिः भविष्यति।",
            market: "धान्यं २१५० रूप्यकाणि प्रति क्विंटल इति विक्रीयते। मक्का १९२० रूप्यकाणि अस्ति।",
            crop: "वयं अस्मिन् ऋतौ धान्यं वा इक्षुं वा रोपयितुं परामृशामः।",
            error: "अहं न अवगच्छामि। कृपया ऋतुं, मूल्यं वा सस्यं वा पृच्छतु।",
            tip: "उपर्युक्तं सुझावम् स्पृशतु, माइक इत्यस्य उपयोगं करोतु वा अधः टङ्कयतु...",
            think: "चिन्तयति...",
            placeholder: "भवतः प्रश्नं टङ्कयतु...",
            s1L: "ऋतुः", s1Q: "अद्य ऋतुः कीदृशः अस्ति?",
            s2L: "विपणिमूल्यानि", s2Q: "विपणिमूल्यानि कानि सन्ति?",
            s3L: "सस्यपरामर्शः", s3Q: "मया किं रोपणीयम्?",
            s4L: "कीटनियन्त्रणम्", s4Q: "कीटानां पहिचानं कथं कुर्मः?",
            s5L: "उर्वरकः", s5Q: "मम मृत्तिकायाः कृते उर्वरकं परामृशतु।",
            notsupported: "ध्वनिग्राहकं समर्थितं नास्ति।",
            title: "एग्री शक्ति ध्वनि",
            listening: "शृणोति..."
        },
        'ur': {
            hello: "اسلام علیکم! میں آپ کا ایگری شکتی ہوں۔ میں آپ کی کاشتکاری کی ضروریات میں کیسے مدد کر سکتا ہوں؟",
            weather: "ویلور میں موسم جزوی طور پر ابر آلود رہے گا۔ کل موسلا دھار بارش کا امکان ہے۔",
            market: "دھان 2,150 روپے فی کوئنٹل بک رہا ہے۔ مکئی 1,920 روپے پر ہے۔",
            crop: "ہم اس موسم میں دھان یا گنے کی کاشت کی سفارش کرتے ہیں۔",
            error: "میں سمجھ نہیں سکا۔ کیا آپ موسم، قیمتوں یا فصلوں کے بارے میں پوچھ سکتے ہیں؟",
            tip: "اوپر دی گئی تجویز پر ٹیپ کریں، آواز استعمال کریں، یا ٹائپ کریں...",
            think: "سوچ رہا ہے...",
            placeholder: "اپنا سوال ٹائپ کریں...",
            s1L: "موسم", s1Q: "آج موسم کیسا ہے؟",
            s2L: "مارکیٹ کی قیمتیں", s2Q: "مارکیٹ کی قیمتیں کیا ہیں؟",
            s3L: "فصل کا مشورہ", s3Q: "مجھے کیا بونا چاہیے؟",
            s4L: "جراثیم کش", s4Q: "کیڑوں کی شناخت کیسے کریں؟",
            s5L: "کھاد", s5Q: "میری مٹی کے لیے کھاد تجویز کریں۔",
            notsupported: "مائیک کام نہیں کر رہا، براہ کرم چیٹ کا استعمال کریں۔",
            title: "ایگری شکتی وائس",
            listening: "سن رہا ہے..."
        },
        'ne': {
            hello: "नमस्ते! म तपाईंको एग्री शक्ति हुँ। म तपाईंको खेतीपातीका आवश्यकताहरूमा कसरी मद्दत गर्न सक्छु?",
            weather: "भेलोरमा मौसम आंशिक रूपमा बादल लाग्नेछ। भोलि भारी वर्षाको सम्भावना छ।",
            market: "धान प्रति क्विन्टल २,१५० मा बिक्री भइरहेको छ। मकै १,९२० मा छ।",
            crop: "हामी यस सिजनमा धान वा उखु रोप्ने सल्लाह दिन्छौं।",
            error: "मैले बुझिन। के तपाईं मौसम, मूल्य वा बालीहरूको बारेमा सोध्न सक्नुहुन्छ?",
            tip: "माथिको सुझावमा ट्याप गर्नुहोस्, माइक प्रयोग गर्नुहोस्, वा तल टाइप गर्नुहोस्...",
            think: "सोच्दै...",
            placeholder: "तपाईंको प्रश्न टाइप गर्नुहोस्...",
            s1L: "मौसम", s1Q: "आज मौसम कस्तो छ?",
            s2L: "बजार मूल्य", s2Q: "बजार मूल्य के हो?",
            s3L: "बाली सल्लाह", s3Q: "मैले के रोप्ने?",
            s4L: "कीट नियन्त्रण", s4Q: "कीट कसरी पहिचान गर्ने?",
            s5L: "मल", s5Q: "मेरो माटोको लागि मल सल्लाह दिनुहोस्।",
            notsupported: "माइक्रोफोन समर्थित छैन। च्याट प्रयोग गर्नुहोस्।",
            title: "एग्री शक्ति भ्वाइस",
            listening: "सुन्दै..."
        },
    };

    // Refs for speech recognition and synthesis
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        setResponse(languageMap[currentLanguage]?.greeting || languageMap['en'].greeting);
    }, [currentLanguage]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = languageMap[currentLanguage]?.code || 'en-US';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setIsProcessing(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                
                if (finalTranscript) {
                    setTranscript(finalTranscript);
                    processQuery(finalTranscript);
                } else if (interimTranscript) {
                    setTranscript(interimTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error:", event.error);

                const langData = translations[currentLanguage] || translations['en'];
                let errorMessage = langData.error || "Sorry, I didn't catch that.";

                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    errorMessage = currentLanguage === 'ta' ? "மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது. உங்கள் உலாவி அமைப்புகளில் அனுமதிக்கவும்." : currentLanguage === 'hi' ? "माइक्रोफ़ोन पहुंच से इनकार कर दिया गया। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।" : "Microphone access denied. Please allow microphone access in your browser settings.";
                    setResponse(errorMessage);
                    setIsListening(false);
                } else if (event.error === 'network') {
                    console.log("Network error intercepted. Providing a simulated response for demonstration.");
                    setIsListening(false);
                    setTranscript(langData.s1Q || "What is the weather today?");
                    processQuery(langData.s1Q || "What is the weather today?");
                } else if (event.error === 'no-speech') {
                    errorMessage = currentLanguage === 'ta' ? "என்னால் எதையும் கேட்க முடியவில்லை. மைக்ரோஃபோனுக்கு அருகில் பேசவும்." : currentLanguage === 'hi' ? "मुझे कुछ सुनाई नहीं दिया। कृपया माइक्रोफ़ोन के करीब बोलें।" : "I couldn't hear anything. Please try speaking closer to the microphone.";
                    setResponse(errorMessage);
                    setIsListening(false);
                } else {
                    setResponse(errorMessage);
                    setIsListening(false);
                }
            };
        } else {
            setIsSupported(false);
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (synthRef.current) synthRef.current.cancel();
        };
    }, [currentLanguage]);

    const startListening = () => {
        if (recognitionRef.current) {
            if (synthRef.current) synthRef.current.cancel();
            setIsSpeaking(false);
            recognitionRef.current.start();
            setTranscript(translations[currentLanguage]?.listening || translations['en'].listening);
            setResponse('');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
    };

    const speakResponse = (text) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = languageMap[currentLanguage]?.code || 'en-US';
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            synthRef.current.speak(utterance);
        }, 100);
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (inputQuery.trim()) {
            setTranscript(inputQuery);
            processQuery(inputQuery);
            setInputQuery('');
        }
    };

    const processQuery = (query) => {
        setIsProcessing(true);
        if (synthRef.current) synthRef.current.cancel();

        setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            const langData = translations[currentLanguage] || translations['en'];
            let answer = langData.error;

            if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('नमस्ते') || lowerQuery.includes('ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ')) {
                answer = langData.hello;
            } else if (lowerQuery.includes('weather') || lowerQuery.includes('rain') || lowerQuery.includes('cloud') || lowerQuery.includes('मौसम') || lowerQuery.includes('ਮੌਸਮ') || lowerQuery.includes('வானிலை') || lowerQuery.includes('ಹವಾಮಾನ') || lowerQuery.includes('पचास') || lowerQuery.includes('हवामान') || lowerQuery.includes('వాతావరణం')) {

                // Try to extract a location word (e.g. "weather in Madurai", "Pune weather")
                let location = "";
                const match = query.match(/(?:in|at|for|of|में|இல்|లో)\s+([a-zA-Z\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F]+)/i);

                if (match && match[1]) {
                    location = match[1].charAt(0).toUpperCase() + match[1].slice(1);
                } else {
                    // Fallback to the farmer's registered district if no location mentioned
                    try {
                        const userStr = localStorage.getItem('user');
                        if (userStr) {
                            const user = JSON.parse(userStr);
                            if (user.district) location = user.district;
                        }
                    } catch (e) { }
                }

                if (!location) location = "your area";

                // Replace the hardcoded "Vellore" in all regional languages with the extracted location
                answer = langData.weather.replace(/Vellore/gi, location)
                    .replace(/वेल्लोर/g, location)
                    .replace(/वेल्लूर/g, location)
                    .replace(/வேலூரில்/g, location)
                    .replace(/வேலூர்/g, location)
                    .replace(/వెల్లూరులో/g, location)
                    .replace(/వెల్లూరు/g, location)
                    .replace(/వెల్లూర్/g, location)
                    .replace(/भेलोरमा/g, location)
                    .replace(/भेलोर/g, location)
                    .replace(/ویلور/g, location)
                    .replace(/ਵੇਲੋਰ ਵਿੱਚ/g, location)
                    .replace(/ਵੇਲੋਰ/g, location)
                    .replace(/ଭେଲୋରରେ/g, location)
                    .replace(/ଭେଲୋର/g, location);

                // Small randomization of condition just for demo effect
                const isRaining = Math.random() > 0.5;
                if (isRaining && currentLanguage === 'en') answer = answer.replace("partly cloudy", "experiencing light rain").replace("heavy rain tomorrow", "clear skies tomorrow");

            } else if (lowerQuery.includes('price') || lowerQuery.includes('market') || lowerQuery.includes('कीमत') || lowerQuery.includes('ਭਾਅ')) {
                answer = langData.market;
            } else if (lowerQuery.includes('crop') || lowerQuery.includes('plant') || lowerQuery.includes('फसल') || lowerQuery.includes('ਫਸਲ')) {
                answer = langData.crop;
            }

            setResponse(answer);
            setIsProcessing(false);
            speakResponse(answer);
        }, 600);
    };

    const langData = translations[currentLanguage] || translations['en'];

    const suggestions = [
        { label: langData.s1L || "Weather", icon: <CloudRain size={16} />, query: langData.s1Q || "What is the weather today?" },
        { label: langData.s2L || "Market Prices", icon: <IndianRupee size={16} />, query: langData.s2Q || "What are the market prices?" },
        { label: langData.s3L || "Crop Advice", icon: <Sprout size={16} />, query: langData.s3Q || "What should I plant?" },
        { label: langData.s4L || "Pest Control", icon: <Bug size={16} />, query: langData.s4Q || "How to identify pests?" },
        { label: langData.s5L || "Fertilizer", icon: <FlaskConical size={16} />, query: langData.s5Q || "Recommend fertilizer for my soil." },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all scale-100 opacity-100 flex flex-col max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-md hover:bg-red-50 hover:text-red-600 transition-all z-[1010] border border-gray-100"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div
                    className="p-6 text-white text-center pb-8 relative overflow-hidden flex-shrink-0"
                    style={{ background: '#1b5e20' }} // Deep Forest Green
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>
                    {isProcessing ? (
                        <Loader2 size={40} className="mx-auto mb-2 opacity-90 animate-spin" />
                    ) : isSpeaking ? (
                        <Volume2 size={40} className="mx-auto mb-2 opacity-90 animate-pulse" />
                    ) : (
                        <Mic size={40} className={`mx-auto mb-2 opacity-90 ${isListening ? 'animate-bounce' : ''}`} />
                    )}
                    <h2 className="text-xl font-bold mb-1 tracking-wide" style={{ color: '#ffffff' }}>{langData.title || "Agri Shakthi Voice"}</h2>

                    {/* Language Switcher Inside Assistant */}
                    <div className="flex justify-center mt-2 relative z-20">
                        <div
                            className="flex items-center rounded-full px-4 py-1.5 shadow-xl border group hover:scale-105 transition-all cursor-pointer"
                            style={{
                                background: '#0f172a', // Midnight Blue
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <Globe size={14} style={{ color: '#fbbf24', marginRight: '8px' }} /> {/* Gold Globe */}
                            <select
                                value={currentLanguage}
                                onChange={(e) => setCurrentLanguage(e.target.value)}
                                className="bg-transparent text-xs outline-none appearance-none cursor-pointer font-bold pr-5"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23fbbf24' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right center',
                                    border: 'none',
                                    color: '#fbbf24', // Gold text for chosen language
                                    minWidth: '80px',
                                    fontWeight: '800'
                                }}
                            >
                                {Object.entries(languageMap).map(([key, value]) => (
                                    <option
                                        key={key}
                                        value={key}
                                        style={{
                                            color: '#ffffff',
                                            background: '#1e293b', // Match the midnight blue background
                                            fontSize: '14px',
                                            padding: '8px'
                                        }}
                                    >
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Suggestion Chips */}
                <div className="bg-gray-50/50 backdrop-blur-sm p-4 flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-100 shadow-inner z-20">
                    {suggestions.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setTranscript(item.query);
                                processQuery(item.query);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-green-100 rounded-2xl text-sm font-semibold text-gray-700 shadow-sm hover:bg-green-600 hover:border-green-600 hover:text-white transition-all active:scale-95 flex-shrink-0 group"
                        >
                            <span className="text-green-600 group-hover:text-white transition-colors">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center gap-4 bg-white relative z-10 flex-grow overflow-y-auto">

                    {/* Status / Response Area */}
                    <div className="w-full text-center space-y-4 min-h-[120px] flex flex-col justify-center items-center bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner flex-grow transition-colors duration-300">
                        {!isListening && !response && !isProcessing && (
                            <p className="text-gray-400">{langData.tip || "Tap a suggestion above, use the mic, or type below..."}</p>
                        )}
                        {isListening && (
                            <div className="flex gap-1 items-center justify-center h-8">
                                <div className="w-1.5 h-6 bg-green-500 rounded-full animate-wave"></div>
                                <div className="w-1.5 h-8 bg-green-500 rounded-full animate-wave delay-75"></div>
                                <div className="w-1.5 h-10 bg-green-500 rounded-full animate-wave delay-150"></div>
                                <div className="w-1.5 h-8 bg-green-500 rounded-full animate-wave delay-75"></div>
                                <div className="w-1.5 h-6 bg-green-500 rounded-full animate-wave"></div>
                            </div>
                        )}
                        {isProcessing && (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 size={24} className="text-green-600 animate-spin" />
                                <p className="text-gray-500 text-sm">{langData.think || "Thinking..."}</p>
                            </div>
                        )}
                        {transcript && !isProcessing && (
                            <p className="text-gray-500 italic text-lg">"{transcript}"</p>
                        )}
                        {response && !isProcessing && (
                            <div className="animate-fade-in-up">
                                <p className="text-gray-800 font-medium text-lg leading-relaxed">
                                    {response}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Microphone Button */}
                    {isSupported && (
                        <>
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={`
                                    relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-4 border-white flex-shrink-0
                                    ${isListening
                                        ? 'bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-200 animate-pulse'
                                        : 'bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-l hover:scale-105 shadow-green-200'
                                    }
                                `}
                            >
                                {isListening ? (
                                    <MicOff size={28} className="text-white" />
                                ) : (
                                    <Mic size={28} className="text-white" />
                                )}
                            </button>

                        </>
                    )}

                    {!isSupported && (
                        <div className="text-center text-amber-600 bg-amber-50 p-3 rounded-lg text-sm w-full">
                            {langData.notsupported || "Microphone not supported in this browser. Please use the chat below."}
                        </div>
                    )}
                </div>

                {/* Text Input Area */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 pb-6">
                    <form onSubmit={handleTextSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={inputQuery}
                            onChange={(e) => setInputQuery(e.target.value)}
                            placeholder={langData.placeholder || "Type your question..."}
                            className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!inputQuery.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default VoiceAssistant;
