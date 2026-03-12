import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const ai = new GoogleGenAI({});

async function test() {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                "Hello",
                {
                    inlineData: {
                        data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                        mimeType: "image/png"
                    }
                }
            ]
        });
        fs.writeFileSync('out.txt', response.text, 'utf-8');
    } catch (err) {
        fs.writeFileSync('out.txt', JSON.stringify(err, null, 2), 'utf-8');
        fs.writeFileSync('out2.txt', String(err), 'utf-8');
        if (err.status) console.log(err.status);
    }
}
test();
