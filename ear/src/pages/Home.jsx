import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sun, CloudRain, ShieldCheck, TrendingUp, Mic, Globe, Phone } from 'lucide-react';
import homePoster from '../assets/home-poster.jpg';
import farmingBg from '../assets/farming.jpeg';
import VoiceAssistant from '../components/VoiceAssistant';

const Home = () => {
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');
    const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        localStorage.setItem('preferredLanguage', newLang);
    };
    const content = {
        'en': {
            title: "Smart Crop Advisory", sub: "for Every Farmer", login: "Farmer Login", reg: "New Registration",
            aboutTitle: "About the Platform",
            aboutDesc: "Our system empowers farmers with real-time, data-driven decisions. By integrating AI, weather data, and soil health analysis, we help reduce risks and increase profitability for small and marginal farmers across the region.",
            featuresTitle: "Key Features",
            f1T: "AI Crop Advisory", f1D: "Personalized guidance on what to plant and when, based on your soil and location.",
            f2T: "Weather Alerts", f2D: "Real-time weather updates and storm warnings to protect your crops.",
            f3T: "Soil & Fertilizer", f3D: "Scientific recommendations for soil health and fertilizer dosage.",
            f4T: "Pest Detection", f4D: "Upload photos of crops to detect pests and diseases instantly.",
            f5T: "Market Prices", f5D: "Live tracking of mandis prices to ensure you get the best value.",
            f6T: "Voice Support", f6D: "Inclusive design with voice-based commands for ease of use.",
            contactTitle: "Contact Us",
            languageTitle: "Select Language",
            footerDesc: "Empowering Bharat's farmers with next-gen AI crop advisory, real-time weather analytics, and direct market linkage.",
            copyright: "Government of India / SIH Initiative. Crafted for Farmers. All rights reserved."
        },
        'hi': {
            title: "स्मार्ट फसल सलाह", sub: "हर किसान के लिए", login: "किसान लॉगिन", reg: "नया पंजीकरण",
            aboutTitle: "प्लेटफॉर्म के बारे में",
            aboutDesc: "हमारी प्रणाली किसानों को वास्तविक समय, डेटा-संचालित निर्णयों के साथ सशक्त बनाती है। एआई, मौसम डेटा और मिट्टी स्वास्थ्य विश्लेषण को एकीकृत करके, हम क्षेत्र के छोटे और सीमांत किसानों के लिए जोखिम कम करने और लाभप्रदता बढ़ाने में मदद करते हैं।",
            featuresTitle: "प्रमुख विशेषताएं",
            f1T: "एआई फसल सलाह", f1D: "आपकी मिट्टी और स्थान के आधार पर क्या और कब लगाना है, इस पर व्यक्तिगत मार्गदर्शन।",
            f2T: "मौसम अलर्ट", f2D: "आपकी फसलों की सुरक्षा के लिए रीयल-टाइम मौसम अपडेट और तूफान की चेतावनी।",
            f3T: "मिट्टी और उर्वरक", f3D: "मिट्टी के स्वास्थ्य और उर्वरक की खुराक के लिए वैज्ञानिक सिफारिशें।",
            f4T: "कीट पहचान", f4D: "कीटों और रोगों का तुरंत पता लगाने के लिए फसलों की तस्वीरें अपलोड करें।",
            f5T: "बाजार भाव", f5D: "मंडी की कीमतों की लाइव ट्रैकिंग यह सुनिश्चित करने के लिए कि आपको सबसे अच्छा मूल्य मिले।",
            f6T: "ध्वनि सहायता", f6D: "उपयोग में आसानी के लिए आवाज-आधारित कमांड के साथ समावेशी डिजाइन।",
            contactTitle: "संपर्क करें",
            languageTitle: "भाषा चुनें",
            footerDesc: "भारत के किसानों को अगली पीढ़ी के एआई फसल सलाह, वास्तविक समय मौसम विश्लेषण और सीधे बाजार लिंक के साथ सशक्त बनाना।",
            copyright: "भारत सरकार / SIH पहल। किसानों के लिए निर्मित। सर्वाधिकार सुरक्षित।"
        },
        'ur': {
            title: "سمارٹ فصل ایڈوائزری", sub: "ہر کسان کے لیے", login: "کسان لاگ ان", reg: "نئی رجسٹریشن",
            aboutTitle: "پلیٹ فارم کے بارے میں",
            aboutDesc: "ہمارا نظام کسانوں کو حقیقی وقت، ڈیٹا پر مبنی فیصلوں کے ساتھ بااختیار بناتا ہے۔ AI، موسم کے ڈیٹا اور مٹی کی صحت کے تجزیہ کو یکجا کر کے، ہم خطے کے چھوٹے اور پسماندہ کسانوں کے لیے خطرات کو کم کرنے اور منافع بڑھانے میں مدد کرتے ہیں۔",
            featuresTitle: "اہم خصوصیات",
            f1T: "AI فصل ایڈوائزری", f1D: "آپ کی مٹی اور مقام کی بنیاد پر کیا اور کب لگانا ہے اس بارے میں ذاتی رہنمائی۔",
            f2T: "موسم کے الرٹس", f2D: "آپ کی فصلوں کی حفاظت کے لیے ریئل ٹائم موسم کی اپ ڈیٹس اور طوفان کی وارننگ۔",
            f3T: "مٹی اور کھاد", f3D: "مٹی کی صحت اور کھاد کی خوراک کے لیے سائنسی سفارشات۔",
            f4T: "کیڑے کی شناخت", f4D: "کیڑوں اور بیماریوں کا فوری پتہ لگانے کے لیے فصلوں کی تصاویر اپ لوڈ کریں۔",
            f5T: "مارکیٹ کی قیمتیں", f5D: "منڈی کی قیمتوں کی لائیو ٹریکنگ تاکہ یہ یقینی بنایا جا سکے کہ آپ کو بہترین قیمت ملے۔",
            f6T: "وائس سپورٹ", f6D: "استعمال میں آسانی کے لیے آواز پر مبنی کمانڈز کے ساتھ جامع ڈیزائن۔",
            contactTitle: "ہم سے رابطہ کریں",
            languageTitle: "زبان منتخب کریں",
            footerDesc: "بھارت کے کسانوں کو اگلی نسل کی AI فصل ایڈوائزری، ریئل ٹائم موسم کے تجزیات، اور براہ راست مارکیٹ لنکیج کے ساتھ بااختیار بنانا۔",
            copyright: "حکومت ہند / SIH پہل۔ کسانوں کے لیے تیار کیا گیا۔ جملہ حقوق محفوظ ہیں۔"
        },
        'pa': {
            title: "ਸਮਾਰਟ ਫਸਲ ਸਲਾਹ", sub: "ਹਰ ਕਿਸਾਨ ਲਈ", login: "ਕਿਸਾਨ ਲੋਗਇਨ", reg: "ਨਵੀਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
            aboutTitle: "ਪਲੇਟਫਾਰਮ ਬਾਰੇ",
            aboutDesc: "ਸਾਡਾ ਸਿਸਟਮ ਕਿਸਾਨਾਂ ਨੂੰ ਰੀਅਲ-ਟਾਈਮ, ਡਾਟਾ-ਅਧਾਰਿਤ ਫੈਸਲਿਆਂ ਨਾਲ ਸ਼ਕਤੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। AI, ਮੌਸਮ ਦੇ ਡੇਟਾ ਅਤੇ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣ ਨੂੰ ਜੋੜ ਕੇ, ਅਸੀਂ ਖੇਤਰ ਦੇ ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨਾਂ ਲਈ ਜੋਖਮਾਂ ਨੂੰ ਘਟਾਉਣ ਅਤੇ ਮੁਨਾਫੇ ਨੂੰ ਵਧਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਾਂ।",
            featuresTitle: "ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
            f1T: "AI ਫਸਲ ਸਲਾਹ", f1D: "ਤੁਹਾਡੀ ਮਿੱਟੀ ਅਤੇ ਸਥਾਨ ਦੇ ਅਧਾਰ 'ਤੇ ਕੀ ਅਤੇ ਕਦੋਂ ਬੀਜਣਾ ਹੈ ਇਸ ਬਾਰੇ ਵਿਅਕਤੀਗਤ ਮਾਰਗਦਰਸ਼ਨ।",
            f2T: "ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ", f2D: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਅਪਡੇਟਸ ਅਤੇ ਤੂਫਾਨ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ।",
            f3T: "ਮਿੱਟੀ ਅਤੇ ਖਾਦ", f3D: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਖਾਦ ਦੀ ਖੁਰਾਕ ਲਈ ਵਿਗਿਆਨਕ ਸਿਫ਼ਾਰਸ਼ਾਂ।",
            f4T: "ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ", f4D: "ਕੀੜਿਆਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਦਾ ਤੁਰੰਤ ਪਤਾ ਲਗਾਉਣ ਲਈ ਫਸਲਾਂ ਦੀਆਂ ਫੋਟੋਆਂ ਅਪਲੋਡ ਕਰੋ।",
            f5T: "ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ", f5D: "ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ ਦੀ ਲਾਈਵ ਟ੍ਰੈਕਿੰਗ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਕਿ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਮੁੱਲ ਮਿਲੇ।",
            f6T: "ਵੌਇਸ ਸਪੋਰਟ", f6D: "ਵਰਤੋਂ ਵਿੱਚ ਅਸਾਨੀ ਲਈ ਆਵਾਜ਼-ਅਧਾਰਿਤ ਕਮਾਂਡਾਂ ਦੇ ਨਾਲ ਸੰਮਲਿਤ ਡਿਜ਼ਾਈਨ।",
            contactTitle: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
            languageTitle: "ਭਾਸ਼ਾ ਚੁਣੋ",
            footerDesc: "ਭਾਰਤ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਅਗਲੀ ਪੀੜ੍ਹੀ ਦੇ AI ਫਸਲੀ ਸਲਾਹਕਾਰੀ, ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਵਿਸ਼ਲੇਸ਼ਣ, ਅਤੇ ਸਿੱਧੇ ਮਾਰਕੀਟ ਲਿੰਕੇజ ਨਾਲ ਸ਼ਕਤੀਕਰਨ।",
            copyright: "ਭਾਰਤ ਸਰਕਾਰ / SIH ਪਹਿਲਕਦਮੀ। ਕਿਸਾਨਾਂ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।"
        },
        'ta': {
            title: "ஸ்மார்ட் பயிர் ஆலோசனை", sub: "ஒவ்வொரு விவசாயிக்கும்", login: "விவசாயி உள்நுழைவு", reg: "புதிய பதிவு",
            aboutTitle: "தளத்தைப் பற்றி",
            aboutDesc: "எங்கள் அமைப்பு விவசாயிகளுக்கு நிகழ்நேர, தரவு சார்ந்த முடிவுகளுடன் அதிகாரம் அளிக்கிறது। AI, வானிலை தரவு மற்றும் மண் ஆரோக்கிய பகுப்பாய்வு ஆகியவற்றை ஒருங்கிணைப்பதன் மூலம், பிராந்தியத்தில் உள்ள சிறு மற்றும் குறு விவசாயிகளுக்கு அபாயங்களைக் குறைக்கவும் லாபத்தை அதிகரிக்கவும் உதவுகிறோம்.",
            featuresTitle: "முக்கிய அம்சங்கள்",
            f1T: "AI பயிர் ஆலோசனை", f1D: "உங்கள் மண் மற்றும் இருப்பிடத்தின் அடிப்படையில் எதை, எப்போது நடவு செய்ய வேண்டும் என்பது குறித்த தனிப்பயனாக்கப்பட்ட வழிகாட்டுதல்.",
            f2T: "வானிலை எச்சரிக்கைகள்", f2D: "உங்கள் பயிர்களைப் பாதுகாக்க நிகழ்நேர வானிலை அறிவிப்புகள் மற்றும் புயல் எச்சரிக்கைகள்.",
            f3T: "மண் மற்றும் உரம்", f3D: "மண் ஆரோக்கியம் మరియు உர அளவுக்கான அறிவியல் பரிந்துரைகள்.",
            f4T: "பூச்சி கண்டறிதல்", f4D: "பூச்சிகள் மற்றும் நோய்களை உடனடியாகக் கண்டறிய பயிர்களின் புகைப்படங்களைப் பதிவேற்றவும்.",
            f5T: "சந்தை விலைகள்", f5D: "சிறந்த மதிப்பைப் பெறுவதை உறுதிசெய்ய மண்டி விலைகளின் நேரடி கண்காணிப்பு.",
            f6T: "குரல் ஆதரவு", f6D: "பயன்படுத்த எளிதாக குரல் சார்ந்த கட்டளைகளுடன் உள்ளடக்கிய வடிவமைப்பு.",
            contactTitle: "எங்களைத் தொடர்பு கொள்ளவும்",
            languageTitle: "மொழியைத் தேர்ந்தெடுக்கவும்",
            footerDesc: "பாரதத்தின் விவசாயிகளுக்கு அடுத்த தலைமுறை AI பயிர் ஆலோசனை, நிகழ்நேர வானிலை பகுப்பாய்வு மற்றும் நேரடி சந்தை இணைப்பு ஆகியவற்றின் மூலம் அதிகாரம் அளித்தல்.",
            copyright: "இந்திய அரசு / SIH முயற்சி. விவசாயிகளுக்காக உருவாக்கப்பட்டது. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
        },
        'te': {
            title: "స్మార్ట్ క్రాప్ అడ్వైజరీ", sub: "ప్రతి రైతు కోసం", login: "రైతు లాగిన్", reg: "కొత్త రిజిస్ట్రేషన్",
            aboutTitle: "ప్లాట్‌ఫారమ్ గురించి",
            aboutDesc: "మా సిస్టమ్ రైతులకు నిజ-సమయ, డేటా ఆధారిత నిర్ణయాలతో అధికారం ఇస్తుంది. AI, వాతావరణ డేటా మరియు నేల ఆరోగ్య విశ్లేషణను ఏకీకృతం చేయడం ద్వారా, మేము ప్రాంతంలోని చిన్న మరియు సన్నకారు రైతులకు నష్టాలను తగ్గించడంలో మరియు లాభదాయకతను పెంచడంలో సహాయం చేస్తాము.",
            featuresTitle: "ముఖ్య లక్షణాలు",
            f1T: "AI పంట సలహా", f1D: "మీ నేల మరియు స్థానం ఆధారంగా ఏమి నాటాలి మరియు ఎప్పుడు నాటాలి అనే దానిపై వ్యక్తిగతీకరించిన మార్గదర్శకత్వం.",
            f2T: "వాతావరణ హెచ్చరికలు", f2D: "మీ పంటలను రక్షించడానికి నిజ-సమయ వాతావరణ అప్‌డేట్‌లు మరియు తుఫాను హెచ్చరికలు.",
            f3T: "నేల & ఎరువులు", f3D: "నేల ఆరోగ్యం మరియు ఎరువుల మోతాదు కోసం శాస్త్రీయ సిఫార్సులు.",
            f4T: "తెగుళ్ల గుర్తింపు", f4D: "తెగుళ్లు మరియు వ్యాధులను తక్షణమే గుర్తించడానికి పంటల ఫోటోలను అప్‌లోడ్ చేయండి.",
            f5T: "మార్కెట్ ధరలు", f5D: "మీరు ఉత్తమ విలువను పొందేలా చూసుకోవడానికి మండి ధరల ప్రత్యక్ష ట్రాకింగ్.",
            f6T: "వాయిస్ సపోర్ట్", f6D: "ఉపయోగించడానికి సులభమైన వాయిస్ ఆధారిత ఆదేశాలతో కూడిన డిజైన్.",
            contactTitle: "మమ్మల్ని సంప్రదించండి",
            languageTitle: "భాషను ఎంచుకోండి",
            footerDesc: "నెక్స్ట్ జనరేషన్ AI పంట సలహా, నిజ-సమయ వాతావరణ విశ్లేషణ మరియు ప్రత్యక్ష మార్కెట్ అనుసంధానంతో భారత్ రైతులకు అధికారం కల్పించడం.",
            copyright: "భారత ప్రభుత్వం / SIH చొరవ. రైతుల కోసం రూపొందించబడింది. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి।"
        },
        'bn': {
            title: "স্মার্ট ফসল পরামর্শ", sub: "প্রত্যেক কৃষকের জন্য", login: "কৃষক লগইন", reg: "নতুন নিবন্ধন",
            aboutTitle: "প্ল্যাটফর্ম সম্পর্কে",
            aboutDesc: "আমাদের সিস্টেম কৃষকদের রিয়েল-টাইম, ডেটা-চালিত সিদ্ধান্তের মাধ্যমে ক্ষমতায়ন করে। AI, আবহাওয়ার ডেটা এবং মাটির স্বাস্থ্য বিশ্লেষণকে একীভূত করে, আমরা এলাকার ক্ষুদ্র ও প্রান্তিক কৃষকদের ঝুঁকি কমাতে এবং লাভজনকতা বাড়াতে সাহায্য করি।",
            featuresTitle: "মূল বৈশিষ্ট্য",
            f1T: "AI ফসল পরামর্শ", f1D: "আপনার মাটি এবং অবস্থানের উপর ভিত্তি করে কী এবং কখন রোপণ করবেন সে সম্পর্কে ব্যক্তিগতকৃত নির্দেশিকা।",
            f2T: "আবহাওয়া সতর্কতা", f2D: "আপনার ফসল রক্ষার জন্য রিয়েল-টাইম আবহাওয়া আপডেট এবং ঝড়ের সতর্কতা।",
            f3T: "মাটি ও সার", f3D: "মাটির স্বাস্থ্য এবং সারের ডোজের জন্য বৈজ্ঞানিক সুপারিশ।",
            f4T: "কীটপতঙ্গ শনাক্তকরণ", f4D: "তাত্ক্ষণিকভাবে কীটপতঙ্গ এবং রোগ শনাক্ত করতে ফসলের ছবি আপলোড করুন।",
            f5T: "বাজার দর", f5D: "আপনি সেরা মূল্য পান তা নিশ্চিত করতে মান্ডি দামের লাইভ ট্র্যাকিং।",
            f6T: "ভয়েস সাপোর্ট", f6D: "সহজে ব্যবহারের জন্য ভয়েস-ভিত্তিক কমান্ড সহ অন্তর্ভুক্ত ডিজাইন।",
            contactTitle: "আমাদের সাথে যোগাযোগ করুন",
            languageTitle: "ভাষা নির্বাচন করুন",
            footerDesc: "নেক্সট-জেন AI ফসল পরামর্শ, রিয়েল-টাইম আবহাওয়া বিশ্লেষণ এবং সরাসরি বাজার সংযোগের মাধ্যমে ভারতের কৃষকদের ক্ষমতায়ন করা।",
            copyright: "ভারত সরকার / SIH উদ্যোগ। কৃষকদের জন্য তৈরি। সমস্ত অধিকার সংরক্ষিত।"
        },
        'or': {
            title: "ସ୍ମାର୍ଟ ଫସଲ ପରାମର୍ଶ", sub: "ପ୍ରତ୍ୟେକ ଚାଷୀଙ୍କ ପାଇଁ", login: "କୃଷକ ଲଗଇନ୍", reg: "ନୂତନ ପଞ୍ଜିକରଣ",
            aboutTitle: "ପ୍ଲାଟଫର୍ମ ବିଷୟରେ",
            aboutDesc: "ଆମର ବ୍ୟବସ୍ଥା ଚାଷୀଙ୍କୁ ବାସ୍ତବ ସମୟ, ତଥ୍ୟ-ଆଧାରିତ ନିଷ୍ପତ୍ତି ସହିତ ସଶକ୍ତ କରେ | AI, ପାଣିପାଗ ତଥ୍ୟ ଏବଂ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣକୁ ଏକୀକୃତ କରି ଆମେ ଅଞ୍ଚଳର କ୍ଷୁଦ୍ର ଏବଂ ନାମମାତ୍ର ଚାଷୀଙ୍କ ପାଇଁ ବିପଦ ହ୍ରାସ କରିବା ଏବଂ ଲାଭ ବୃଦ୍ଧି କରିବାରେ ସାହାଯ୍ୟ କରୁ |",
            featuresTitle: "ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ",
            f1T: "AI ଫସଲ ପରାମର୍ଶ", f1D: "ଆପଣଙ୍କ ମୃତ୍ତିକା ଏବଂ ସ୍ଥାନ ଉପରେ ଆଧାର କରି କ’ଣ ଏବଂ କେବେ ରୋପଣ କରାଯିବ ସେ ସମ୍ବନ୍ଧରେ ବ୍ୟକ୍ତିଗତ ମାର୍ଗଦର୍ଶନ |",
            f2T: "ପାଣିପାଗ ସତର୍କତା", f2D: "ଆପଣଙ୍କ ଫସଲକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ବାସ୍ତବ ସମୟ ପାଣିପाଗ ଅପଡେଟ୍ ଏବଂ ଝଡ ସତର୍କତା |",
            f3T: "ମୃତ୍ତିକା ଏବଂ ସାର", f3D: "ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ସାର ମାତ୍ରା ପାଇଁ ବୈଜ୍ଞାନିକ ସୁପାରିଶ |",
            f4T: "ପୋକ ଚିହ୍ନଟ", f4D: "ପୋକ ଏବଂ ରୋଗକୁ ତୁରନ୍ତ ଚିହ୍ନଟ କରିବା ପାଇଁ ଫସଲର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ |",
            f5T: "ବଜାର ଦର", f5D: "ଆପଣ ସର୍ବୋତ୍ତମ ମୂଲ୍ୟ ପାଇବାକୁ ନିଶ୍ଚିତ କରିବା ପାଇଁ ମାଣ୍ଡି ମୂଲ୍ୟର ଲାଇଭ୍ ଟ୍ରାକିଂ |",
            f6T: "ଭଏସ୍ ସପୋର୍ଟ", f6D: "ବ୍ୟବହਾਰର ସହଜତା ପାଇଁ ସ୍ୱର-ଆଧାରିତ ନିର୍ଦ୍ଦେଶ ସହିତ ଅନ୍ତର୍ଭୁକ୍ત ଡିଜାଇନ୍ |",
            contactTitle: "ଆମ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ",
            languageTitle: "ଭାଷା ଚୟନ କରନ୍ତୁ",
            footerDesc: "ପରବର୍ତ୍ତୀ ପିଢିର AI ଫସଲ ପରାମର୍ଶ, ବାସ୍ତବ ସମୟ ପାଣିପାଗ ବିଶ୍ଳେଷଣ ଏବଂ ପ୍ରତ୍ୟକ୍ଷ ବଜାର ସଂଯୋଗ ସହିତ ଭାରତର ଚାଷୀଙ୍କୁ ସଶକ୍ତ କରିବା |",
            copyright: "ଭାରତ ସରକାର / SIH ପଦକ୍ଷେପ | ଚାଷୀଙ୍କ ପାଇଁ ନିର୍ମିତ | ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ |"
        },
        'mr': {
            title: "स्मार्ट पीक सल्ला", sub: "प्रत्येक शेतकऱ्यासाठी", login: "शेतकरी लॉगिन", reg: "नवीन नोंदणी",
            aboutTitle: "प्लॅटफॉर्मबद्दल",
            aboutDesc: "आमची प्रणाली शेतकऱ्यांना रिअल-टाइम, डेटा-चालित निर्णयांसह सक्षम करते. AI, हवामान डेटा आणि मृदा आरोग्य विश्लेषण एकत्रित करून, आम्ही क्षेत्रातील अल्प आणि अत्यल्प भूधारक शेतकऱ्यांसाठी जोखीम कमी करण्यास आणि नफा वाढवण्यास मदत करतो.",
            featuresTitle: "प्रमुख वैशिष्ट्ये",
            f1T: "AI पीक सल्ला", f1D: "तुमच्या माती आणि स्थानाच्या आधारे काय आणि कधी लावायचे याबद्दल वैयक्तिक मार्गदर्शन.",
            f2T: "हवामान अलर्ट", f2D: "तुमच्या पिकांचे संरक्षण करण्यासाठी रिअल-टाइम हवामान अपडेट आणि वादळाच्या इशाऱ्या.",
            f3T: "माती आणि खत", f3D: "मातीचे आरोग्य आणि खतांच्या डोससाठी वैज्ञानिक शिफारसी.",
            f4T: "कीड ओळख", f4D: "कीड आणि रोगांचा त्वरित शोध घेण्यासाठी पिकांचे फोटो अपलोड करा.",
            f5T: "बाजार भाव", f5D: "तुम्हाला सर्वोत्तम मूल्य मिळेल याची खात्री करण्यासाठी मंडीच्या किमतींचा थेट मागोवा.",
            f6T: "व्हॉइस सपोर्ट", f6D: "वापरण्यास सुलभतेसाठी आवाज-आधारित कमांडसह सर्वसमावेशक डिझाइन.",
            contactTitle: "आमच्याशी संपर्क साधा",
            languageTitle: "भाषा निवडा",
            footerDesc: "भारतातील शेतकऱ्यांना पुढील पिढीतील AI पीक सल्ला, रिअल-टाइम हवामान विश्लेषण आणि थेट बाजार जोडणीद्वारे सक्षम करणे.",
            copyright: "भारत सरकार / SIH उपक्रम. शेतकऱ्यांसाठी तयार केलेले. सर्व हक्क राखीव."
        },
        'gu': {
            title: "સ્માર્ટ પાક સલાહ", sub: "દરેક ખેડૂત માટે", login: "ખેડૂત લોગિન", reg: "નવી નોંધણી",
            aboutTitle: "પ્લેટફોર્મ વિશે",
            aboutDesc: "અમારી સિસ્ટમ ખેડૂતોને રીઅલ-ટાઇમ, ડેટા-આધારિત નિર્ણયો સાથે સશક્ત બનાવે છે. AI, હવામાન ડેટા અને જમીન આરોગ્ય વિશ્લેષણને સંકલિત કરીને, અમે પ્રદેશના નાના અને સીમાંત ખેડૂતો માટે જોખમો ઘટાડવામાં અને નફાકારકતા વધારવામાં મદદ કરીએ છીએ.",
            featuresTitle: "મુખ્ય લાક્ષણિકતાઓ",
            f1T: "AI પાક સલાહ", f1D: "તમારી જમીન અને સ્થાનના આધારે શું અને ક્યારે રોપવું તે અંગે વ્યક્તિગત માર્ગદર્શન.",
            f2T: "હવામાન ચેતવણીઓ", f2D: "તમારા પાકની સુરક્ષા માટે રીઅલ-ટાઇમ હવામાન અપડેટ્સ અને વાવાઝોડાની ચેતવણીઓ.",
            f3T: "જમીન અને ખાતર", f3D: "જમીનનું આરોગ્ય અને ખાતરના ડોઝ માટે વૈજ્ઞાનિક ભલામણો.",
            f4T: "જંતુ શોધ", f4D: "જંતુઓ અને રોગોને તાત્કાલિક શોધવા માટે પાકના ફોટા અપલોડ કરો.",
            f5T: "બજાર ભાવ", f5D: "તમને શ્રેષ્ઠ મૂલ્ય મળે તેની ખાતરી કરવા માટે મંડીના ભાવનું લાઈવ ટ્રેકિંગ.",
            f6T: "વૉઇસ સપોર્ટ", f6D: "ઉપયોગમાં સરળતા માટે અવાજ-આધારિત આદેશો સાથે સમાવેશી ડિઝાઇન.",
            contactTitle: "અમારો સંપર્ક કરો",
            languageTitle: "ભાષા પસંદ કરો",
            footerDesc: "ભારતના ખેડૂતોને નેક્સ્ટ-જનન AI પાક સલાહકાર, રીઅલ-ટાઇમ હવામાન વિશ્લેષણ અને સીધા બજાર જોડાણ સાથે સશક્તિકરણ.",
            copyright: "ભારત સરકાર / SIH પહેલ. ખેડૂતો માટે બનાવેલ. સર્વાધિકાર સુરક્ષિત."
        },
        'kn': {
            title: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಸಲಹೆ", sub: "ಪ್ರತಿ ರೈತರಿಗಾಗಿ", login: "ರೈತರ ಲಾಗಿನ್", reg: "ಹೊಸ ನೋಂದಣಿ",
            aboutTitle: "ವೇದಿಕೆಯ ಬಗ್ಗೆ",
            aboutDesc: "ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ರೈತರಿಗೆ ನೈಜ-ಸಮಯದ, ಡೇಟಾ-ಚಾಲಿತ ನಿರ್ಧಾರಗಳೊಂದಿಗೆ ಅಧಿಕಾರ ನೀಡುತ್ತದೆ. AI, ಹವಾಮಾನ ಡೇಟಾ ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಮೂಲಕ, ಪ್ರದೇಶದ ಸಣ್ಣ ಮತ್ತು ಅತಿಸಣ್ಣ ರೈತರಿಗೆ ಅಪಾಯಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಲಾಭದಾಯಕತೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
            featuresTitle: "ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು",
            f1T: "AI ಬೆಳೆ ಸಲಹೆ", f1D: "ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ ಏನು ಮತ್ತು ಯಾವಾಗ ನಾಟಿ ಮಾಡಬೇಕೆಂಬುದರ ಬಗ್ಗೆ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ.",
            f2T: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು", f2D: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ನವೀಕರಣಗಳು ಮತ್ತು ಚಂಡಮಾರುತದ ಎಚ್ಚರಿಕೆಗಳು.",
            f3T: "ಮಣ್ಣು ಮತ್ತು ರಸಗೊಬ್ಬರ", f3D: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣಕ್ಕಾಗಿ ವೈಜ್ಞಾನಿಕ ಶಿಫಾರಸುಗಳು.",
            f4T: "ಕೀಟ ಪತ್ತೆ", f4D: "ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಲು ಬೆಳೆಗಳ ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
            f5T: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", f5D: "ನೀವು ಉತ್ತಮ ಮೌಲ್ಯವನ್ನು ಪಡೆಯುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಮಂಡಿ ಬೆಲೆಗಳ ನೇರ ಟ್ರ್ಯಾಕಿಂಗ್.",
            f6T: "ಧ್ವನಿ ಬೆಂಬಲ", f6D: "ಬಳಕೆಯ ಸುಲಭತೆಗಾಗಿ ಧ್ವನಿ ಆಧಾರಿತ ಆಜ್ಞೆಗಳೊಂದಿಗೆ ಒಳಗೊಂಡ ವಿನ್ಯಾಸ.",
            contactTitle: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
            languageTitle: "ಭಾಷೆಯನ್ನು ಆರಿಸಿ",
            footerDesc: "ಮುಂದಿನ ಪೀಳಿಗೆಯ AI ಬೆಳೆ ಸಲಹೆ, ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ನೇರ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕದೊಂದಿಗೆ ಭಾರತದ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
            copyright: "ಭಾರತ ಸರ್ಕಾರ / SIH ಉಪಕ್ರಮ. ರೈತರಿಗಾಗಿ ರಚಿಸಲಾಗಿದೆ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."
        },
        'ml': {
            title: "സ്മാർട്ട് വിള ഉപദേശം", sub: "ഓരോ കർഷകനും", login: "കർഷക ലോഗിൻ", reg: "പുതിയ രജിസ്ട്രേഷൻ",
            aboutTitle: "പ്ലാറ്റ്‌ഫോമിനെക്കുറിച്ച്",
            aboutDesc: "ഞങ്ങളുടെ സിസ്റ്റം കർഷകരെ തത്സമയ, ഡാറ്റാധിഷ്ഠിത തീരുമാനങ്ങളിലൂടെ ശാക്തീകരിക്കുന്നു. AI, കാലാവസ്ഥാ ഡാറ്റ, മണ്ണ് ആരോഗ്യ വിശകലനം എന്നിവ സമന്വയിപ്പിക്കുന്നതിലൂടെ, മേഖലയിലെ ചെറുകിട കർഷകർക്ക് അപകടസാധ്യതകൾ കുറയ്ക്കാനും ലാഭം വർദ്ധിപ്പിക്കാനും ഞങ്ങൾ സഹായിക്കുന്നു.",
            featuresTitle: "പ്രധാന സവിശേഷതകൾ",
            f1T: "AI വിള ഉപദേശം", f1D: "നിങ്ങളുടെ മണ്ണും സ്ഥാനവും അടിസ്ഥാനമാക്കി എപ്പോൾ, എന്ത് നടണം എന്നതിനെക്കുറിച്ചുള്ള വ്യക്തിഗത മാർഗ്ഗനിർദ്ദേശം.",
            f2T: "കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ", f2D: "നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കുന്നതിനായി തത്സമയ കാലാവസ്ഥാ അപ്‌ഡേറ്റുകളും കൊടുങ്കാറ്റ് മുന്നറിയിപ്പുകളും.",
            f3T: "മണ്ണും വളവും", f3D: "മണ്ണിന്റെ ആരോഗ്യത്തിനും വളത്തിന്റെ അളവിനും ശാസ്ത്രീയ ശുപാർശകൾ.",
            f4T: "കീടങ്ങളെ കണ്ടെത്തൽ", f4D: "കീടങ്ങളെയും രോഗങ്ങളെയും തൽക്ഷണം കണ്ടെത്തുന്നതിന് വിളകളുടെ ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുക.",
            f5T: "വിപണി വില", f5D: "നിങ്ങൾക്ക് മികച്ച മൂല്യം ലഭിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കാൻ മണ്ടി വിലകളുടെ ലൈവ് ട്രാക്കിംഗ്.",
            f6T: "വോയ്‌സ് സപ്പോർട്ട്", f6D: "എളുപ്പത്തിലുള്ള ഉപയോഗത്തിനായി ശബ്‌ദാധിഷ്‌ഠിത കമാൻഡുകളുള്ള ഡിസൈൻ.",
            contactTitle: "ഞങ്ങളെ ബന്ധപ്പെടുക",
            languageTitle: "ഭാഷ തിരഞ്ഞെടുക്കുക",
            footerDesc: "അടുത്ത തലമുറ AI വിള ഉപദേശം, തത്സമയ കാലാവസ്ഥാ വിശകലനം, നേരിട്ടുള്ള വിപണി ബന്ധം എന്നിവയിലൂടെ ഭാരതത്തിലെ കർഷകരെ ശാക്തീകരിക്കുന്നു.",
            copyright: "ഇന്ത്യ ഗവൺമെന്റ് / SIH സംരംഭം. കർഷകർക്കായി നിർമ്മിച്ചത്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം."
        },
        'sa': {
            title: "स्मार्ट सस्य परामर्शः", sub: "प्रत्येककृषकाय", login: "कृषक प्रवेशः", reg: "नूतन पञ्जीकरणम्",
            aboutTitle: "मञ्चस्य विषयः",
            aboutDesc: "अस्माकं प्रणाली वास्तविक-समय, दत्तांश-आधारित निर्णयैः कृषकान् सक्षमीकरोति। AI, ऋतु-दत्तांशं, मृदा-स्वास्थ्य-विश्लेषणं च एकीकृत्य वयं कृषकानां जोखिमं न्यूनीकर्तुं लाभं च वर्धयितुं साहाय्यं कुर्मः।",
            featuresTitle: "प्रमुखाः विशेषाः",
            f1T: "AI सस्य परामर्शः", f1D: "भवतः मृदायाः स्थानस्य च आधारेण किं कदा च रोपणीयम् इति विषये व्यक्तिगतं मार्गदर्शनम्।",
            f2T: "ऋतु चेतावनयः", f2D: "सस्यरक्षणार्थं वास्तविक-समय ऋतु-सूचनाः झञ्झावात-सूचनाः च।",
            f3T: "मृदा उर्वरकः च", f3D: "मृदास्वास्थ्यस्य उर्वरकमात्रायाः च कृते वैज्ञानिकाः शिफारसाः।",
            f4T: "कीट-अन्वेषणम्", f4D: "कीटान् रोगान् च तत्क्षणं ज्ञातुं सस्यानां चित्रणं प्रेषयन्तु।",
            f5T: "आपण मूल्यानि", f5D: "भवन्तः उत्तमं मूल्यं प्राप्नुवन्तु इति सुनिश्चित्य आपण-मूल्यानां सजीव-अनुसरणम्।",
            f6T: "वाक् सहायता", f6D: "उपयोगाय सुलभं वाग्-आधारित-आदेशैः सह सर्वसमावेशी विन्यासः।",
            contactTitle: "अस्मान् सम्पर्कयन्तु",
            languageTitle: "भाषां चिनोतु",
            footerDesc: "नूतन-पीढ्याः AI सस्य-परामर्शेन, वास्तविक-समय ऋतु-विश्लेषणेन, साक्षात् आपण-सम्बन्धेन च भारतस्य कृषकान् सक्षमीकरणम्।",
            copyright: "भारत-सर्वकारः / SIH उपक्रमः। कृषकानां कृते निर्मितम्। सर्वाधिकारसुरक्षिताः।"
        },
        'ne': {
            title: "स्मार्ट बाली सल्लाह", sub: "प्रत्येक किसानको लागि", login: "किसान लगइन", reg: "नयाँ दर्ता",
            aboutTitle: "प्लेटफर्मको बारेमा",
            aboutDesc: "हाम्रो प्रणालीले किसानहरूलाई वास्तविक-समय, डेटा-संचालित निर्णयहरूको साथ सशक्त बनाउँछ। AI, मौसम डेटा र माटो स्वास्थ्य विश्लेषण एकीकृत गरेर, हामी क्षेत्रका साना किसानहरूको लागि जोखिम कम गर्न र नाफा बढाउन मद्दत गर्छौं।",
            featuresTitle: "प्रमुख विशेषताहरू",
            f1T: "AI बाली सल्लाह", f1D: "तपाईंको माटो र स्थानको आधारमा के र कहिले रोप्ने भन्ने बारे व्यक्तिगत मार्गदर्शन।",
            f2T: "मौसम अलर्ट", f2D: "तपाईंको बाली जोगाउन वास्तविक-समय मौसम अपडेटहरू र आँधीबेहरीको चेतावनी।",
            f3T: "माटो र मल", f3D: "माटोको स्वास्थ्य र मलको मात्राको लागि वैज्ञानिक सिफारिशहरू।",
            f4T: "कीरा पत्ता लगाउने", f4D: "कीरा र रोगहरू तुरुन्तै पत्ता लगाउन बालीहरूको फोटो अपलोड गर्नुहोस्।",
            f5T: "बजार मूल्य", f5D: "तपाईंले उत्तम मूल्य पाउनुहुन्छ भन्ने सुनिश्चित गर्न बजार मूल्यहरूको लाइभ ट्र्याकिङ।",
            f6T: "आवाज समर्थन", f6D: "प्रयोगमा सजिलोको लागि आवाज-आधारित आदेशहरूको साथ समावेशी डिजाइन।",
            contactTitle: "हामीलाई सम्पर्क गर्नुहोस्",
            languageTitle: "भाषा छान्नुहोस्",
            footerDesc: "नेक्स्ट-जेन AI बाली सल्लाह, वास्तविक समय मौसम विश्लेषण र प्रत्यक्ष बजार लिङ्कको साथ भारतका किसानहरूलाई सशक्त बनाउँदै।",
            copyright: "नेपाल सरकार / SIH पहल। किसानहरूको लागि बनाइएको। सबै अधिकार सुरक्षित।"
        }
    };

    const t = content[language] || content['en'];

    return (
        <div className="w-full">
            {/* Hero Section with Video Background */}
            <section className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
                <div className="video-bg-container absolute top-0 left-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-1000"></div> {/* Darker overlay for better text pop against custom image */}
                    <img
                        src={farmingBg}
                        alt="My farm"
                        className="video-bg object-cover w-full h-full scale-105 animate-slow-zoom"
                    />
                </div>

                <div className="relative z-20 container animate-fade-in flex justify-center items-center h-full pt-16">
                    <div className="bg-white/60 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] shadow-2xl max-w-5xl border border-white/40 text-center transform hover:scale-[1.01] transition-transform duration-500">
                        <div className="mb-6 flex justify-center">
                            <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-full shadow-inner">
                                <Leaf size={82} className="text-primary drop-shadow-sm" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight" style={{ fontFamily: '"Bookman Old Style", serif' }}>
                            {t.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-700 block mt-2 text-4xl md:text-6xl">
                                {t.sub}
                            </span>
                        </h1>


                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/login" className="btn btn-primary text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide">
                                {t.login}
                            </Link>
                            <Link to="/register" className="btn btn-white text-xl px-10 py-4 rounded-full border-2 border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide text-gray-800">
                                {t.reg}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white text-center">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-6 text-primary">{t.aboutTitle}</h2>
                    <p className="max-w-4xl mx-auto text-lg text-gray-700">
                        {t.aboutDesc}
                    </p>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-12 text-center">{t.featuresTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Leaf size={32} className="text-white drop-shadow-md" />}
                            title={t.f1T}
                            desc={t.f1D}
                            colorClass="card-gradient-green"
                        />
                        <FeatureCard
                            icon={<CloudRain size={32} className="text-white drop-shadow-md" />}
                            title={t.f2T}
                            desc={t.f2D}
                            colorClass="card-gradient-blue"
                        />
                        <FeatureCard
                            icon={<TrendingUp size={32} className="text-white drop-shadow-md" />}
                            title={t.f3T}
                            desc={t.f3D}
                            colorClass="card-gradient-orange"
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={32} className="text-white drop-shadow-md" />}
                            title={t.f4T}
                            desc={t.f4D}
                            colorClass="card-gradient-red"
                        />
                        <FeatureCard
                            icon={<TrendingUp size={32} className="text-white drop-shadow-md" />}
                            title={t.f5T}
                            desc={t.f5D}
                            colorClass="card-gradient-yellow"
                        />
                        <FeatureCard
                            icon={<Mic size={32} className="text-white drop-shadow-md" />}
                            title={t.f6T}
                            desc={t.f6D}
                            colorClass="card-gradient-purple"
                        />
                    </div>
                </div>
            </section>



            {/* Footer */}
            <footer className="footer bg-black text-white py-12">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Leaf size={28} />
                            <h3 className="text-2xl font-bold text-white tracking-tight">Agri Shakthi</h3>
                        </div>
                        <p className="text-gray-400 max-w-xs leading-relaxed">
                            {t.footerDesc}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white relative inline-block">
                            {t.contactTitle}
                            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
                        </h3>
                        <div className="space-y-3">
                            <p className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <span className="bg-gray-800 p-2 rounded-full"><Phone size={16} /></span>
                                +91 1800-123-4567
                            </p>
                            <p className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <span className="bg-gray-800 p-2 rounded-full"><Globe size={16} /></span>
                                support@agrisathi.gov.in
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white relative inline-block">
                            {t.languageTitle}
                            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
                        </h3>
                        <div className="relative group">
                            <select
                                className="language-selector w-full"
                                value={language}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English (Global)</option>
                                <option value="hi">हिन्दी (Hindi)</option>
                                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                                <option value="ta">தமிழ் (Tamil)</option>
                                <option value="te">తెలుగు (Telugu)</option>
                                <option value="mr">मराठी (Marathi)</option>
                                <option value="gu">ગુજરાતી (Gujarati)</option>
                                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                                <option value="ml">മലയാളം (Malayalam)</option>
                                <option value="bn">বাংলা (Bengali)</option>
                                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                                <option value="sa">संस्कृतम् (Sanskrit)</option>
                                <option value="ur">اردو (Urdu)</option>
                                <option value="ne">नेपाली (Nepali)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12 pt-8 border-t border-gray-800/50 text-gray-500 text-sm">
                    <p>© 2026 {t.copyright}</p>
                </div>
            </footer>

            {/* Floating Voice Assistant Trigger */}
            <button
                onClick={() => setShowVoiceAssistant(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100] border-4 border-white"
                title="Speak to Agri Shakthi"
            >
                <Mic size={32} />
            </button>

            {showVoiceAssistant && (
                <VoiceAssistant
                    onClose={() => setShowVoiceAssistant(false)}
                    userLanguage={language}
                />
            )}
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, colorClass }) => (
    <div className={`feature-card-vibrant ${colorClass}`}>
        <div className="feature-card-icon-wrapper">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white tracking-wide text-shadow-strong">{title}</h3>
        <p className="feature-desc text-sm text-shadow-strong">{desc}</p>
    </div>
);

export default Home;
