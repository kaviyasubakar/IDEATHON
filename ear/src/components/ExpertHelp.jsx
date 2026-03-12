
import React from 'react';
import { X, Phone, MessageSquare, HelpCircle, UserCheck } from 'lucide-react';

const ExpertHelp = ({ onClose }) => {
    const language = localStorage.getItem('preferredLanguage') || 'en';

    const translations = {
        'en': {
            title: "Expert Consultation", sub: "Get advice from certified agronomists", available: "Available Agronomists",
            wait: "Average wait time: < 2 mins", call: "Call Kisan Center", toll: "Toll Free", chat: "Chat with Expert",
            chatSub: "Start live chat session", faqs: "FAQs & Guides", faqSub: "Browse common questions",
            gov: "Government of India Initiative • Powered by AI"
        },
        'hi': {
            title: "विशेषज्ञ परामर्श", sub: "प्रमाणित कृषि विशेषज्ञों से सलाह लें", available: "उपलब्ध कृषि विशेषज्ञ",
            wait: "औसत प्रतीक्षा समय: < 2 मिनट", call: "किसान केंद्र को कॉल करें", toll: "टोल फ्री", chat: "विशेषज्ञ के साथ चैट करें",
            chatSub: "लाइव चैट सत्र शुरू करें", faqs: "अक्सर पूछे जाने वाले प्रश्न", faqSub: "सामान्य प्रश्न देखें",
            gov: "भारत सरकार की पहल • एआई द्वारा संचालित"
        },
        'ta': {
            title: "நிபுணர் ஆலோசனை", sub: "சான்றளிக்கப்பட்ட விவசாய நிபுணர்களிடமிருந்து ஆலோசனையைப் பெறுங்கள்", available: "கிடைக்கக்கூடிய நிபுணர்கள்",
            wait: "சராசரி காத்திருப்பு நேரம்: < 2 நிமிடங்கள்", call: "கிசான் மையத்தை அழைக்கவும்", toll: "கட்டணமில்லா எண்", chat: "நிபுணருடன் அரட்டையடிக்கவும்",
            chatSub: "நேரடி அரட்டை அமர்வைத் தொடங்கவும்", faqs: "கேள்விகள் மற்றும் வழிகாட்டிகள்", faqSub: "பொதுவான கேள்விகளை உலாவவும்",
            gov: "இந்திய அரசின் முயற்சி • AI மூலம் இயக்கப்படுகிறது"
        },
        'te': {
            title: "నిపుణుల సంప్రదింపులు", sub: "ధృవీకరించబడిన వ్యవసాయ శాస్త్రవేత్తల నుండి సలహా పొందండి", available: "అందుబాటులో ఉన్న నిపుణులు",
            wait: "సగటు నిరీక్షణ సమయం: < 2 నిమిషాలు", call: "కిసాన్ సెంటర్‌కు కాల్ చేయండి", toll: "టోల్ ఫ్రీ", chat: "నిపుణుడితో చాట్ చేయండి",
            chatSub: "లైవ్ చాట్ సెషన్‌ను ప్రారంభించండి", faqs: "తరచుగా అడిగే ప్రశ్నలు", faqSub: "సాధారణ ప్రశ్నలను బ్రౌజ్ చేయండి",
            gov: "భారత ప్రభుత్వ చొరవ • AI ద్వారా శక్తిని పొందింది"
        },
        'pa': {
            title: "ਮਾਹਰ ਸਲਾਹ", sub: "ਪ੍ਰਮਾਣਿਤ ਖੇਤੀਬਾੜੀ ਮਾਹਰਾਂ ਤੋਂ ਸਲਾਹ ਲਓ", available: "ਉਪਲਬਧ ਮਾਹਰ",
            wait: "ਔਸਤ ਉਡੀਕ ਸਮਾਂ: < 2 ਮਿੰਟ", call: "ਕਿਸਾਨ ਕੇਂਦਰ ਨੂੰ ਕਾਲ ਕਰੋ", toll: "ਟੋਲ ਫ੍ਰੀ", chat: "ਮਾਹਰ ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ",
            chatSub: "ਲਾਈਵ ਚੈਟ ਸੈਸ਼ਨ ਸ਼ੁਰੂ ਕਰੋ", faqs: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ", faqSub: "ਆਮ ਸਵਾਲ ਦੇਖੋ",
            gov: "ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਪਹਿਲਕਦਮੀ • AI ਦੁਆਰਾ ਸੰਚਾਲਿਤ"
        },
        'ur': {
            title: "ماہرانہ مشورہ", sub: "تصدیق شدہ زرعی ماہرین سے مشورہ حاصل کریں", available: "دستیاب ماہرین",
            wait: "اوسط انتظار کا وقت: < 2 منٹ", call: "کسان مرکز کو کال کریں", toll: "ٹول فری", chat: "ماہر سے بات کریں",
            chatSub: "لائیو چیٹ سیشن شروع کریں", faqs: "اکثر پوچھے گئے سوالات", faqSub: "عام سوالات دیکھیں",
            gov: "حکومت ہند کی پہل • AI کے ذریعے تقویت یافتہ"
        },
        'bn': {
            title: "বিশেষজ্ঞ পরামর্শ", sub: "প্রত্যয়িত কৃষিবিদদের কাছ থেকে পরামর্শ নিন", available: "উপलब्ধ বিশেষজ্ঞ",
            wait: "গড় অপেক্ষার সময়: < ২ মিনিট", call: "কিষাণ কেন্দ্রে কল করুন", toll: "টোল ফ্রি", chat: "বিশেষজ্ঞের সাথে চ্যাট করুন",
            chatSub: "লাইভ চ্যাট সেশন শুরু করুন", faqs: "সাধারণ জিজ্ঞাসা", faqSub: "সাধারণ প্রশ্নগুলি দেখুন",
            gov: "ভারত সরকারের উদ্যোগ • AI দ্বারা চালিত"
        },
        'or': {
            title: "ବିଶେଷଜ୍ଞ ପରାମର୍ଶ", sub: "ପ୍ରମାଣିତ କୃଷିବିତମାନଙ୍କଠାରୁ ପରାମର୍ଶ ନିଅନ୍ତୁ", available: "ଉପଲବ୍ଧ ବିଶେଷଜ୍ଞ",
            wait: "ହାରାହାରି ଅପେକ୍ଷା ସମୟ: < 2 ମିନିଟ୍", call: "କିଷାନ୍ କେନ୍ଦ୍ରକୁ କଲ୍ କରନ୍ତୁ", toll: "ଟୋଲ୍ ଫ୍ରି", chat: "ବିଶେଷଜ୍ଞଙ୍କ ସହ ଚାଟ୍ କରନ୍ତୁ",
            chatSub: "ଲାଇଭ୍ ଚାଟ୍ ଅଧିବେଶନ ଆରମ୍ଭ କରନ୍ତୁ", faqs: "ପ୍ରଶ୍ନ ଏବଂ ଗାଇଡ୍", faqSub: "ସାଧାରଣ ପ୍ରଶ୍ନଗୁଡିକ ବ୍ରାଉଜ୍ କରନ୍ତୁ",
            gov: "ଭାରତ ସରକାରଙ୍କ ଏକ ପଦକ୍ଷେପ • AI ଦ୍ୱାରା ଚାଳିତ"
        },
        'mr': {
            title: "तज्ज्ञ सल्ला", sub: "प्रमाणित कृषी तज्ज्ञांकडून सल्ला घ्या", available: "उपलब्ध तज्ज्ञ",
            wait: "सरासरी प्रतीक्षा वेळ: < २ मिनिटे", call: "किसान केंद्राला कॉल करा", toll: "टोल फ्री", chat: "तज्ज्ञांशी चॅट करा",
            chatSub: "लाईव्ह चॅट सत्र सुरू करा", faqs: "वारंवार विचारले जाणारे प्रश्न", faqSub: "सामान्य प्रश्न पहा",
            gov: "भारत सरकारचा पुढाकार • AI द्वारे समर्थित"
        },
        'gu': {
            title: "નિષ્ણાત પરામર્શ", sub: "પ્રમાણિત કૃષિ નિષ્ણાતો પાસેથી સલાહ લો", available: "ઉપલબ્ધ નિષ્ણાતો",
            wait: "સરેરાશ રાહ જોવાનો સમય: < ૨ મિનિટ", call: "કિસાન કેન્દ્રને કોલ કરો", toll: "ટોલ ફ્રી", chat: "નિષ્ણાત સાથે ચેટ કરો",
            chatSub: "લાઇવ ચેટ સત્ર શરૂ કરો", faqs: "વારંવાર પૂછાતા પ્રશ્નો", faqSub: "સામાન્ય પ્રશ્નો જુઓ",
            gov: "ભારત સરકારની પહેલ • AI દ્વારા સંચાલિત"
        },
        'kn': {
            title: "ತಜ್ಞರ ಸಮಾಲೋಚನೆ", sub: "ಪ್ರಮಾಣೀಕೃತ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ", available: "ಲಭ್ಯವಿರುವ ತಜ್ಞರು",
            wait: "ಸರಾಸರಿ ಕಾಯುವ ಸಮಯ: < 2 ನಿಮಿಷ", call: "ಕಿಸಾನ್ ಕೇಂದ್ರಕ್ಕೆ ಕರೆ ಮಾಡಿ", toll: "ಟೋಲ್ ಫ್ರೀ", chat: "ತಜ್ಞರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
            chatSub: "ಲೈವ್ ಚಾಟ್ ಸೆಷನ್ ಪ್ರಾರಂಭಿಸಿ", faqs: "ಪ್ರಶ್ನೋತ್ತರಗಳು", faqSub: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
            gov: "ಭಾರತ ಸರ್ಕಾರದ ಉಪಕ್ರಮ • AI ನಿಂದ ನಡೆಸಲ್ಪಡುತ್ತಿದೆ"
        },
        'ml': {
            title: "വിദഗ്ധ കൺസൾട്ടേഷൻ", sub: "സർട്ടിഫൈഡ് അഗ്രോണമിസ്റ്റുകളിൽ നിന്ന് ഉപദേശം നേടുക", available: "ലഭ്യമായ വിദഗ്ധർ",
            wait: "ശരാശരി കാത്തിരിപ്പ് സമയം: < 2 മിനിറ്റ്", call: "കിസാൻ സെന്ററിൽ വിളിക്കുക", toll: "ടോൾ ഫ്രീ", chat: "വിദഗ്ധനുമായി ചാറ്റ് ചെയ്യുക",
            chatSub: "തത്സമയ ചാറ്റ് സെഷൻ ആരംഭിക്കുക", faqs: "പതിവ് ചോദ്യങ്ങൾ", faqSub: "സാധാരണ ചോദ്യങ്ങൾ ബ്രൗസ് ചെയ്യുക",
            gov: "ഭാരത സർക്കാർ സംരംഭം • AI നൽകുന്നത്"
        },
        'sa': {
            title: "विशेषज्ञ परामर्शः", sub: "प्रमाणित कृषि तज्ज्ञेभ्यः परामर्शं प्राप्नुवन्तु", available: "उपलब्धाः वैज्ञानिकाः",
            wait: "सरासरी प्रतीक्षा समयः: < २ निमिषाः", call: "किसान केन्द्रं सम्पर्कं कुर्वन्तु", toll: "विना मूल्यम्", chat: "विशेषज्ञेन सह चर्चां करोतु",
            chatSub: "सजीव वार्तालापः आरभ्यताम्", faqs: "प्रश्नोत्तराणि", faqSub: "सामान्यान् प्रश्नान् पश्यतु",
            gov: "भारतसर्वकारस्य उपक्रमः • AI तन्त्रेण चालितम्"
        },
        'ne': {
            title: "विशेषज्ञ परामर्श", sub: "प्रमाणित कृषि विज्ञहरूबाट सल्लाह लिनुहोस्", available: "उपलब्ध विज्ञहरू",
            wait: "औसत प्रतीक्षा समय: < २ मिनेट", call: "किसान केन्द्रलाई कल गर्नुहोस्", toll: "टोल फ्री", chat: "विशेषज्ञसँग च्याट गर्नुहोस्",
            chatSub: "लाइभ च्याट सत्र सुरु गर्नुहोस्", faqs: "प्रश्नोत्तर र गाइडहरू", faqSub: "साधारण प्रश्नहरू हेर्नुहोस्",
            gov: "भारत सरकारको पहल • AI द्वारा संचालित"
        }
        // Fallback to English for others for now or add them
    };

    const t = translations[language] || translations['en'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col animate-fade-in-up">

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
                    <UserCheck size={48} className="mx-auto mb-2 opacity-90" />
                    <h2 className="text-2xl font-bold tracking-wide">{t.title}</h2>
                    <p className="opacity-90 text-sm">{t.sub}</p>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">

                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                        <p className="text-purple-900 font-medium mb-1">{t.available}: <span className="font-bold text-xl">12</span></p>
                        <p className="text-xs text-purple-600">{t.wait}</p>
                    </div>

                    <button className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition-all group">
                        <div className="bg-green-100 p-3 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Phone size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800">{t.call}</h3>
                            <p className="text-sm text-gray-500">{t.toll}: 1800-123-4567</p>
                        </div>
                    </button>

                    <button className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <MessageSquare size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800">{t.chat}</h3>
                            <p className="text-sm text-gray-500">{t.chatSub}</p>
                        </div>
                    </button>

                    <button className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-500 transition-all group">
                        <div className="bg-orange-100 p-3 rounded-full text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <HelpCircle size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800">{t.faqs}</h3>
                            <p className="text-sm text-gray-500">{t.faqSub}</p>
                        </div>
                    </button>

                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
                    {t.gov}
                </div>

            </div>
        </div>
    );
};

export default ExpertHelp;
