
import React from 'react';
import {
    CloudRain, Droplet, Thermometer,
    Leaf, TrendingUp, AlertCircle, Camera, Mic,
    MessageSquare, User, ChevronRight, Bug, MapPin, Loader2, Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VoiceAssistant from '../components/VoiceAssistant';
import PestDetection from '../components/PestDetection';
import ExpertHelp from '../components/ExpertHelp';
import LiveWeather from '../components/LiveWeather';
import WeatherModule from '../components/WeatherModule';

const Dashboard = () => {
    const navigate = useNavigate();

    // Initialize user state synchronously from localStorage to prevent flicker/disappear on refresh
    const [user, setUser] = React.useState(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return null;
        try {
            const parsed = JSON.parse(storedUser);
            return (parsed && typeof parsed === 'object') ? parsed : null;
        } catch (e) {
            console.error("Dashboard: Initial state parse error", e);
            localStorage.removeItem('user');
            return null;
        }
    });

    const [showVoiceAssistant, setShowVoiceAssistant] = React.useState(false);
    const [showPestDetection, setShowPestDetection] = React.useState(false);
    const [showExpertHelp, setShowExpertHelp] = React.useState(false);
    const getNormalizedLanguage = () => {
        // Priority: Manually selected session language > User profile language > Default 'en'
        const raw = localStorage.getItem('preferredLanguage') || user?.language || 'en';
        const langMap = {
            'tamil': 'ta', 'hindi': 'hi', 'telugu': 'te', 'punjabi': 'pa', 
            'bengali': 'bn', 'marathi': 'mr', 'gujarati': 'gu', 'kannada': 'kn',
            'urdu': 'ur', 'sanskrit': 'sa', 'nepali': 'ne'
        };
        const normalized = raw.toLowerCase();
        return langMap[normalized] || normalized;
    };
    const language = getNormalizedLanguage();

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const translations = {
        'en': {
            greet: "Namaste", morning: "Good Morning", fields: "Your crop fields are looking healthy. Check today's advisory below.",
            scan: "Scan Crop", voice: "Voice Assistant", quick: "Quick Actions", soil: "Soil Health", npk: "NPK Status",
            mandi: "Mandi Prices", live: "Live Rates", weather: "Weather", forecast: "Forecast", expert: "Expert Help",
            connect: "Connect Now", pestTitle: "AI Pest Detection", history: "View History", upload: "Upload or Take a Photo",
            pestDesc: "Detect pests and diseases instantly with our 98% accurate AI model.", weatherTitle: "Weather Forecast",
            hum: "Humidity", wind: "Wind", alerts: "Advisory Alerts", trends: "Market Trends", viewAll: "View All Crops",
            crop: "crop", ago: "ago"
        },
        'hi': {
            greet: "नमस्ते", morning: "सुप्रभात", fields: "आपके खेत स्वस्थ दिख रहे हैं। नीचे आज की सलाह देखें।",
            scan: "फसल स्कैन करें", voice: "ध्वनि सहायक", quick: "त्वरित कार्रवाई", soil: "मिट्टी का स्वास्थ्य", npk: "एनपीके स्थिति",
            mandi: "मंडी भाव", live: "लाइव दरें", weather: "मौसम", forecast: "पूर्वानुमान", expert: "विशेषज्ञ सहायता",
            connect: "अभी जुड़ें", pestTitle: "एआई कीट पहचान", history: "इतिहास देखें", upload: "फोटो अपलोड करें या लें",
            pestDesc: "हमारे 98% सटीक एआई मॉडल के साथ तुरंत कीटों और बीमारियों का पता लगाएं।", weatherTitle: "मौसम का पूर्वानुमान",
            hum: "नमी", wind: "हवा", alerts: "सलाह अलर्ट", trends: "बाजार के रुझान", viewAll: "सभी फसलें देखें",
            crop: "फसल", ago: "पहले"
        },
        'ta': {
            greet: "வணக்கம்", morning: "காலை வணக்கம்", fields: "உங்கள் பயிர் நிலங்கள் ஆரோக்கியமாகத் தெரிகின்றன. இன்றைய ஆலோசனையை கீழே பார்க்கவும்.",
            scan: "பயிரை ஸ்கேன் செய்க", voice: "குரல் உதவியாளர்", quick: "விரைவான செயல்கள்", soil: "மண் ஆரோக்கியம்", npk: "NPK நிலை",
            mandi: "மண்டி விலைகள்", live: "நேரடி விலைகள்", weather: "வானிலை", forecast: "முன்கணிப்பு", expert: "நிபுணர் உதவி",
            connect: "இப்போது இணையுங்கள்", pestTitle: "AI பூச்சி கண்டறிதல்", history: "வரலாற்றைக் காண்க", upload: "புகைப்படத்தைப் பதிவேற்றவும்",
            pestDesc: "எங்கள் 98% துல்லியமான AI மாடல் மூலம் பூச்சிகள் மற்றும் நோய்களை உடனடியாகக் கண்டறியவும்.", weatherTitle: "வானிலை முன்கணிப்பு",
            hum: "ஈரப்பதம்", wind: "காற்று", alerts: "ஆலோசனை எச்சரிக்கைகள்", trends: "சந்தை போக்குகள்", viewAll: "அனைத்து பயிர்களையும் காண்க",
            crop: "பயிர்", ago: "முன்பு"
        },
        'te': {
            greet: "నమస్తే", morning: "శుభోదయం", fields: "మీ పంట పొలాలు ఆరోగ్యంగా కనిపిస్తున్నాయి. నేటి సలహాను క్రింద చూడండి.",
            scan: "పంటను స్కాన్ చేయండి", voice: "వాయిస్ అసిస్టెంట్", quick: "త్వరిత చర్యలు", soil: "నేల ఆరోగ్యం", npk: "NPK స్థితి",
            mandi: "మండి ధరలు", live: "ప్రత్యక్ష ధరలు", weather: "వాతావరణం", forecast: "అంచనా", expert: "నిపుణుల సహాయం",
            connect: "ఇప్పుడే కనెక్ట్ అవ్వండి", pestTitle: "AI తెగుళ్ల గుర్తింపు", history: "చరిత్రను చూడండి", upload: "ఫోటోను అప్‌లోడ్ చేయండి",
            pestDesc: "మా 98% ఖచ్చితమైన AI మోడల్‌తో తెగుళ్లు మరియు వ్యాధులను తక్షణమే గుర్తించండి.", weatherTitle: "వాతావరణ సూచన",
            hum: "తేమ", wind: "గాలి", alerts: "సలహా హెచ్చరికలు", trends: "మార్కెట్ ధోరణులు", viewAll: "అన్ని పంటలను చూడండి",
            crop: "పంట", ago: "క్రితం"
        },
        'mr': {
            greet: "नमस्कार", morning: "शुभ प्रभात", fields: "तुमची पिके निरोगी दिसत आहेत. खालील आजचा सल्ला तपासा.",
            scan: "पीक स्कॅन करा", voice: "व्हॉइस असिस्टंट", quick: "द्रुत कृती", soil: "मृदा आरोग्य", npk: "NPK स्थिती",
            mandi: "मंडी दर", live: "थेट दर", weather: "हवामान", forecast: "अंदाज", expert: "तज्ज्ञ मदत",
            connect: "आता कनेक्ट व्हा", pestTitle: "AI कीड ओळख", history: "इतिहास पहा", upload: "फोटो अपलोड करा किंवा घ्या",
            pestDesc: "आमच्या 98% अचूक AI मॉडेलसह कीड आणि रोगांचा त्वरित शोध घ्या.", weatherTitle: "हवामान अंदाज",
            hum: "आर्द्रता", wind: "वारा", alerts: "सल्ला अलर्ट", trends: "बाजार कल", viewAll: "सर्व पिके पहा",
            crop: "पीक", ago: "पूर्वी"
        },
        'gu': {
            greet: "નમસ્તે", morning: "શુભ સવાર", fields: "તમારા ખેતરો સ્વસ્થ લાગે છે. નીચેની આજની સલાહ તપાસો.",
            scan: "પાક સ્કેન કરો", voice: "વોઈસ આસિસ્ટન્ટ", quick: "ઝડપી ક્રિયાઓ", soil: "જમીનનું સ્વાસ્થ્ય", npk: "NPK સ્થિતિ",
            mandi: "મંડી ભાવ", live: "લાઇવ દરો", weather: "હવામાન", forecast: "અનુમાન", expert: "નિષ્ણાત મદદ",
            connect: "અત્યારે જોડાઓ", pestTitle: "AI જીવાત ઓળખ", history: "ઇતિહાસ જુઓ", upload: "ફોટો અપલોડ કરો અથવા લો",
            pestDesc: "અમારા 98% સચોટ AI મોડલ સાથે જીવાતો અને રોગોને તરત જ શોધો.", weatherTitle: "હવામાન આગાહી",
            hum: "ભેજ", wind: "પવન", alerts: "સલાહ ચેતવણીઓ", trends: "બજારના વલણો", viewAll: "તમામ પાક જુઓ",
            crop: "પાક", ago: "પહેલાં"
        },
        'pa': {
            greet: "ਨਮਸਤੇ", morning: "ਸ਼ੁਭ ਸਵੇਰ", fields: "ਤੁਹਾਡੇ ਖੇਤ ਤੰਦਰੁਸਤ ਦਿਖਾਈ ਦੇ ਰਹੇ ਹਨ। ਅੱਜ ਦੀ ਸਲਾਹ ਹੇਠਾਂ ਦੇਖੋ।",
            scan: "ਫਸਲ ਸਕੈਨ ਕਰੋ", voice: "ਵੌਇਸ ਅਸਿਸਟੈਂਟ", quick: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ", soil: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ", npk: "NPK ਸਥਿਤੀ",
            mandi: "ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ", live: "ਲਾਈਵ ਰੇਟ", weather: "ਮੌਸਮ", forecast: "ਪੂਰਵ ਅਨੁਮਾਨ", expert: "ਮਾਹਰ ਮਦਦ",
            connect: "ਹੁਣੇ ਜੁੜੋ", pestTitle: "AI ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ", history: "ਇਤਿਹਾਸ ਦੇਖੋ", upload: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਜਾਂ ਲਓ",
            pestDesc: "ਸਾਡੇ 98% ਸਹੀ AI ਮਾਡਲ ਨਾਲ ਕੀੜਿਆਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਦਾ ਤੁਰੰਤ ਪਤਾ ਲਗਾਓ।", weatherTitle: "ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ",
            hum: "ਨਮੀ", wind: "ਹਵਾ", alerts: "ਸਲਾਹ ਚੇਤਾਵਨੀਆਂ", trends: "ਬਾਜ਼ਾਰ ਦੇ ਰੁਝਾਨ", viewAll: "ਸਾਰੀਆਂ ਫਸਲਾਂ ਦੇਖੋ",
            crop: "ਫਸਲ", ago: "ਪਹਿਲਾਂ"
        },
        'kn': {
            greet: "ನಮಸ್ತೆ", morning: "ಶುಭೋದಯ", fields: "ನಿಮ್ಮ ಬೆಳೆ ಹೊಲಗಳು ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತಿವೆ. ಇಂದಿನ ಸಲಹೆಯನ್ನು ಕೆಳಗೆ ಪರಿಶೀಲಿಸಿ.",
            scan: "ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", voice: "ಧ್ವನಿ ಸಹಾಯಕ", quick: "ತ್ವರಿತ ಕ್ರಮಗಳು", soil: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ", npk: "NPK ಸ್ಥಿತಿ",
            mandi: "ಮಂಡಿ ಬೆಲೆಗಳು", live: "ಲೈವ್ ದರಗಳು", weather: "ಹವಾಮಾನ", forecast: "ಮುನ್ಸೂಚನೆ", expert: "ತಜ್ಞರ ಸಹಾಯ",
            connect: "ಈಗ ಸಂಪರ್కಿಸಿ", pestTitle: "AI ಕೀಟ ಪತ್ತೆ", history: "ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ", upload: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ತೆಗೆದುಕೊಳ್ಳಿ",
            pestDesc: "ನಮ್ಮ 98% ನಿಖರವಾದ AI ಮಾದರಿಯೊಂದಿಗೆ ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ.", weatherTitle: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
            hum: "ಆರ್ದ್ರತೆ", wind: "ಗಾಳಿ", alerts: "ಸಲಹಾ ಎಚ್ಚರಿಕೆಗಳು", trends: "ಮಾರುకಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು", viewAll: "ಎಲ್ಲಾ ಬೆಳೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
            crop: "ಬೆಳೆ", ago: "ಹಿಂದೆ"
        },
        'ml': {
            greet: "നമസ്തേ", morning: "സുപ്രഭാതം", fields: "നിങ്ങളുടെ വിളകൾ ആരോഗ്യകരമായി കാണപ്പെടുന്നു. ഇന്നത്തെ ഉപദേശം താഴെ പരിശോധിക്കുക.",
            scan: "വിള സ്കാൻ ചെയ്യുക", voice: "വോയ്‌സ് അസിസ്റ്റന്റ്", quick: "പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ", soil: "മണ്ണ് ആരോഗ്യം", npk: "NPK നില",
            mandi: "മണ്ടി വിലകൾ", live: "തത്സമയ നിരക്കുകൾ", weather: "കാലാവസ്ഥ", forecast: "പ്രവചനം", expert: "വിദഗ്ധ സഹായം",
            connect: "ഇപ്പോൾ ബന്ധപ്പെടുക", pestTitle: "AI കീടങ്ങളെ കണ്ടെത്തൽ", history: "ചരിത്രം കാണുക", upload: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ എടുക്കുക",
            pestDesc: "ഞങ്ങളുടെ 98% കൃത്യമായ AI മോഡൽ ഉപയോഗിച്ച് കീടങ്ങളെയും രോഗങ്ങളെയും തൽക്ഷണം കണ്ടെത്തുക.", weatherTitle: "കാലാവസ്ഥാ പ്രവചനം",
            hum: "ആർദ്രത", wind: "കാറ്റ്", alerts: "ഉപദേശ മുന്നറിയിപ്പുകൾ", trends: "വിപണി പ്രവണതകൾ", viewAll: "എല്ലാ വിളകളും കാണുക",
            crop: "വിള", ago: "മുമ്പ്"
        },
        'bn': {
            greet: "নমস্তে", morning: "সুপ্রভাত", fields: "আপনার ফসল সুস্থ দেখাচ্ছে। নিচের আজকের পরামর্শ দেখুন।",
            scan: "ফসল স্ক্যান", voice: "ভয়েস অ্যাসিস্ট্যান্ট", quick: "দ্রুত পদক্ষেপ", soil: "মাটির স্বাস্থ্য", npk: "NPK অবস্থা",
            mandi: "মন্ডির দাম", live: "লাইভ রেট", weather: "আবহাওয়া", forecast: "পূর্বাভাস", expert: "বিশেষজ্ঞ সহায়তা",
            connect: "এখনই যোগাযোগ করুন", pestTitle: "AI কীটপতঙ্গ শনাক্তকরণ", history: "ইতিহাস দেখুন", upload: "ফটো আপলোড করুন বা তুলুন",
            pestDesc: "আমাদের 98% সঠিক AI মডেলের মাধ্যমে তাৎক্ষণিকভাবে কীটপতঙ্গ এবং রোগ শনাক্ত করুন।", weatherTitle: "আবহাওয়ার পূর্বাভাস",
            hum: "আর্দ্রতা", wind: "বাতাস", alerts: "পরামর্শ সতর্কতা", trends: "বাজারের প্রবণতা", viewAll: "সব ফসল দেখুন",
            crop: "ফসল", ago: "আগে"
        },
        'or': {
            greet: "ନମସ୍ତେ", morning: "ଶୁଭ ସକାଳ", fields: "ଆପଣଙ୍କ ଫସଲ ସୁସ୍ଥ ଦିଶୁଛି | ଆଜିର ପରାମର୍ଶ ତଳେ ଦେଖନ୍ତု |",
            scan: "ଫସଲ ସ୍କାନ୍ କରନ୍ତୁ", voice: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ", quick: "ଶୀଘ୍ର କାର୍ଯ୍ୟ", soil: "ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ્ય", npk: "NPK ସ୍ଥିତି",
            mandi: "ମାଣ୍ଡି ଦର", live: "ଲାଇଭ୍ ରେଟ୍", weather: "ପାଣିପାଗ", forecast: "ପୂର୍ବାନୁମାନ", expert: "ବିଶେଷଜ୍ଞ ସହାୟତା",
            connect: "ଏବે ଯୋଗାଯୋଗ କରନ୍ତୁ", pestTitle: "AI ପୋକ ଚିହ୍ନଟ", history: "ଇତିହାସ ଦେଖନ୍ତୁ", upload: "ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ କିମ୍ବା ନିଅନ୍ତୁ",
            pestDesc: "ଆମର ୯୮% ସଠିକ୍ AI ମଡେଲ୍ ସହିତ ପୋକ ଏବଂ ରୋଗକୁ ତୁରନ୍ତ ଚିହ୍ନଟ କରନ୍ତୁ |", weatherTitle: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
            hum: "ଆର୍ଦ୍ରତା", wind: "ପବନ", alerts: "ପରାମର୍ଶ ସତର୍କତା", trends: "ବଜାର ଧାରା", viewAll: "ସମସ୍ତ ଫସଲ ଦେଖନ୍ତୁ",
            crop: "ଫସଲ", ago: "ପୂର୍ବରୁ"
        },
        'ur': {
            greet: "نمستے", morning: "صبح بخیر", fields: "آپ کے کھیت صحت مند نظر آ رہے ہیں۔ آج کی ایڈوائزری نیچے دیکھیں۔",
            scan: "فصل اسکین کریں", voice: "وائس اسسٹنٹ", quick: "فوری اقدامات", soil: "مٹی کی صحت", npk: "NPK صورتحال",
            mandi: "منڈی کی قیمتیں", live: "لائیو ریٹس", weather: "موسم", forecast: "پیش گوئی", expert: "ماہر کی مدد",
            connect: "ابھی رابطہ کریں", pestTitle: "AI کیڑے کی شناخت", history: "تاریخ دیکھیں", upload: "فوٹو اپ لوڈ کریں یا لیں",
            pestDesc: "ہمارے 98% درست AI ماڈل کے ساتھ کیڑوں اور بیماریوں کا فوری پتہ لگائیں۔", weatherTitle: "موسم کی پیش گوئی",
            hum: "نمی", wind: "ہوا", alerts: "ایڈوائزری الرٹس", trends: "مارکیٹ کے رجحانات", viewAll: "تمام فصلیں دیکھیں",
            crop: "فصل", ago: "پہلے"
        },
        'sa': {
            greet: "नमस्ते", morning: "सुप्रभातम्", fields: "भवतः सस्यानि स्वस्थप्रदानि दृश्यन्ते। अद्यतनं परामर्शं पश्यतु।",
            scan: "सस्यं परीक्षताम्", voice: "वाणी सहायकः", quick: "शीघ्रकार्याणि", soil: "मृत्तिका स्वास्थ्यम्", npk: "NPK स्थितिः",
            mandi: "विपणि मूल्यम्", live: "प्रत्यक्ष दरः", weather: "ऋतुः", forecast: "पूर्वानुमानम्", expert: "विशेषज्ञ साहाय्यम्",
            connect: "अधुना सम्पर्कं करोतु", pestTitle: "AI कीटपीडा ज्ञानम्", history: "इतिहासं पश्यतु", upload: "छायाचित्रं प्रेषयतु",
            pestDesc: "अस्माकं ९८% शुद्ध AI तन्त्रेण कीटानां रोगाणां च शीघ्रं ज्ञानं भवति।", weatherTitle: "ऋतु अनुमानम्",
            hum: "आर्द्रता", wind: "वायुः", alerts: "परामर्श सूचनाः", trends: "विपणि प्रवृत्तयः", viewAll: "सर्वाणि सस्यानि पश्यतु",
            crop: "सस्यम्", ago: "पूर्वम्"
        },
        'ne': {
            greet: "नमस्ते", morning: "शुभ प्रभात", fields: "तपाईंको खेत स्वस्थ देखिन्छ। आजको सल्लाह तल हेर्नुहोस्।",
            scan: "बाली स्क्यान गर्नुहोस्", voice: "आवाज सहायक", quick: "द्रुत कार्यहरू", soil: "माটোको स्वास्थ्य", npk: "NPK अवस्था",
            mandi: "मण्डी मूल्य", live: "लाइভ दरहरू", weather: "मौसम", forecast: "पूर्वानुमान", expert: "विशेषज्ञ मद्दत",
            connect: "अहिले सम्पर्क गर्नुहोस्", pestTitle: "AI किरा पहिचान", history: "इतिहास हेर्नुहोस्", upload: "फोटो अपलोड गर्नुहोस्",
            pestDesc: "हाम्रो ९८% सही AI मोडेलको साथ किरा र रोगहरू तुरुन्तै पत्ता लगाउनुहोस्।", weatherTitle: "मौसम पूर्वानुमान",
            hum: "आर्द्रता", wind: "हावा", alerts: "सल्लाह अलर्ट", trends: "बजार प्रवृत्ति", viewAll: "सबै बालीहरू हेर्नुहोस्",
            crop: "बाली", ago: "अघि"
        }
    };

    const t = translations[language] || translations['en'];

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
                <p className="text-gray-500 font-medium animate-pulse">Loading your dashboard...</p>
            </div>
        </div>
    );

    const weather = { 
        temp: "28°C", 
        condition: {
            'en': "Cloudy", 'hi': "बादल", 'ta': "மேகமூட்டம்", 'te': "మేఘావృతం", 
            'pa': "ਬੱਦਲਵਾਈ", 'bn': "মেঘলা", 'gu': "વાદળછાયું", 'mr': "ढगाळ", 'kn': "ಮೋಡ"
        }[language] || "Cloudy", 
        humidity: "65%", 
        wind: "12 km/h" 
    };

    const alerts = [
        { 
            id: 1, type: "warning", 
            message: {
                'en': "Heavy rainfall expected tomorrow. Secure crop storage.",
                'hi': "कल भारी बारिश की संभावना है। फसल भंडारण सुरक्षित करें।",
                'ta': "நாளை பலத்த மழை பெய்யக்கூடும். பயிர் சேமிப்பைப் பாதுகாக்கவும்.",
                'te': "రేపు భారీ వర్షం కురిసే అవకాశం ఉంది. పంట నిల్వను భద్రపరచండి.",
                'pa': "ਕੱਲ੍ਹ ਭਾਰੀ ਮੀਂਹ ਦੀ ਉਮੀਦ ਹੈ। ਫਸਲਾਂ ਦੀ ਸਟੋਰੇਜ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ।",
                'bn': "আগামীকাল ভারী বৃষ্টির সম্ভাবনা রয়েছে। ফসল সংরক্ষণ ব্যবস্থা নিরাপদ করুন।",
                'gu': "આવતીકાલે ભારે વરસાદની શક્યતા છે. પાક સંગ્રહ સુરક્ષિત કરો.",
                'mr': "उद्या मुसळधार पावसाची शक्यता आहे. पीक साठवण सुरक्षित करा.",
                'kn': "ನಾಳೆ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಬೆಳೆ ಸಂಗ್ರಹಣೆಯನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ."
            }[language] || "Heavy rainfall expected tomorrow."
        },
        { 
            id: 2, type: "info", 
            message: {
                'en': "Market price for Paddy has increased by 5% today.",
                'hi': "धान के बाजार भाव में आज 5% की वृद्धि हुई है।",
                'ta': "நெல் சந்தை விலை இன்று 5% அதிகரித்துள்ளது.",
                'te': "వరి మార్కెట్ ధర నేడు 5% పెరిగింది.",
                'pa': "ਅੱਜ ਝੋਨੇ ਦੇ ਮੰਡੀ ਭਾਅ ਵਿੱਚ 5% ਵਾਧਾ ਹੋਇਆ ਹੈ।",
                'bn': "আজ ধানের বাজার দর ৫% বৃদ্ধি পেয়েছে।",
                'gu': "ડાંગરના બજાર ભાવમાં આજે 5% વધારો થયો છે.",
                'mr': "आज धानाच्या बाजारभावात ५% वाढ झाली आहे.",
                'kn': "ಭತ್ತದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಇಂದು 5% ಹೆಚ್ಚಾಗಿದೆ."
            }[language] || "Market price for Paddy has increased."
        }
    ];

    const marketCrops = [
        { id: 1, name: { 'en': 'Paddy (Rice)', 'hi': 'धान (चावल)', 'ta': 'நெல் (அரிசி)', 'te': 'వరి (బియ్యం)', 'pa': 'ਝੋਨਾ (ਚੌਲ)', 'bn': 'ধান (চাল)', 'gu': 'ડાંગર (ચોખા)', 'mr': 'धान (तांदूळ)', 'kn': 'ಭತ್ತ (ಅಕ್ಕಿ)' }, price: 23.69, trend: 'up', change: '+₹1.50', icon: '🍚' },
        { id: 2, name: { 'en': 'Wheat', 'hi': 'गेहूं', 'ta': 'கோதுமை', 'te': 'గోధుమలు', 'pa': 'ਕਣਕ', 'bn': 'গম', 'gu': 'ઘઉં', 'mr': 'गहू', 'kn': 'ಗೋಧಿ' }, price: 24.25, trend: 'up', change: '+₹1.50', icon: '🌾' },
        { id: 3, name: { 'en': 'Maize', 'hi': 'मक्का', 'ta': 'சோளம்', 'te': 'మొక్కజొన్న', 'pa': 'ਮੱਕੀ', 'bn': 'ভুট্টা', 'gu': 'મકાઈ', 'mr': 'मका', 'kn': 'ಮೆಕ್ಕೆಜೋಳ' }, price: 24.00, trend: 'up', change: '+₹1.75', icon: '🌽' },
        { id: 4, name: { 'en': 'Cotton', 'hi': 'कपास', 'ta': 'பருத்தி', 'te': 'పత్తి', 'pa': 'ਕਪਾਹ', 'bn': 'তুলা', 'gu': 'કપાસ', 'mr': 'कापूस', 'kn': 'ಹತ್ತಿ' }, price: 77.10, trend: 'up', change: '+₹5.89', icon: '☁️' },
        { id: 5, name: { 'en': 'Soybean', 'hi': 'सोयाबीन', 'ta': 'சோயாபீன்', 'te': 'సోయాబీన్', 'pa': 'ਸੋਇਆਬੀਨ', 'bn': 'সোয়াবিন', 'gu': 'સોયાબીન', 'mr': 'सोयाबीन', 'kn': 'ಸೋಯಾಬೀನ್' }, price: 53.28, trend: 'up', change: '+₹4.36', icon: '🌱' },
        { id: 6, name: { 'en': 'Sugarcane', 'hi': 'गन्ना', 'ta': 'கரும்பு', 'te': 'చెరకు', 'pa': 'ਗੰਨਾ', 'bn': 'আখ', 'gu': 'શેરડી', 'mr': 'ऊस', 'kn': 'ಕಬ್ಬು' }, price: 3.40, trend: 'up', change: '+₹0.25', icon: '🎋' },
        { id: 7, name: { 'en': 'Groundnut', 'hi': 'मूंगफली', 'ta': 'வேர்க்கடலை', 'te': 'వేరుశనగ', 'pa': 'ਮੂੰਗਫਲੀ', 'bn': 'চিনাবাদাম', 'gu': 'મગફળી', 'mr': 'भुईमूग', 'kn': 'ನೆಲಗಡೆಲೆ' }, price: 67.80, trend: 'up', change: '+₹4.03', icon: '🥜' }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header py-4 premium-glass sticky top-0 z-[100] border-b border-white shadow-xl shadow-green-900/5">
                <div className="container flex justify-between items-center px-6">
                    <div className="logo-section flex items-center gap-4 group cursor-pointer">
                        <div className="gradient-emerald text-white p-3 rounded-2xl shadow-xl shadow-emerald-200 rotate-0 group-hover:rotate-12 transition-all duration-500"><Leaf size={28} /></div>
                        <div className="flex flex-col">
                            <h1 className="logo-text text-2xl font-black tracking-tighter text-gray-900 leading-none">AGRI SHAKTHI</h1>
                            <span className="text-[10px] font-black text-emerald-600 tracking-[0.2em] mt-1 uppercase">Smart Farming AI</span>
                        </div>
                    </div>
                    <div className="user-section flex items-center gap-6">
                        {/* Language Selector */}
                        <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-sm transition-all hover:shadow-md">
                            <Globe size={18} className="text-emerald-600" />
                            <select 
                                value={language} 
                                onChange={async (e) => {
                                    const newLang = e.target.value;
                                    localStorage.setItem('preferredLanguage', newLang);
                                    
                                    // Update local user object too
                                    const updatedUser = { ...user, language: newLang };
                                    localStorage.setItem('user', JSON.stringify(updatedUser));
                                    setUser(updatedUser);

                                    // Persist to server if logged in
                                    if (user?.id) {
                                        try {
                                            await fetch('http://localhost:5000/api/update-language', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ userId: user.id, language: newLang })
                                            });
                                        } catch (err) {
                                            console.error("Failed to update language on server:", err);
                                        }
                                    }
                                    
                                    window.location.reload(); 
                                }}
                                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी (Hindi)</option>
                                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                                <option value="ta">தமிழ் (Tamil)</option>
                                <option value="te">తెలుగు (Telugu)</option>
                                <option value="mr">मराठी (Marathi)</option>
                                <option value="gu">ગુજરાતી (Gujarati)</option>
                                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                                <option value="ml">മലയാളം (Malayalam)</option>
                                <option value="bn">বাংলা (Bengali)</option>
                                <option value="ur">اردو (Urdu)</option>
                            </select>
                        </div>

                        <div className="user-info text-right hidden sm:block">
                            <p className="user-name font-black text-gray-900 text-lg leading-none mb-1">{t.greet}, {user.name ? user.name.split(' ')[0] : "Farmer"}</p>
                            <p className="user-loc text-gray-400 text-xs font-bold flex items-center justify-end gap-1"><MapPin size={12} className="text-orange-500" /> {user.district || "Vellore"}, India</p>
                        </div>
                        <div className="user-avatar group ring-4 ring-white shadow-xl bg-gradient-to-br from-emerald-50 to-white p-3 rounded-[20px] hover:gradient-red hover:shadow-red-200 transition-all cursor-pointer border border-emerald-100 active:scale-95" onClick={handleLogout} title="Logout">
                            <User size={28} className="text-emerald-700 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container dashboard-main pt-8 pb-12">
                <div className="main-content">
                    {/* Welcome Banner */}
                    <div className="welcome-banner relative overflow-hidden p-8 rounded-[40px] bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white shadow-2xl shadow-green-200 mb-10 transition-all hover:shadow-green-300 group">
                        <div className="banner-content relative z-10">
                            <h2 className="text-4xl font-bold mb-3 tracking-tight group-hover:translate-x-1 transition-transform">{t.morning}, {user.name ? user.name.split(' ')[0] : "Farmer"}! 🌾</h2>
                            <p className="text-white/90 text-xl font-medium mb-8 max-w-lg leading-relaxed">{t.fields}</p>
                            <div className="banner-actions flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-white text-green-700 rounded-2xl font-bold flex items-center gap-3 hover:bg-green-50 shadow-lg transition-all hover:-translate-y-1 active:scale-95" onClick={() => setShowPestDetection(true)}>
                                    <Camera size={22} /> {t.scan}
                                </button>
                                <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/30 transition-all hover:-translate-y-1 active:scale-95" onClick={() => setShowVoiceAssistant(true)}>
                                    <Mic size={22} /> {t.voice}
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
                    </div>

                    {/* Quick Actions */}
                    <div className="section-block mb-10">
                        <h3 className="section-title text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-green-600 rounded-full"></span>
                            {t.quick}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <QuickActionCard icon={<TrendingUp size={32} />} colorClass="bg-soft-amber text-deep-amber" gradientClass="gradient-amber" title={t.mandi} subtitle={t.live} />
                            <QuickActionCard icon={<CloudRain size={32} />} colorClass="bg-soft-blue text-deep-blue" gradientClass="gradient-blue" title={t.weather} subtitle={t.forecast} />
                            <QuickActionCard
                                icon={<MessageSquare size={32} />}
                                colorClass="bg-soft-purple text-deep-purple"
                                gradientClass="gradient-purple"
                                title={t.expert}
                                subtitle={t.connect}
                                onClick={() => setShowExpertHelp(true)}
                            />
                        </div>
                    </div>

                    {/* Pest Section Premium */}
                    <div className="pest-section premium-glass rounded-[40px] p-10 shadow-2xl shadow-green-100 overflow-hidden group/main relative">
                        <div className="absolute top-0 right-0 w-64 h-64 gradient-red opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/2 space-y-6 text-left relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-xs tracking-widest uppercase">
                                    <Bug size={16} /> AI POWERED DETECTION
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">{t.pestTitle}</h3>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">{t.pestDesc}</p>
                                <button className="px-10 py-5 gradient-red text-white rounded-2xl font-black hover:shadow-2xl hover:shadow-red-200 transition-all flex items-center justify-center gap-3 hover:-translate-y-1 group/btn" onClick={() => setShowPestDetection(true)}>
                                    {t.scan} <ChevronRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="md:w-1/2 w-full relative">
                                <div className="aspect-square rounded-[40px] bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 flex flex-col items-center justify-center group/upload hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden" onClick={() => setShowPestDetection(true)}>
                                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
                                    <div className="w-24 h-24 gradient-red text-white rounded-3xl flex items-center justify-center shadow-2xl group-hover/upload:scale-110 group-hover/upload:rotate-6 transition-all relative z-10 animate-float">
                                        <Camera size={44} />
                                    </div>
                                    <p className="mt-8 font-black text-gray-800 text-xl relative z-10">{t.upload}</p>
                                    <div className="mt-2 text-gray-400 font-bold text-sm relative z-10">Max size 10MB</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar-content space-y-8 min-w-[340px]">
                    {/* Dynamic Live Weather Module */}
                    <LiveWeather />

                    {/* Alerts Redesigned */}
                    <div className="alerts-widget bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-50">
                        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><AlertCircle size={24} /></div>
                            {t.alerts}
                        </h3>
                        <div className="space-y-4">
                            {alerts.map(alert => (
                                <div key={alert.id} className={`p-5 rounded-2xl border-l-[6px] transition-all hover:translate-x-1 text-left ${alert.type === 'warning' ? 'bg-soft-orange text-deep-orange' : 'bg-soft-sky text-deep-sky'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest ${alert.type === 'warning' ? 'bg-orange-100' : 'bg-sky-100'}`}>
                                            {alert.type}
                                        </span>
                                        <span className="text-[11px] font-bold opacity-60">2h {t.ago}</span>
                                    </div>
                                    <p className="font-bold leading-snug">{alert.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Redesigned */}
                    <div className="market-widget bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-50">
                        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-xl"><TrendingUp size={24} /></div>
                            {t.trends}
                        </h3>
                        <div className="space-y-2 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
                            {marketCrops.map(crop => (
                                <div key={crop.id} className="p-4 rounded-2xl hover:bg-gray-50 flex justify-between items-center transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-all">{crop.icon}</div>
                                        <div className="text-left">
                                            <p className="font-black text-gray-900">{crop.name[language] || crop.name['en']}</p>
                                            <p className={`text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                {crop.trend === 'up' ? '▲' : '▼'} {crop.change}/kg
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-black text-gray-900 tracking-tight">₹{crop.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/market-prices">
                            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black tracking-widest uppercase text-sm hover:bg-black transition-all hover:-translate-y-1 shadow-lg shadow-gray-200">
                                {t.viewAll}
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Modals */}
            {showVoiceAssistant && <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} userLanguage={language} />}
            {showPestDetection && <PestDetection onClose={() => setShowPestDetection(false)} />}
            {showExpertHelp && <ExpertHelp onClose={() => setShowExpertHelp(false)} />}
        </div>
    );
};

const QuickActionCard = ({ icon, colorClass, gradientClass, title, subtitle, onClick }) => (
    <div className={`quick-action-card-premium p-8 rounded-[48px] premium-glass group flex flex-col items-center gap-6 cursor-pointer ${colorClass}`} onClick={onClick}>
        <div className={`icon-wrapper p-6 rounded-3xl ${gradientClass} text-white shadow-2xl shadow-current/20`}>{icon}</div>
        <div className="text-center">
            <h4 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{title}</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">{subtitle}</p>
        </div>
    </div>
);

export default Dashboard;
