
import React, { useState } from 'react';
import { X, Upload, CheckCircle, AlertTriangle, Loader2, Leaf } from 'lucide-react';

const PestDetection = ({ onClose }) => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const language = localStorage.getItem('preferredLanguage') || 'en';

    const translations = {
        'en': {
            title: "Pest & Disease Doctor", upload: "Click to upload crop photo", analyzing: "Analyzing Crop Health...",
            analyze: "Analyze for Pests", healthy: "Healthy", disease: "Disease Detected", confidence: "Confidence",
            rec: "Recommendation", consult: "Consult Expert", healthyMsg: "Your crop looks healthy! Continue with regular irrigation.",
            diseaseMsg: "Apply Dithane M-45 (2g/liter) spray immediately. Isolate affected plants."
        },
        'hi': {
            title: "कीट और रोग डॉक्टर", upload: "फसल की फोटो अपलोड करने के लिए क्लिक करें", analyzing: "फसल स्वास्थ्य का विश्लेषण...",
            analyze: "कीटों के लिए विश्लेषण करें", healthy: "स्वस्थ", disease: "रोग का पता चला", confidence: "विश्वास",
            rec: "सिफारिश", consult: "विशेषज्ञ से परामर्श लें", healthyMsg: "आपकी फसल स्वस्थ दिख रही है! नियमित सिंचाई जारी रखें।",
            diseaseMsg: "तुरंत डाइथेन एम-45 (2 ग्राम/लीटर) स्प्रे करें। प्रभावित पौधों को अलग करें।"
        },
        'ta': {
            title: "பூச்சி மற்றும் நோய் மருத்துவர்", upload: "பயிர் புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும்", analyzing: "பயிர் ஆரோக்கியத்தை ஆய்வு செய்கிறது...",
            analyze: "பூச்சிகளை ஆய்வு செய்க", healthy: "ஆரோக்கியமானது", disease: "நோய் கண்டறியப்பட்டது", confidence: "நம்பிக்கை",
            rec: "பரிந்துரை", consult: "நிபுணரை அணுகவும்", healthyMsg: "உங்கள் பயிர் ஆரோக்கியமாகத் தெரிகிறது! வழக்கமான நீர்ப்பாசனத்தைத் தொடரவும்.",
            diseaseMsg: "உடனடியாக டைத்தேன் எம்-45 (2 கிராம்/லிட்டர்) தெளிக்கவும். பாதிக்கப்பட்ட தாவரங்களை பிரிக்கவும்."
        },
        'te': {
            title: "తెగులు & వ్యాధి డాక్టర్", upload: "పంట ఫోటోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి", analyzing: "పంట ఆరోగ్యాన్ని విశ్లేషిస్తోంది...",
            analyze: "తెగుళ్ళ కోసం విశ్లేషించండి", healthy: "ఆరోగ్యకరమైనది", disease: "వ్యాధి గుర్తించబడింది", confidence: "నమ్మకం",
            rec: "సిఫార్సు", consult: "నిపుణుడిని సంప్రదించండి", healthyMsg: "మీ పంట ఆరోగ్యంగా కనిపిస్తోంది! క్రమం తప్పకుండా నీటి పారుదలని కొనసాగించండి.",
            diseaseMsg: "వెంటనే డైథేన్ ఎమ్-45 (2గ్రా/లీటరు) స్ప్రే చేయండి. ప్రభావిత మొక్కలను వేరు చేయండి."
        },
        'pa': {
            title: "ਕੀੜੇ ਅਤੇ ਰੋਗ ਡਾਕਟਰ", upload: "ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ", analyzing: "ਫਸਲ ਦੀ ਸਿਹਤ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
            analyze: "ਕੀੜਿਆਂ ਲਈ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ", healthy: "ਸਿਹਤਮੰਦ", disease: "ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲੱਗਾ", confidence: "ਭਰੋਸਾ",
            rec: "ਸਿਫਾਰਸ਼", consult: "ਮਾਹਰ ਨਾਲ ਸਲਾਹ ਕਰੋ", healthyMsg: "ਤੁਹਾਡੀ ਫਸਲ ਸਿਹਤਮੰਦ ਦਿਖਾਈ ਦੇ ਰਹੀ ਹੈ! ਨਿਯਮਤ ਸਿੰਚਾਈ ਜਾਰੀ ਰੱਖੋ।",
            diseaseMsg: "ਤੁਰੰਤ ਡਾਇਥੇਨ ਐਮ-45 (2 ਗ੍ਰਾਮ/ਲੀਟਰ) ਸਪਰੇਅ ਕਰੋ। ਪ੍ਰਭਾਵਿਤ ਪੌਦਿਆਂ ਨੂੰ ਵੱਖ ਕਰੋ।"
        },
        'ur': {
            title: "کیڑے اور بیماری کے ڈاکٹر", upload: "فصل کی تصویر اپ لوڈ کرنے کے لیے کلک کریں", analyzing: "فصل کی صحت کا تجزیہ کر رہا ہے...",
            analyze: "کیڑوں کا تجزیہ کریں", healthy: "صحت مند", disease: "بیماری کا پتہ چلا", confidence: "اعتماد",
            rec: "سفارش", consult: "ماہر سے مشورہ کریں", healthyMsg: "آپ کی فصل صحت مند نظر آ رہی ہے! باقاعدگی سے آبپاشی جاری رکھیں۔",
            diseaseMsg: "فوری طور پر ڈائیتھین ایم-45 (2 گرام فی لیٹر) سپرے کریں اور متاثرہ پودوں کو الگ کریں۔"
        },
        'bn': {
            title: "কীটপতঙ্গ ও রোগ চিকিৎসক", upload: "ফসলের ছবি আপলোড করতে ক্লিক করুন", analyzing: "ফসল স্বাস্থ্য বিশ্লেষণ করা হচ্ছে...",
            analyze: "কীটপতঙ্গ পরীক্ষা করুন", healthy: "সুস্থ", disease: "রোগ শনাক্ত হয়েছে", confidence: "নিশ্চয়তা",
            rec: "পরামর্শ", consult: "বিশেষজ্ঞের সাথে কথা বলুন", healthyMsg: "আপনার ফসল সুস্থ দেখাচ্ছে! নিয়মিত সেচ চালিয়ে যান।",
            diseaseMsg: "অবিলম্বে ডাইথেন এম-৪৫ (২ গ্রাম/লিটার) স্প্রে করুন। আক্রান্ত গাছগুলিকে আলাদা করুন।"
        },
        'or': {
            title: "ପୋକ ଏବଂ ରୋଗ ଡାକ୍ତର", upload: "ଫସଲ ଫଟୋ ଅପଲୋଡ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ", analyzing: "ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
            analyze: "ପୋକ ପାଇଁ ବିଶ୍ଳେଷଣ କରନ୍ତୁ", healthy: "ସୁସ୍ଥ", disease: "ରୋଗ ଚିହ୍ନଟ ହେଲା", confidence: "ଆତ୍ମବିଶ୍ୱାସ",
            rec: "ପରାମର୍ଶ", consult: "ବିଶେଷଜ୍ଞଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ", healthyMsg: "ଆପଣଙ୍କ ଫସଲ ସୁସ୍ଥ ଦିଶୁଛି! ନିୟମିତ ଜଳସେଚନ ଜାରି ରଖନ୍ତୁ।",
            diseaseMsg: "ତୁରନ୍ତ ଡାଇଥେନ୍ M-45 (2g/ଲିଟର) ସ୍ପ୍ରେ କରନ୍ତୁ | ପ୍ରଭାବିତ ଗଛଗୁଡ଼ିକୁ ଅଲଗା କରନ୍ତୁ |"
        },
        'mr': {
            title: "कीड आणि रोग डॉक्टर", upload: "पीक फोटो अपलोड करण्यासाठी क्लिक करा", analyzing: "पीक आरोग्याचे विश्लेषण करत आहे...",
            analyze: "कीड तपासणी करा", healthy: "निरोगी", disease: "रोग आढळला", confidence: "विश्वास",
            rec: "शिफारस", consult: "तज्ज्ञांचा सल्ला घ्या", healthyMsg: "तुमचे पीक निरोगी दिसत आहे! नियमित सिंचन सुरू ठेवा.",
            diseaseMsg: "त्वरीत डायथेन एम-४५ (२ ग्रॅम/लिटर) फवारणी करा. बाधित झाडे वेगळी करा."
        },
        'gu': {
            title: "જીવાત અને રોગ ડોક્ટર", upload: "પાકનો ફોટો અપલોડ કરવા ક્લિક કરો", analyzing: "પાક સ્વાસ્થ્યનું વિશ્લેષણ કરી રહ્યા છીએ...",
            analyze: "જીવાતો માટે વિશ્લેષણ કરો", healthy: "સ્વસ્થ", disease: "રોગની જાણ થઈ", confidence: "વિશ્વાસ",
            rec: "ભલામણ", consult: "નિષ્ણાતની સલાહ લો", healthyMsg: "તમારો પાક સ્વસ્થ લાગે છે! નિયમિત પિયત ચાલુ રાખો.",
            diseaseMsg: "તરત જ ડાયથેન એમ-૪૫ (૨ ગ્રામ/લિટર) સ્પ્રે કરો. અસરગ્રસ્ત છોડને અલગ કરો."
        },
        'kn': {
            title: "ಕೀಟ ಮತ್ತು ರೋಗ ವೈದ್ಯ", upload: "ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ", analyzing: "ಬೆಳೆ ಆರೋಗ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
            analyze: "ಕೀಟಗಳಿಗಾಗಿ ವಿಶ್ಲೇಷಿಸಿ", healthy: "ಆರೋಗ್ಯಕರ", disease: "ರೋಗ ಪತ್ತೆಯಾಗಿದೆ", confidence: "ಆತ್ಮವಿಶ್ವಾಸ",
            rec: "ಶಿಫಾರಸು", consult: "ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ", healthyMsg: "ನಿಮ್ಮ ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತಿದೆ! ನಿಯಮಿತವಾಗಿ ನೀರು ಹಾಯಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿ.",
            diseaseMsg: "ತಕ್ಷಣ ಡೈಥೇನ್ ಎಂ-45 (2ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ. ಪೀಡಿತ ಸಸ್ಯಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ."
        },
        'ml': {
            title: "കീടവിഷയം രോഗ ഡോക്ടർ", upload: "വിള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക", analyzing: "വിള ആരോഗ്യം വിശകലനം ചെയ്യുന്നു...",
            analyze: "കീടങ്ങളെ വിശകലനം ചെയ്യുക", healthy: "ആരോഗ്യമുള്ളത്", disease: "രോഗം കണ്ടെത്തി", confidence: "വിശ്വാസം",
            rec: "ശുപാർശ", consult: "വിദഗ്ധനെ സമീപിക്കുക", healthyMsg: "നിങ്ങളുടെ വിള ആരോഗ്യകരമായി കാണപ്പെടുന്നു! പതിവ് ജലസേചനം തുടരുക.",
            diseaseMsg: "ഉടനടി ഡൈഥേൻ എം-45 (2ഗ്രാം/ലിറ്റർ) സ്പ്രേ ചെയ്യുക. രോഗം ബാധിച്ച ചെടികളെ മാറ്റുക."
        },
        'sa': {
            title: "कीटपीडा रोग चिकित्सकः", upload: "सस्यस्य छायाचित्रं प्रेषयितुं नुदतु", analyzing: "सस्य स्वास्थ्य परीक्षणं भवति...",
            analyze: "कीटाणां परीक्षणं करोतु", healthy: "स्वस्थम्", disease: "रोगः दृष्टः", confidence: "विश्वासः",
            rec: "परामर्शः", consult: "विशेषज्ञेन सह चर्चां करोतु", healthyMsg: "भवतः सस्यं स्वस्थं दृश्यते। नियमितं जलसेचनं कुर्वन्तु।",
            diseaseMsg: "शीघ्रं डाइथेन एम-४५ (२ ग्राम/लीटर) लेपनं कुर्वन्तु। रोगग्रस्तान् पादपान् पृथक् कुर्वन्तु।"
        },
        'ne': {
            title: "किरा र रोग डाक्टर", upload: "बाली फोटो अपलोड गर्न क्लिक गर्नुहोस्", analyzing: "बाली स्वास्थ्य विश्लेषण गर्दै...",
            analyze: "किराहरूको लागि विश्लेषण गर्नुहोस्", healthy: "स्वस्थ", disease: "रोग फेला पर्यो", confidence: "विश्वास",
            rec: "परामर्श", consult: "विशेषज्ञसँग सल्लाह लिनुहोस्", healthyMsg: "तपाईंको बाली स्वस्थ देखिन्छ! नियमित सिंचाइ जारी राख्नुहोस्।",
            diseaseMsg: "तुरुन्तै डाइथेन एम-४५ (२ ग्राम/लिटर) स्प्रे गर्नुहोस्। प्रभावित बिरुवाहरूलाई अलग गर्नुहोस्।"
        }
    };

    const t = translations[language] || translations['en'];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!image) return;

        setAnalyzing(true);
        try {
            // Map the simple language code to full language name to get better translation from Gemini
            const langMap = { 'en': 'English', 'hi': 'Hindi', 'ta': 'Tamil', 'te': 'Telugu', 'pa': 'Punjabi', 'ur': 'Urdu', 'bn': 'Bengali', 'or': 'Odia', 'mr': 'Marathi', 'gu': 'Gujarati', 'kn': 'Kannada', 'ml': 'Malayalam', 'sa': 'Sanskrit', 'ne': 'Nepali' };
            const fullLanguage = langMap[language] || 'English';

            const res = await fetch('http://localhost:5000/api/analyze-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: image, language: fullLanguage })
            });
            const data = await res.json();
            
            if (res.ok && data.result) {
                setResult({
                    status: t.disease, // The prompt identifies diseases primarily
                    diseaseName: 'See details below',
                    confidence: 'AI Analysis',
                    recommendation: data.result // Store full text here
                });
            } else {
                setResult({
                    status: 'Error',
                    diseaseName: null,
                    confidence: 'Low',
                    recommendation: (data.error + (data.details ? ` (${data.details})` : "")) || 'Failed to analyze the image. Please try again later.'
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setResult({
                status: 'Error',
                diseaseName: null,
                confidence: 'None',
                recommendation: 'Network error. Make sure the backend server is running.'
            });
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Leaf size={28} className="text-white fill-white/20" />
                        <h2 className="text-2xl font-bold tracking-wide">{t.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">

                    {/* Image Preview / Upload Area */}
                    <div className="relative w-full aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors group">

                        {image ? (
                            <img src={image} alt="Crop Preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Upload size={48} className="text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-500 font-medium">{t.upload}</p>
                                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG</p>
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />

                        {image && !analyzing && !result && (
                            <button
                                onClick={() => setImage(null)}
                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Action Button */}
                    {!result && (
                        <button
                            onClick={analyzeImage}
                            disabled={!image || analyzing}
                            className={`
                                w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2
                                ${!image
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : analyzing
                                        ? 'bg-gray-100 text-gray-800'
                                        : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-orange-200 hover:-translate-y-1'
                                }
                            `}
                        >
                            {analyzing ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    {t.analyzing}
                                </>
                            ) : (
                                t.analyze
                            )}
                        </button>
                    )}

                    {/* Result Card */}
                    {result && (
                        <div className={`
                            rounded-2xl p-6 border-l-8 animate-fade-in-up
                            ${result.status === t.healthy ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}
                        `}>
                            <div className="flex items-start gap-4">
                                <div className={`
                                    p-3 rounded-full flex-shrink-0
                                    ${result.status === t.healthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                                `}>
                                    {result.status === t.healthy ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${result.status === t.healthy ? 'text-green-800' : 'text-red-800'}`}>
                                        {result.status}
                                    </h3>
                                    {result.diseaseName && (
                                        <p className="text-red-600 font-semibold mt-1">Suspected: {result.diseaseName}</p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">{t.confidence}: {result.confidence}</p>

                                    <div className="mt-4 bg-white/60 p-4 rounded-xl text-left">
                                        <p className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-1">{t.rec}:</p>
                                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">
                                            {result.recommendation}
                                        </div>
                                    </div>

                                    {/* Link to Shop or Expert (Mock) */}
                                    <div className="mt-4 flex gap-3">
                                        <button className="flex-1 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-black transition-colors" onClick={onClose}>
                                            {t.consult}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PestDetection;
