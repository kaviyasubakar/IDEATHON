
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, X } from 'lucide-react';

const Login = () => {
    const language = localStorage.getItem('preferredLanguage') || 'en';
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const translations = {
        'en': {
            login: "Login", mobile: "Mobile Number", mobilePh: "10-digit number",
            password: "Password", passwordPh: "Enter your password",
            remember: "Remember me", forgot: "Forgot Password?",
            noAccount: "Don't have an account?", register: "Register",
            loginBtn: "Login now",
            wrong: "Something went wrong.", userNotFound: "Invalid mobile or password.",
            validMobile: "Please enter a valid 10-digit mobile number"
        },
        'hi': {
            login: "लॉगिन", mobile: "मोबाइल नंबर", mobilePh: "10-अंकीय संख्या",
            password: "पासवर्ड", passwordPh: "अपना पासवर्ड दर्ज करें",
            remember: "मुझे याद रखें", forgot: "पासवर्ड भूल गए?",
            noAccount: "खाता नहीं है?", register: "पंजीकरण करें",
            loginBtn: "अभी लॉगिन करें",
            wrong: "कुछ गलत हो गया।", userNotFound: "अमान्य मोबाइल या पासवर्ड।",
            validMobile: "कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें"
        },
        'ur': {
            login: "لاگ ان", mobile: "موبائل نمبر", mobilePh: "10 ہندسوں کا نمبر",
            password: "پاس ورڈ", passwordPh: "اپنا پاس ورڈ درج کریں",
            remember: "مجھے یاد رکھیں", forgot: "پاس ورڈ بھول گئے؟",
            noAccount: "اکاؤنٹ نہیں ہے؟", register: "رجسٹر کریں",
            loginBtn: "ابھی لاگ ان کریں",
            wrong: "کچھ غلط ہو گیا۔", userNotFound: "غلط موبائل یا پاس ورڈ۔",
            validMobile: "براہ کرم ایک درست 10 ہندسوں کا موبائل نمبر درج کریں"
        },
        'pa': {
            login: "ਲੌਗਇਨ", mobile: "ਮੋਬਾਈਲ ਨੰਬਰ", mobilePh: "10-ਅੰਕੀ ਨੰਬਰ",
            password: "ਪਾਸਵਰਡ", passwordPh: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
            remember: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ", forgot: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
            noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?", register: "ਰਜਿਸਟਰ ਕਰੋ",
            loginBtn: "ਹੁਣੇ ਲੌਗਇਨ ਕਰੋ",
            wrong: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ।", userNotFound: "ਗਲਤ ਮੋਬਾਈਲ ਜਾਂ ਪਾਸਵਰਡ।",
            validMobile: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ 10-ਅੰਕੀ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ"
        },
        'ta': {
            login: "உள்நுழைவு", mobile: "கைபேசி எண்", mobilePh: "10 இலக்க எண்",
            password: "கடவுச்சொல்", passwordPh: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
            remember: "என்னை நினைவில் கொள்", forgot: "கடவுச்சொல்லை மறந்தீர்களா?",
            noAccount: "கணக்கு இல்லையா?", register: "பதிவு செய்க",
            loginBtn: "இப்போது உள்நுழையவும்",
            wrong: "ஏதோ தவறு நடந்துவிட்டது.", userNotFound: "தவறான கைபேசி அல்லது கடவுச்சொல்.",
            validMobile: "தயவுசெய்து சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்"
        },
        'te': {
            login: "లాగిన్", mobile: "మొబైల్ సంఖ్య", mobilePh: "10 అంకెల సంఖ్య",
            password: "పాస్‌వర్డ్", passwordPh: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
            remember: "నన్ను గుర్తుంచుకో", forgot: "పాస్‌వర్డ్ మర్చిపోయారా?",
            noAccount: "ఖాతా లేదా?", register: "రిజిస్టర్",
            loginBtn: "ఇప్పుడు లాగిన్ అవ్వండి",
            wrong: "ఏదో తప్పు జరిగింది.", userNotFound: "తప్పు మొబైల్ లేదా పాస్‌వర్డ్.",
            validMobile: "దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ సంఖ్యను నమోదు చేయండి"
        },
        'bn': {
            login: "লগইন", mobile: "মোবাইল নম্বর", mobilePh: "১০-অঙ্ক সংখ্যা",
            password: "পাসওয়ার্ড", passwordPh: "আপনার পাসওয়ার্ড লিখুন",
            remember: "আমাকে মনে রাখুন", forgot: "পাসওয়ার্ড ভুলে গেছেন?",
            noAccount: "অ্যাকাউন্ট নেই?", register: "নিবন্ধন করুন",
            loginBtn: "এখনই লগইন করুন",
            wrong: "কিছু ভুল হয়েছে।", userNotFound: "ভুল মোবাইল বা পাসওয়ার্ড।",
            validMobile: "অনুগ্রহ করে একটি সঠিক ১০-সংখ্যার মোবাইল নম্বর লিখুন"
        },
        'or': {
            login: "ଲଗଇନ୍", mobile: "ମୋବାଇଲ୍ ନମ୍ବର", mobilePh: "୧୦-ଅଙ୍କ ବିଶିଷ୍ଟ ସଂଖ୍ୟା",
            password: "ପାସୱାର୍ଡ", passwordPh: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
            remember: "ମନେ ରଖନ୍ତୁ", forgot: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ କି?",
            noAccount: "ଖାତା ନାହିଁ କି?", register: "ପଞ୍ଜିକରଣ କରନ୍ତୁ",
            loginBtn: "ବର୍ତ୍ତମାନ ଲଗଇନ୍ କରନ୍ତୁ",
            wrong: "କିଛି ଭୁଲ୍ ହୋଇଛି |", userNotFound: "ଭୁଲ ମୋବାଇଲ୍ କିମ୍ବା ପାସୱାର୍ଡ |",
            validMobile: "ଦୟାକରି ଏକ ବୈଧ ୧୦-ଅଙ୍କ ବିଶିଷ୍ଟ ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ"
        },
        'mr': {
            login: "लॉगिन", mobile: "मोबाईल नंबर", mobilePh: "१०-अंकी क्रमांक",
            password: "पासवर्ड", passwordPh: "तुमचा पासवर्ड प्रविष्ट करा",
            remember: "माझी आठवण ठेवा", forgot: "पासवर्ड विसरलात?",
            noAccount: "खाते नाही?", register: "नोंदणी करा",
            loginBtn: "आता लॉगिन करा",
            wrong: "काहीतरी चुकले.", userNotFound: "चुकीचा मोबाईल किंवा पासवर्ड.",
            validMobile: "कृपया वैध १०-अंकी मोबाईल नंबर प्रविष्ट करा"
        },
        'gu': {
            login: "લોગિન", mobile: "મોબાઈલ નંબર", mobilePh: "૧૦-અંકનો નંબર",
            password: "પાસવર્ડ", passwordPh: "તમારો પાસવર્ડ દાખਲ કરો",
            remember: "મને યાદ રાખો", forgot: "પાસવર્ડ ભૂલી ગયા છો?",
            noAccount: "ખાતું નથી?", register: "નોંધણી કરો",
            loginBtn: "અત્યારે લોગિન કરો",
            wrong: "કંઈક ખોટું થયું.", userNotFound: "ખોટો મોબાઈલ અથવા પાસવર્ડ.",
            validMobile: "કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઈલ નંબર દાખલ કરો"
        },
        'kn': {
            login: "ಲಾಗಿನ್", mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", mobilePh: "10-ಅಂಕಿಯ ಸಂಖ್ಯೆ",
            password: "ಪಾಸ್‌ವರ್ಡ್", passwordPh: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
            remember: "ನನ್ನನ್ನು ನೆನಪಿಡಿ", forgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
            noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?", register: "ನೋಂದಾಯಿಸಿ",
            loginBtn: "ಈಗ ಲಾಗಿನ್ ಮಾಡಿ",
            wrong: "ಏನೋ ತಪ್ಪಾಗಿದೆ.", userNotFound: "ತಪ್ಪು ಮೊಬೈಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್.",
            validMobile: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ"
        },
        'ml': {
            login: "ലോഗിൻ", mobile: "മൊബൈൽ നമ്പർ", mobilePh: "10 അക്ക നമ്പർ",
            password: "പാസ്‌വേഡ്", passwordPh: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
            remember: "എന്നെ ഓർക്കുക", forgot: "പാസ്‌വേഡ് മറന്നുപോയോ?",
            noAccount: "അക്കൗണ്ട് ഇല്ലേ?", register: "രജിസ്റ്റർ ചെയ്യുക",
            loginBtn: "ഇപ്പോൾ ലോഗിൻ ചെയ്യുക",
            wrong: "എന്തോ പിശക് സംഭവിച്ചു.", userNotFound: "തെറ്റായ മൊബൈൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്.",
            validMobile: "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക"
        },
        'sa': {
            login: "प्रवेशः", mobile: "भ्रमणभाषः संख्या", mobilePh: "१० अङ्कानां संख्या",
            password: "सङ्केतपदम्", passwordPh: "भवतः सङ्केतपदं प्रविशतु",
            remember: "मां स्मर", forgot: "सङ्केतपदं विस्मृतम्?",
            noAccount: "किं खाता नास्ति?", register: "पञ्जीकरणं करोतु",
            loginBtn: "इदानीमेव प्रवेशं करोतु",
            wrong: "किञ्चित् दोषः अभवत्।", userNotFound: "अशुद्धं भ्रमणभाषः वा सङ्केतपदम्।",
            validMobile: "कृपया १० अङ्कानां भ्रमणभाषः संख्या प्रविशतु"
        },
        'ne': {
            login: "लगइन", mobile: "मोबाइल नम्बर", mobilePh: "१०-अङ्कको नम्बर",
            password: "पासवर्ड", passwordPh: "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्",
            remember: "मलाई सम्झनुहोस्", forgot: "पासवर्ड बिर्सनुभयो?",
            noAccount: "खाता छैन?", register: "दर्ता गर्नुहोस्",
            loginBtn: "अहिले लगइन गर्नुहोस्",
            wrong: "केही गलत भयो।", userNotFound: "गलत मोबाइल वा पासवर्ड।",
            validMobile: "कृपया १०-अङ्कको मोबाइल नम्बर प्रविष्ट गर्नुहोस्"
        }
    };

    const t = translations[language] || translations['en'];

    const handleLogin = async (e) => {
        e.preventDefault();
        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
            alert(t.validMobile);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Synchronize global language preference with user profile
                if (data.user.language) {
                    localStorage.setItem('preferredLanguage', data.user.language);
                }
                
                navigate('/dashboard');
            } else {
                alert(data.error || t.userNotFound);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert(t.wrong);
        }
    };

    return (
        <div className="auth-page-wrapper min-h-screen flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

            <div className="relative z-10 login-milky-card animate-fade-in text-center shadow-2xl">
                <Link to="/" className="card-close-btn">
                    <X size={18} />
                </Link>

                <h2 className="login-milky-header">{t.login}</h2>

                <form onSubmit={handleLogin} className="text-left space-y-4">
                    <div className="input-underlined-group">
                        <label className="input-label font-semibold">{t.mobile}</label>
                        <div className="relative">
                            <input
                                type="tel"
                                className="input-underlined"
                                placeholder={t.mobilePh}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                maxLength={10}
                                autoComplete="off"
                                required
                            />
                            <Mail className="input-icon-right" size={18} />
                        </div>
                    </div>

                    <div className="input-underlined-group">
                        <label className="input-label font-semibold">{t.password}</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="input-underlined"
                                placeholder={t.passwordPh}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <Lock className="input-icon-right" size={18} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6 text-sm">
                        <label className="checkbox-milky flex items-center cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded accent-gray-800 mr-2" />
                            {t.remember}
                        </label>
                        <a href="#" className="link-milky">{t.forgot}</a>
                    </div>

                    <button type="submit" className="btn-dark-rect w-full mt-4">
                        {t.loginBtn}
                    </button>
                </form>

                <div className="bottom-text mt-6">
                    {t.noAccount} <Link to="/register" className="font-bold text-gray-900 hover:underline">{t.register}</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
