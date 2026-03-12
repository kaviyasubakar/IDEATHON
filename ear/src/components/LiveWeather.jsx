import React, { useState, useEffect } from 'react';

const WEATHER_API_KEY = '8e8e7432857e33e1987588325a6f27b9'; // Real token from the user project
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const LiveWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNormalizedLanguage = () => {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
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

  const translations = {
    'en': { loading: "Detecting your location...", errorTitle: "Location Error", cityDefault: "Your Location" },
    'hi': { loading: "आपकी स्थिति का पता लगाया जा रहा है...", errorTitle: "स्थिति त्रुटि", cityDefault: "आपका स्थान" },
    'ta': { loading: "உங்கள் இருப்பிடத்தைக் கண்டறிகிறது...", errorTitle: "இருப்பிடப் பிழை", cityDefault: "உங்கள் இடம்" },
    'te': { loading: "మీ స్థానాన్ని గుర్తిస్తోంది...", errorTitle: "స్థాన లోపం", cityDefault: "మీ ప్రాంతం" },
    'pa': { loading: "ਤੁਹਾਡੀ ਸਥਿਤੀ ਦਾ ਪਤਾ ਲਗਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...", errorTitle: "ਸਥਿਤੀ ਗਲਤੀ", cityDefault: "ਤੁਹਾਡਾ ਸਥਾਨ" },
    'bn': { loading: "আপনার অবস্থান সনাক্ত করা হচ্ছে...", errorTitle: "অবস্থান ত্রুটি", cityDefault: "আপনার অবস্থান" },
    'gu': { loading: "તમારું સ્થાન શોધી રહ્યાં છીએ...", errorTitle: "સ્થાન ભૂલ", cityDefault: "તમારું સ્થાન" },
    'mr': { loading: "तुमचे स्थान शोधत आहे...", errorTitle: "स्थान त्रुटी", cityDefault: "तुमचे स्थान" },
    'kn': { loading: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...", errorTitle: "ಸ್ಥಳ ದೋಷ", cityDefault: "ನಿಮ್ಮ ಸ್ಥಳ" }
  };

  const t = translations[language] || translations['en'];

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');
        const data = await response.json();
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let cityName = t.cityDefault;
        if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            cityName = geoData.address.city || geoData.address.town || geoData.address.county || geoData.address.state_district || t.cityDefault;
        }

        const wmoCodes = {
            0: { en: "Clear sky", hi: "साफ आकाश", ta: "தெளிவான வானம்", te: "నిర్మలమైన ఆకాశం", pa: "ਸਾਫ਼ ਅਸਮਾਨ", bn: "পরিষ্কার আকাশ", gu: "ચોખ્ખું આકાશ", mr: "स्वच्छ आकाश", kn: "ಲಕಲಕಿಸುವ ಆಕಾಶ", icon: "01d" },
            1: { en: "Mainly clear", hi: "मुख्यतः साफ", ta: "முக்கியமாக தெளிவாக", te: "ప్రధానంగా నిర్మలంగా", pa: "ਮੁੱਖ ਤੌਰ 'ਤੇ ਸਾਫ਼", bn: "প্রধানত পরিষ্কার", gu: "મુખ્યત્વે ચોખ્ખું", mr: "मुख्यतः स्वच्छ", kn: "ಹೆಚ್ಚಾಗಿ ಸ್ಪಷ್ಟ", icon: "02d" },
            2: { en: "Partly cloudy", hi: "आंशिक रूप से बादल", ta: "பகுதி மேகமூட்டம்", te: "పాక్షికంగా మేఘావృతం", pa: "ਅੰਸ਼ਕ ਤੌਰ 'ਤੇ ਬੱਦਲਵਾਈ", bn: "আংশিক মেঘলা", gu: "અંશતઃ વાદળછાયું", mr: "अंशतः ढगाळ", kn: "ಭಾಗಶಃ ಮೋಡ", icon: "03d" },
            3: { en: "Overcast", hi: "बहुत बादल", ta: "மேகமூட்டம்", te: "దట్టమైన మేఘావృతం", pa: "ਬੱਦਲਵਾਈ", bn: "মেঘলা আকাশ", gu: "વાદળછાયું", mr: "ढगाळ", kn: "ದಟ್ಟ ಮೋಡ", icon: "04d" },
            45: { en: "Fog", hi: "धुंध", ta: "மூடுபனி", te: "మంచు", pa: "ਧੁੰਦ", bn: "কুয়াশা", gu: "ઝાકળ", mr: "धुके", kn: "ಮಂಜು", icon: "50d" },
            48: { en: "Rime fog", hi: "पाला वाली धुंध", ta: "உறைபனி மூடுபனி", te: "తుషార మంచు", pa: "ਪਾਲੇ ਵਾਲੀ ਧੁੰਦ", bn: "তুষার কুয়াশা", gu: "ઝાકળવાળું", mr: "धुके आणि दव", kn: "ಹಿಮ ಮಂಜು", icon: "50d" },
            51: { en: "Light drizzle", hi: "हल्की बूंदाबांदी", ta: "லேசான தூறல்", te: "తేలికపాటి చినుకులు", pa: "ਹਲਕੀ ਬੂੰਦਾਬਾਂਦੀ", bn: "হালকা গুঁড়ি গুঁড়ি বৃষ্টি", gu: "હળવી ઝાપટાં", mr: "हलका पाऊस", kn: "ಸಣ್ಣ ಹನಿ ಮಳೆ", icon: "09d" },
            61: { en: "Slight rain", hi: "हल्की बारिश", ta: "சிறிது மழை", te: "తక్కువ వర్షం", pa: "ਹਲਕੀ ਬਾਰਿਸ਼", bn: "সামান্য বৃষ্টি", gu: "હળવો વરસાદ", mr: "किंचित पाऊस", kn: "ಹಗುರ ಮಳೆ", icon: "10d" },
            63: { en: "Moderate rain", hi: "मध्यम बारिश", ta: "மிதமான மழை", te: "మితమైన వర్షం", pa: "ਦਰਮਿਆਨੀ ਬਾਰਿਸ਼", bn: "মাঝারি বৃষ্টি", gu: "મધ્યમ વરસાદ", mr: "मध्यम पाऊस", kn: "ಸಾಧಾರಣ ಮಳೆ", icon: "10d" },
            65: { en: "Heavy rain", hi: "भारी बारिश", ta: "கனமழை", te: "భారీ వర్షం", pa: "ਭਾਰੀ ਬਾਰਿਸ਼", bn: "প্রবল বৃষ্টি", gu: "ભારે વરસાદ", mr: "मुसळधार पाऊस", kn: "ಭಾರೀ ಮಳೆ", icon: "10d" },
            95: { en: "Thunderstorm", hi: "गरज के साथ बारिश", ta: "இடியுடன் கூடிய மழை", te: "ఉరుములతో కూడిన వర్షం", pa: "ਗਰਜ ਨਾਲ ਬਾਰਿਸ਼", bn: "বজ্রবিদ্যুৎসহ বৃষ্টি", gu: "ગાજવીજ સાથે વરસાદ", mr: "वादळी पाऊस", kn: "ಗುಡುಗು ಸಹಿತ ಮಳೆ", icon: "11d" }
        };

        const weatherCode = data.current.weather_code;
        const condition = wmoCodes[weatherCode] || { en: "Unknown", icon: "03d" };

        setWeatherData({
          city: cityName,
          temperature: Math.round(data.current.temperature_2m),
          description: condition[language] || condition['en'],
          iconUrl: `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation not supported.');
        setLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
    };
    getLocation();
  }, [language]);

  // UI STATE: Loading Message
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[250px] max-w-sm w-full mx-auto font-sans">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-semibold animate-pulse">{t.loading}</p>
      </div>
    );
  }

  // UI STATE: Error Handling
  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-2xl shadow-lg border border-red-200 flex flex-col min-h-[250px] max-w-sm w-full mx-auto font-sans">
        <div className="text-red-500 mb-3 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <h3 className="text-red-800 font-bold text-lg text-center mb-2">{t.errorTitle}</h3>
        <p className="text-red-600 text-center font-medium leading-relaxed">{error}</p>
      </div>
    );
  }

  // Fallback safety
  if (!weatherData) return null;

  // UI STATE: Success (Displaying Data)
  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl shadow-2xl text-white max-w-sm w-full mx-auto font-sans overflow-hidden relative">
      <div className="relative z-10 flex flex-col items-center">
        {/* City Name */}
        <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <h2 className="text-3xl font-black drop-shadow-md">{weatherData.city}</h2>
        </div>
        
        {/* Weather Icon and Temperature */}
        <div className="flex items-center my-6">
          <div className="bg-white/20 rounded-3xl p-2 backdrop-blur-md shadow-inner border border-white/20">
              <img 
                src={weatherData.iconUrl} 
                alt={weatherData.description} 
                className="w-24 h-24 drop-shadow-xl scale-110"
              />
          </div>
          <div className="flex items-start ml-6">
              <span className="text-7xl font-black tracking-tighter drop-shadow-lg">
                {weatherData.temperature}
              </span>
              <span className="text-3xl font-bold mt-2 text-blue-200">°C</span>
          </div>
        </div>

        {/* Condition details */}
        <p className="text-xl font-bold capitalize flex items-center bg-black/20 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
          {weatherData.description}
        </p>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default LiveWeather;
