import sqlite3 from 'sqlite3';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable verbose mode for debugging
const sql = sqlite3.verbose();

// Connect to SQLite database
// The file will be created in the server directory if it doesn't exist
const dbPath = resolve(__dirname, 'agrisathi_v3.db');

const db = new sql.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the Agri-Sathi SQLite database.');
    }
});

export default db;
