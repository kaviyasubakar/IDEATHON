
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, X, Lock } from 'lucide-react';

const Register = () => {
    const language = localStorage.getItem('preferredLanguage') || 'en';
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        mobile: '',
        password: '',
        district: '',
    });

    const translations = {
        'en': {
            header: "Farmer Registration", name: "Full Name (Optional)", namePh: "Your Name",
            mobile: "Mobile Number", mobilePh: "10-digit number", password: "Password", passwordPh: "Choose a password",
            district: "District / Location", selDistrict: "Select District", crop: "Primary Crop", selCrop: "Select Crop",
            prefLang: "Preferred Language", btn: "Register Now", already: "Already registered?",
            login: "Login here", success: "Registration Successful! Please Login.",
            fail: "Registration failed.", wrong: "Something went wrong. Please try again."
        },
        'hi': {
            header: "किसान पंजीकरण", name: "पूरा नाम (वैकल्पिक)", namePh: "आपका नाम",
            mobile: "मोबाइल नंबर", mobilePh: "10-अंकीय संख्या", password: "पासवर्ड", passwordPh: "पासवर्ड चुनें",
            district: "जिला / स्थान", selDistrict: "जिला चुनें", crop: "प्राथमिक फसल", selCrop: "फसल चुनें",
            prefLang: "पसंदीदा भाषा", btn: "अभी पंजीकरण करें", already: "पहले से पंजीकृत हैं?",
            login: "यहाँ लॉगिन करें", success: "पंजीकरण सफल! कृपया लॉगिन करें।",
            fail: "पंजीकरण विफल।", wrong: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।"
        },
        'ur': {
            header: "کسان رجسٹریشن", name: "پورا نام (اختیاری)", namePh: "آپ کا نام",
            mobile: "موبائل نمبر", mobilePh: "10 ہندسوں کا نمبر", password: "پاس ورڈ", passwordPh: "پاس ورڈ منتخب کریں",
            district: "ضلع / مقام", selDistrict: "ضلع منتخب کریں", crop: "بنیادی فصل", selCrop: "فصل منتخب کریں",
            prefLang: "پسंदीदा زبان", btn: "ابھی رجسٹر کریں", already: "پہلے سے رجسٹرڈ ہیں؟",
            login: "یہاں لاگ ان کریں", success: "رجسٹریشن کامیاب! براہ مہربانی لاگ ان کریں۔",
            fail: "رجسٹریشن ناکام ہوگئی۔", wrong: "کسان لاگ ان میں کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔"
        },
        'pa': {
            header: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ", name: "ਪੂਰਾ ਨਾਮ (ਵਿਕਲਪਿਕ)", namePh: "ਤੁਹਾਡਾ ਨਾਮ",
            mobile: "ਮੋਬਾਈਲ ਨੰਬਰ", mobilePh: "10-ਅੰਕੀ ਨੰਬਰ", password: "ਪਾਸਵਰਡ", passwordPh: "ਪਾਸਵਰਡ ਚੁਣੋ",
            district: "ਜ਼ਿਲ੍ਹਾ / ਸਥਾਨ", selDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ", crop: "ਮੁੱਢਲੀ ਫਸਲ", selCrop: "ਫਸਲ ਚੁਣੋ",
            prefLang: "ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ", btn: "ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ", already: "ਪਹਿਲਾਂ ਹੀ ਰਜਿਸਟਰਡ ਹੋ?",
            login: "ਇੱਥੇ ਲੌਗਇਨ ਕਰੋ", success: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ! ਕਿਰਪਾ ਕਰਕੇ ਲੌਗਇਨ ਕਰੋ।",
            fail: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਸਫਲ ਰਹੀ।", wrong: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
        },
        'ta': {
            header: "விவசாயி பதிவு", name: "முழு பெயர் (விருப்பமானது)", namePh: "உங்கள் பெயர்",
            mobile: "கைபேசி எண்", mobilePh: "10 இலக்க எண்", password: "கடவுச்சொல்", passwordPh: "கடவுச்சொல்லைத் தேர்ந்தெடுக்கவும்",
            district: "மாவட்டம் / இருப்பிடம்", selDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்", crop: "முதன்மை பயிர்", selCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
            prefLang: "விருப்பமான மொழி", btn: "இப்போது பதிவு செய்க", already: "ஏற்கனவே பதிவு செய்துள்ளீர்களா?",
            login: "இங்கே உள்நுழையவும்", success: "பதிவு வெற்றி! தயவுசெய்து உள்நுழையவும்.",
            fail: "பதிவு தோல்வியடைந்தது.", wrong: "ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்."
        },
        'te': {
            header: "రైతు నమోదు", name: "పూర్తి పేరు (ఐచ్ఛికం)", namePh: "మీ పేరు",
            mobile: "మొబైల్ సంఖ్య", mobilePh: "10 అంకెల సంఖ్య", password: "పాస్‌వర్డ్", passwordPh: "పాస్‌వర్డ్ ఎంచుకోండి",
            district: "జిల్లా / స్థానం", selDistrict: "జిల్లాను ఎంచుకోండి", crop: "ప్రాథమిక పంట", selCrop: "పంటను ఎంచుకోండి",
            prefLang: "పసందైన భాష", btn: "ఇప్పుడే నమోదు చేసుకోండి", already: "ఇప్పటికే నమోదు చేసుకున్నారా?",
            login: "ఇక్కడ లాగిన్ అవ్వండి", success: "నమోదు విజయవంతమైంది! దయచేసి లాగిన్ అవ్వండి.",
            fail: "నమోదు విఫలమైంది.", wrong: "ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి."
        },
        'bn': {
            header: "কৃষক নিবন্ধন", name: "পুরো নাম (ঐচ্ছিক)", namePh: "আপনার নাম",
            mobile: "মোবাইল নম্বর", mobilePh: "১০-অঙ্ক সংখ্যা", password: "পাসওয়ার্ড", passwordPh: "একটি পাসওয়ার্ড চয়ন করুন",
            prefLang: "পছন্দের ভাষা", btn: "এখনই নিবন্ধন করুন", already: "ইতিমধ্যেই নিবন্ধিত?",
            login: "এখানে লগইন করুন", success: "নিবন্ধন সফল! লগইন করুন।",
            fail: "নিবন্ধন ব্যর্থ হয়েছে।", wrong: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।"
        },
        'or': {
            header: "କୃଷକ ପଞ୍ଜିକରଣ", name: "ପୁରା ନାମ (ବିକଳ୍ପ)", namePh: "ଆପଣଙ୍କ ନାମ",
            mobile: "ମୋବାଇଲ୍ ନମ୍ବର", mobilePh: "୧୦-ଅଙ୍କ ବିଶିଷ୍ଟ ସଂଖ୍ୟା", password: "ପାସୱାର୍ଡ", passwordPh: "ଏକ ପାସୱାର୍ଡ ବାଛନ୍ତୁ",
            district: "ଜିଲ୍ଲା / ସ୍ଥାନ",
            selDistrict: "ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ", crop: "ପ୍ରାଥମିକ ଫସଲ", selCrop: "ଫସଲ ଚୟନ କରନ୍ତୁ",
            prefLang: "ପସନ୍ଦିତ ଭାଷା", btn: "ବର୍ତ୍ତମାନ ପଞ୍ଜିକରଣ କରନ୍ତୁ", already: "ପୂର୍ବରୁ ପଞ୍ଜିକୃତ କି?",
            login: "ଏଠାରେ ଲଗଇନ୍ କରନ୍ତୁ", success: "ପଞ୍ଜିକରଣ ସଫଳ! ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ |",
            fail: "ପଞ୍ଜିକରଣ ବିଫଳ |", wrong: "କିଛି ଭୁଲ୍ ହୋଇଛି | ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |"
        },
        'mr': {
            header: "शेतकरी नोंदणी", name: "पूर्ण नाव (पर्यायी)", namePh: "तुमचे नाव",
            mobile: "मोबाईल नंबर", mobilePh: "१०-अंकी क्रमांक", password: "पासवर्ड", passwordPh: "पासवर्ड निवडा",
            district: "जिल्हा / ठिकाण", selDistrict: "जिल्हा निवडा", crop: "प्राथमिक पीक", selCrop: "पीक निवडा",
            prefLang: "पसंतीची भाषा", btn: "आता नोंदणी करा", already: "आधीच नोंदणी केली आहे?",
            login: "येथे लॉगिन करा", success: "नोंदणी यशस्वी! कृपया लॉगिन करा.",
            fail: "नोंदणी अयशस्वी.", wrong: "काहीतरी चुकले. पुन्हा प्रयत्न करा."
        },
        'gu': {
            header: "ખેડૂત નોંધણી", name: "પૂરૂં નામ (વૈકલ્પિક)", namePh: "તમારું નામ",
            mobile: "મોબાઈલ નંબર", mobilePh: "૧૦-અંકનો નંબર", password: "પાસવર્ડ", passwordPh: "પાસવર્ડ પસંદ કરો",
            district: "જિલ્લો / સ્થળ", selDistrict: "જિલ્લો પસંદ કરો", crop: "પ્રાથમિક પાક", selCrop: "પાક પસંદ કરો",
            prefLang: "પસંદગીની ભાષા", btn: "અત્યારે નોંધણી કરો", already: "પહેલેથી નોંધાયેલા છો?",
            login: "અહીં લોગિન કરો", success: "નોંધણી સફળ! કૃપા કરીને લોગિન કરો.",
            fail: "નોંધણી નિષ્ફળ.", wrong: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો."
        },
        'kn': {
            header: "ರೈತರ ನೋಂದಣಿ", name: "ಪೂರ್ಣ ಹೆಸರು (ಐಚ್ಛಿಕ)", namePh: "ನಿಮ್ಮ ಹೆಸರು",
            mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", mobilePh: "10-ಅಂಕಿಯ ಸಂಖ್ಯೆ", password: "ಪಾಸ್‌ವರ್ಡ್", passwordPh: "ಪಾಸ್‌ವರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ",
            district: "ಜಿಲ್ಲೆ / ಸ್ಥಳ", selDistrict: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ", crop: "ಪ್ರಾಥಮಿಕ ಬೆಳೆ", selCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
            prefLang: "ಆದ್ಯತೆಯ ಭಾಷೆ", btn: "ಈಗ ನೋಂದಾಯಿಸಿ", already: "ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆಯೇ?",
            login: "ಇಲ್ಲಿ ಲಾಗಿನ್ ಮಾಡಿ", success: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.",
            fail: "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ.", wrong: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        },
        'ml': {
            header: "കർഷക രജിസ്ട്രേഷൻ", name: "മുഴുവൻ പേര് (ഓപ്ഷണൽ)", namePh: "നിങ്ങളുടെ പേര്",
            mobile: "മൊബൈൽ നമ്പർ", mobilePh: "10 അക്ക നമ്പർ", password: "പാസ്‌വേഡ്", passwordPh: "പാസ്‌വേഡ് തിരഞ്ഞെടുക്കുക",
            district: "ജില്ല / സ്ഥലം", selDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക", crop: "പ്രဓാന വിള", selCrop: "വിള തിരഞ്ഞെടുക്കുക",
            prefLang: "താൽപ്പര്യമുള്ള ഭാഷ", btn: "ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക", already: "നിലവിൽ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ?",
            login: "ഇവിടെ ലോഗിൻ ചെയ്യുക", success: "രജിസ്ട്രേഷൻ വിജയിച്ചു! ലോഗിൻ ചെയ്യുക.",
            fail: "രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു.", wrong: "എന്തോ തകരാർ സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക."
        },
        'sa': {
            header: "कृषक पञ्जीकरणम्", name: "पूर्णं नाम (वैकल्पिकम्)", namePh: "भवतः नाम",
            mobile: "भ्रमणभाषः संख्या", mobilePh: "१० अङ्कानां संख्या", password: "सङ्केतपदम्", passwordPh: "सङ्केतपदं चिनोतु",
            district: "मण्डलम् / स्थानम्", selDistrict: "मण्डलं चिनोतु", crop: "प्रमुखं सस्यम्", selCrop: "सस्यं चिनोतु",
            prefLang: "इष्टा भाषा", btn: "इदानीमेव पञ्जीकरणं करोतु", already: "पूर्वं पञ्जीकृतं किम्?",
            login: "अत्र प्रवेशं करोतु", success: "पञ्जीकरणं सफलं जातम्! प्रवेशं करोतु।",
            fail: "पञ्जीकरणं विफलम्।", wrong: "किञ्चित् दोषः अभवत्। पुनः प्रयासं करोतु।"
        },
        'ne': {
            header: "किसान दर्ता", name: "पूरा नाम (ऐच्छिक)", namePh: "तपाईंको नाम",
            mobile: "मोबाइल नम्बर", mobilePh: "१०-अङ्कको नम्बर", password: "पासवर्ड", passwordPh: "पासवर्ड छान्नुहोस्",
            district: "जिल्ला / स्थान",
            selDistrict: "जिल्ला छान्नुहोस्", crop: "प्राथमिक बाली", selCrop: "बाली छान्नुहोस्",
            prefLang: "पसंदीदा भाषा", btn: "अहिले दर्ता गर्नुहोस्", already: "पहिल्यै दर्ता छ?",
            login: "यहाँ लगइन गर्नुहोस्", success: "दर्ता सफल भयो! कृपया लगइन गर्नुहोस्।",
            fail: "दर्ता असफल भयो।", wrong: "केही गलत भयो। कृपया पुन: प्रयास गर्नुहोस्।"
        }
    };

    const t = translations[language] || translations['en'];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!/^\d{10}$/.test(form.mobile)) {
            alert(t.mobile + ": " + t.mobilePh);
            return;
        }

        if (form.password.length < 3) {
            alert("Password must be at least 3 characters");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert(t.success);
                navigate('/login');
            } else {
                alert(data.error || t.fail);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t.wrong);
        }
    };

    return (
        <div className="auth-page-wrapper min-h-screen flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

            <div className="relative z-10 login-milky-card animate-fade-in shadow-2xl overflow-y-auto max-h-[95vh] my-4 pt-10 px-8 pb-8">
                <Link to="/" className="card-close-btn">
                    <X size={18} />
                </Link>

                <h2 className="login-milky-header text-3xl font-bold text-center mb-6 drop-shadow-sm">{t.header}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="input-underlined-group mb-4">
                            <label className="input-label font-semibold">{t.name}</label>
                            <div className="relative">
                                <input name="name" onChange={handleChange} className="input-underlined" placeholder={t.namePh} autoComplete="off" />
                                <User className="input-icon-right" size={18} />
                            </div>
                        </div>
                        <div className="input-underlined-group mb-4">
                            <label className="input-label font-semibold">{t.mobile}</label>
                            <div className="relative">
                                <input name="mobile" onChange={handleChange} required className="input-underlined" placeholder={t.mobilePh} autoComplete="off" />
                                <User className="input-icon-right" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="input-underlined-group mb-4 text-left">
                        <label className="input-label font-semibold">{t.password}</label>
                        <div className="relative">
                            <input name="password" type="password" onChange={handleChange} required className="input-underlined" placeholder={t.passwordPh} autoComplete="new-password" />
                            <Lock className="input-icon-right" size={18} />
                        </div>
                    </div>

                    <div className="input-underlined-group mb-4 text-left">
                        <label className="input-label font-semibold">{t.district}</label>
                        <div className="relative">
                            <select name="district" onChange={handleChange} className="input-underlined" required>
                                <option value="">{t.selDistrict}</option>
                                <option>Vellore</option>
                                <option>Thanjavur</option>
                                <option>Coimbatore</option>
                                <option>Madurai</option>
                                <option>Ludhiana</option>
                                <option>Amritsar</option>
                                <option>Nashik</option>
                                <option>Nagpur</option>
                                <option>Pune</option>
                                <option>Indore</option>
                            </select>
                            <MapPin className="input-icon-right" size={18} />
                        </div>
                    </div>



                    <button type="submit" className="btn-dark-rect w-full mt-6">
                        {t.btn}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm border-t border-gray-300 pt-4">
                    {t.already} <Link to="/login" className="font-bold underline text-primary hover:text-secondary">{t.login}</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
