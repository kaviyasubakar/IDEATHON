import https from 'https';

// Helper function to make HTTP GET requests
const fetchJson = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
};

async function getLiveWeather() {
    try {
        console.log("Detecting live location...");
        
        // 1. Get Live Location via IP
        const locationData = await fetchJson('https://ipinfo.io/json');
        const [lat, lon] = locationData.loc.split(',');
        
        const city = locationData.city;
        const state = locationData.region;
        const country = locationData.country === 'IN' ? 'India' : locationData.country;
        const locationName = `${city}, ${state}, ${country}`;

        console.log(`Location found: ${locationName} (Lat: ${lat}, Lon: ${lon})`);
        console.log("Fetching weather data...\n");

        // 2. Fetch Real-time Weather Data from Open-Meteo (Free, NO API key required)
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const weatherData = await fetchJson(weatherUrl);

        const current = weatherData.current;
        const daily = weatherData.daily;

        // Map WMO weather codes to readable conditions
        const weatherCodeObj = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Slight snow fall",
            80: "Slight rain showers",
            95: "Thunderstorm"
        };
        const condition = weatherCodeObj[current.weather_code] || "Unknown";

        // 3. Output EXACTLY as requested
        console.log("=====================================");
        console.log(`- Location name: ${locationName}`);
        console.log(`- Current temperature: ${current.temperature_2m} °C`);
        console.log(`- Weather condition: ${condition}`);
        console.log(`- Feels like temperature: ${current.apparent_temperature} °C`);
        console.log(`- Humidity: ${current.relative_humidity_2m} %`);
        console.log(`- Wind speed: ${current.wind_speed_10m} km/h`);
        console.log(`- Minimum and maximum temperature: ${daily.temperature_2m_min[0]} °C / ${daily.temperature_2m_max[0]} °C`);
        console.log("=====================================");

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

getLiveWeather();
