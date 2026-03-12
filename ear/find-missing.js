import { statesData } from './src/data/marketData.js';
import { districtTranslations } from './src/data/districtTranslations.js';

const missingDistricts = [];
Object.values(statesData).forEach(stateObj => {
    stateObj.dists.forEach(district => {
        if (!districtTranslations[district]) {
            missingDistricts.push(district);
        }
    });
});

console.log("Total missing:", missingDistricts.length);
console.log(missingDistricts);
