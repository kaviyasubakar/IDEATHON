
import React, { useState, useEffect, useCallback } from 'react';
import {
    Cloud, CloudRain, Sun, Wind, Droplets,
    Thermometer, RefreshCw, MapPin, AlertTriangle,
    CheckCircle, Loader2, Navigation,
    CloudLightning, CloudSnow, CloudSun
} from 'lucide-react';

/**
 * AGRI SHAKTHI - Real-Time Weather Module
 * Rectification: Fixed contrast/visibility issues by using deep high-contrast colors.
 */

const WEATHER_API_KEY = '8e8e7432857e33e1987588325a6f27b9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherModule = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isDemo, setIsDemo] = useState(false);

    const language = localStorage.getItem('preferredLanguage') || 'en';

    const translations = {
        'en': {
            title: "Live Weather", feels: "Feels like", humidity: "Humidity", wind: "Wind Speed",
            minMax: "Min/Max", advisor: "Farmer Advisory", loading: "Finding farm...",
            refresh: "Refresh Now", errorLoc: "Location denied.",
            errorFetch: "Network issue.", heatWarn: "Heat Warning! Irrigate crops.",
            irrigate: "Rain Alert! Secure crops.", fungalAlert: "Fungal Alert! High moisture.",
            windWarn: "Wind Alert! High winds.", normal: "Conditions are excellent for farming.",
            kmh: "km/h", updated: "Updated", demo: "DEMO MODE (API Unavailable)"
        },
        'hi': {
            title: "लाइव मौसम", feels: "महसूस", humidity: "नमी", wind: "हवा",
            minMax: "न्यूनतम/अधिकतम", advisor: "किसान सलाह", loading: "खोज रहे हैं...",
            refresh: "ताज़ा", errorLoc: "स्थान नहीं मिला।",
            errorFetch: "नेटवर्क समस्या।", heatWarn: "गर्मी! सिंचाई करें।",
            irrigate: "बारिश! फसल बचाएं।", fungalAlert: "कवक अलर्ट!",
            windWarn: "हवा! सहारा दें।", normal: "खेती के लिए अच्छा दिन है।",
            kmh: "किमी/घंटा", updated: "अपडेट", demo: "डेमो (API निष्क्रिय)"
        }
    };

    const t = translations[language] || translations['en'];

    const getWeatherIcon = (condition) => {
        const main = condition?.toLowerCase() || '';
        if (main.includes('rain') || main.includes('drizzle')) return <CloudRain className="w-12 h-12 text-blue-200" />;
        if (main.includes('thunderstorm')) return <CloudLightning className="w-12 h-12 text-yellow-400" />;
        if (main.includes('snow')) return <CloudSnow className="w-12 h-12 text-white" />;
        if (main.includes('clear')) return <Sun className="w-12 h-12 text-yellow-300" />;
        if (main.includes('cloud')) return <CloudSun className="w-12 h-12 text-blue-100" />;
        return <Cloud className="w-12 h-12 text-white/90" />;
    };

    const loadDemoData = useCallback((cityName = "Vellore") => {
        // Small randomization to make demo cities look slightly different
        const hash = cityName.length;
        setWeatherData({
            name: `${cityName} (Demo)`,
            main: { temp: 28 + (hash % 8), feels_like: 30 + (hash % 8), humidity: 60 + (hash * 3 % 30), temp_min: 24, temp_max: 36 },
            wind: { speed: 4.2 + (hash % 3) },
            weather: [{ main: hash % 2 === 0 ? "Clouds" : "Clear", description: hash % 2 === 0 ? "scattered clouds" : "clear sky" }],
            sys: { country: "IN" }
        });
        setIsDemo(true);
        setError(null);
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
    }, []);

    const getWeatherData = useCallback(async (lat, lon, city = null) => {
        setLoading(true);
        setError(null);
        try {
            let url;
            if (city) {
                url = `${BASE_URL}?q=${encodeURIComponent(city)},IN&appid=${WEATHER_API_KEY}&units=metric`;
            } else {
                url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                // OpenWeather API key is invalid/expired. Serve dynamic demo data based on requested city.
                loadDemoData(city || "Local");
                return;
            }
            const data = await response.json();
            setWeatherData(data);
            setIsDemo(false);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            console.error("Weather fetch error:", err);
            loadDemoData(city || "Local");
        } finally {
            setLoading(false);
        }
    }, [loadDemoData]);

    const detectLocation = useCallback((forceLive = false) => {
        const storedUser = localStorage.getItem('user');
        let user = null;
        try {
            user = storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("WeatherModule: User data parse error", e);
        }

        const fetchByGeo = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        getWeatherData(position.coords.latitude, position.coords.longitude);
                    },
                    (err) => {
                        console.warn("Geolocation blocked/failed:", err);
                        if (!forceLive && user && user.district) {
                            getWeatherData(null, null, user.district);
                        } else {
                            // Fallback to Vellore if no geolocation or user district
                            getWeatherData(12.9165, 79.1325);
                        }
                    },
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            } else {
                if (!forceLive && user && user.district) {
                    getWeatherData(null, null, user.district);
                } else {
                    getWeatherData(12.9165, 79.1325);
                }
            }
        };

        // If explicitly requested live location
        if (forceLive === true) {
            fetchByGeo();
            return;
        }

        // Priority 1: Registered District
        if (user && user.district) {
            getWeatherData(null, null, user.district);
            return;
        }

        // Priority 2: Geolocation
        fetchByGeo();

    }, [getWeatherData]);

    useEffect(() => {
        detectLocation();
        const interval = setInterval(() => detectLocation(), 15 * 60 * 1000); // Check every 15 mins
        return () => clearInterval(interval);
    }, [detectLocation]);

    const getAdvisory = () => {
        if (!weatherData) return [];
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed * 3.6;
        const mainCond = weatherData.weather[0].main.toLowerCase();
        const hasRain = mainCond.includes('rain') || mainCond.includes('drizzle');

        let messages = [];
        if (temp > 35) messages.push({ icon: <AlertTriangle size={16} className="text-orange-600" />, text: t.heatWarn, color: "bg-orange-50 border-orange-200 text-orange-950" });
        if (hasRain) messages.push({ icon: <CloudRain size={16} className="text-blue-600" />, text: t.irrigate, color: "bg-blue-50 border-blue-200 text-blue-950" });
        if (humidity > 80) messages.push({ icon: <Droplets size={16} className="text-purple-600" />, text: t.fungalAlert, color: "bg-purple-50 border-purple-200 text-purple-950" });
        if (windSpeed > 25) messages.push({ icon: <Wind size={16} className="text-red-600" />, text: t.windWarn, color: "bg-red-50 border-red-200 text-red-950" });

        if (messages.length === 0) {
            messages.push({ icon: <CheckCircle size={16} className="text-emerald-600" />, text: t.normal, color: "bg-emerald-50 border-emerald-200 text-emerald-950" });
        }
        return messages;
    };

    if (!weatherData) {
        return (
            <div className="p-10 rounded-[32px] bg-emerald-900 text-white flex flex-col items-center justify-center min-h-[300px] shadow-2xl">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="font-bold text-lg">{t.loading}</p>
            </div>
        );
    }

    const advisory = getAdvisory();

    return (
        <div className="weather-wrapper space-y-4 text-left font-sans">
            {/* Dark Mode Theme Weather Card */}
            <div className="weather-card relative overflow-hidden p-6 rounded-[32px] text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all bg-[#0a1f1a] border border-[#1a3a32]">

                {/* High Contrast Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1a] via-[#0f2d26] to-[#042f2e] opacity-100 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                        <div className="text-left">
                            <h3 className="text-2xl font-black flex items-center gap-2 text-emerald-400 drop-shadow-md">
                                <MapPin size={22} className="text-emerald-500" />
                                {weatherData.name}
                            </h3>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-tighter bg-black/40 text-emerald-300 px-3 py-1 rounded-full border border-emerald-900/50">
                                    {isDemo ? t.demo : `${t.updated}: ${lastUpdated}`}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => detectLocation(true)}
                                title="Use Live Location"
                                className="w-11 h-11 rounded-2xl bg-black/40 hover:bg-emerald-600 transition-all flex items-center justify-center border border-emerald-800/50 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group"
                            >
                                <Navigation size={20} className="text-blue-300 group-hover:text-white group-hover:animate-pulse transition-colors" />
                            </button>
                            <button
                                onClick={() => detectLocation(false)}
                                title={t.refresh}
                                className="w-11 h-11 rounded-2xl bg-black/40 hover:bg-emerald-600 transition-all flex items-center justify-center border border-emerald-800/50 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group"
                            >
                                <RefreshCw size={20} className={`${loading ? 'animate-spin text-emerald-300' : 'text-emerald-100'} group-hover:text-white group-hover:rotate-180 transition-all duration-500`} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 bg-black/30 rounded-3xl border border-white/5 shadow-2xl">
                            {getWeatherIcon(weatherData.weather[0].main)}
                        </div>
                        <div className="text-left">
                            <div className="flex items-end">
                                <span className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{Math.round(weatherData.main.temp)}°</span>
                                <span className="text-3xl font-bold mb-2 ml-1 text-emerald-400">C</span>
                            </div>
                            <p className="text-lg font-bold text-emerald-200/80 capitalize drop-shadow-md">{weatherData.weather[0].description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <StatBox label={t.feels} value={`${Math.round(weatherData.main.feels_like)}°C`} />
                        <StatBox label={t.humidity} value={`${weatherData.main.humidity}%`} />
                        <StatBox label={t.wind} value={`${Math.round(weatherData.wind.speed * 3.6)} ${t.kmh}`} />
                        <StatBox label={t.minMax} value={`${Math.round(weatherData.main.temp_min)}°/${Math.round(weatherData.main.temp_max)}°`} />
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
            </div>

            {/* High Readability Advisory Section */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Navigation size={14} className="text-emerald-600 stroke-[3px]" />
                    {t.advisor}
                </h4>
                <div className="space-y-3">
                    {advisory.map((item, index) => (
                        <div key={index} className={`flex items-center gap-4 p-4 rounded-2xl border ${item.color} shadow-sm transition-all hover:scale-[1.02]`}>
                            <div className="bg-white p-2.5 rounded-xl shadow-md flex-shrink-0">{item.icon}</div>
                            <p className="font-bold text-sm leading-snug">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value }) => (
    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/5 text-left transition-colors hover:border-emerald-500/30">
        <p className="text-[9px] font-black uppercase text-emerald-500/70 tracking-widest mb-1">{label}</p>
        <p className="text-base font-black text-white">{value}</p>
    </div>
);

export default WeatherModule;
