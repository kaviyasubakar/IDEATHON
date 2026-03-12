import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const ai = new GoogleGenAI((process.env.GEMINI_API_KEY || "").trim());

async function listModels() {
    try {
        const response = await ai.models.list();
        // Just print everything to be sure
        console.log("KEYS:", Object.keys(response));
        if (response.models) {
             console.log("MODELS COUNT:", response.models.length);
             response.models.forEach(m => console.log(m.name));
        } else {
             console.log("RESPONSE:", JSON.stringify(response).substring(0, 1000));
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
