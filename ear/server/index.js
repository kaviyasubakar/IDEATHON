import express from 'express';
import cors from 'cors';
import db from './db.js';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI((process.env.GEMINI_API_KEY || "").trim()); 

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Database Tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            mobile TEXT UNIQUE NOT NULL,
            password TEXT,
            district TEXT,
            crop TEXT,
            language TEXT DEFAULT 'en',
            role TEXT DEFAULT 'farmer',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (!err) {
            console.log('Users table ready');
            // Migration/Ensure columns exist for older DBs
            db.run(`ALTER TABLE users ADD COLUMN password TEXT`, (err) => {});
            db.run(`UPDATE users SET language = 'hi' WHERE language = 'Hindi' OR language = 'hindi'`);
            db.run(`UPDATE users SET language = 'ta' WHERE language = 'Tamil' OR language = 'tamil'`);
            db.run(`UPDATE users SET language = 'te' WHERE language = 'Telugu' OR language = 'telugu'`);
            db.run(`UPDATE users SET language = 'pa' WHERE language = 'Punjabi' OR language = 'punjabi'`);
            db.run(`UPDATE users SET language = 'bn' WHERE language = 'Bengali' OR language = 'bengali'`);
            db.run(`UPDATE users SET language = 'gu' WHERE language = 'Gujarati' OR language = 'gujarati'`);
            db.run(`UPDATE users SET language = 'mr' WHERE language = 'Marathi' OR language = 'marathi'`);
            db.run(`UPDATE users SET language = 'kn' WHERE language = 'Kannada' OR language = 'kannada'`);
            db.run(`UPDATE users SET language = 'en' WHERE language IS NULL OR language = 'English' OR language = 'english'`);
        }
    });

    // 2. Crop Advisory Table
    db.run(`
        CREATE TABLE IF NOT EXISTS crop_advisory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            crop_name TEXT,
            advisory_text TEXT,
            date_created DATE DEFAULT CURRENT_DATE,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating crop_advisory table:', err.message);
        } else {
            console.log('Crop Advisory table ready');
        }
    });
});

// API Routes

// Test Route
app.get('/', (req, res) => {
    res.json({ message: "Agri-Sathi Backend is Running!" });
});

// Registration Endpoint
app.post('/api/register', (req, res) => {
    const { name, mobile, password, district, crop, language } = req.body;

    // Mobile validation: 10 digits only
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        return res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    }

    if (!password || password.length < 3) {
        return res.status(400).json({ error: "Password must be at least 3 characters." });
    }

    if (!district) {
        return res.status(400).json({ error: "District is required." });
    }

    const sql = `INSERT INTO users (name, mobile, password, district, crop, language) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, mobile, password, district, crop || null, language || 'en'], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: "User already exists with this mobile number." });
            }
            return res.status(500).json({ error: "Database error during registration." });
        }
        res.json({
            message: "User registered successfully",
            userId: this.lastID
        });
    });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        return res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }

    const sql = `SELECT * FROM users WHERE mobile = ?`;

    db.get(sql, [mobile], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error during login." });
        }
        if (!row) {
            return res.status(404).json({ error: "Mobile number not registered." });
        }

        // Secure password check
        if (!row.password || row.password !== password) {
            return res.status(401).json({ error: "Invalid mobile number or password." });
        }

        res.json({
            message: "Login successful",
            user: { 
                id: row.id, 
                name: row.name, 
                mobile: row.mobile, 
                role: row.role, 
                district: row.district, 
                language: row.language 
            }
        });
    });
});

// Get Advisory for a User
app.get('/api/advisory/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = `SELECT * FROM crop_advisory WHERE user_id = ? ORDER BY date_created DESC`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ advisories: rows });
    });
});

// Analyze Image Endpoint (Gemini API Integration)
app.post('/api/analyze-image', async (req, res) => {
    try {
        const { image, language } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: "Image data is required." });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("AI Error: Missing API Key");
            return res.status(500).json({ error: "AI API Key is missing on the server. Please check your .env file." });
        }

        const base64Data = image.includes('base64,') ? image.split('base64,')[1] : image;
        const mimeType = image.includes('image/') ? image.split(':')[1].split(';')[0] : 'image/jpeg';
        
        console.log(`Starting AI analysis for language: ${language}, Mime: ${mimeType}`);

        const systemPrompt = `You are a crop health expert. Identify the crop and any pest/disease in the photo. Provide a short recommendation. Translate your entire response to ${language || 'English'}.`;

        const response = await ai.models.generateContent({
            model: 'models/gemini-2.0-flash',
            contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Data
                    }
                }
            ]
        });
        
        let text = "No diagnosis found.";
        if (response.text) {
            text = response.text;
        } else if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
            text = response.candidates[0].content.parts[0].text;
        }
        
        console.log("AI Analysis successful");
        res.json({ result: text });
    } catch (error) {
        console.error("AI Server Error:", error);
        res.status(500).json({ 
            error: "The AI Doctor had trouble reading that photo.",
            details: error.message || "Unknown error"
        });
    }
});

// Update User Language Preference
app.post('/api/update-language', (req, res) => {
    const { userId, language } = req.body;
    if (!userId || !language) {
        return res.status(400).json({ error: "User ID and language are required." });
    }

    db.run(`UPDATE users SET language = ? WHERE id = ?`, [language, userId], (err) => {
        if (err) {
            console.error("Error updating language:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Language updated successfully" });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
