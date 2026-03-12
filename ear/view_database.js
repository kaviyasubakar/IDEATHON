import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./server/agrisathi_v3.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the Agri-Sathi SQLite database.');
    }
});

// Function to print a table
const printTable = (tableName) => {
    return new Promise((resolve) => {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                console.error(`Error reading ${tableName}:`, err.message);
                resolve();
                return;
            }

            console.log(`\n--- TABLE: ${tableName} ---`);
            if (rows.length === 0) {
                console.log("(Table is empty)");
            } else {
                console.table(rows);
            }
            resolve();
        });
    });
};

// Main execution
const viewAllData = async () => {
    try {
        // Get all table names first
        db.all("SELECT name FROM sqlite_master WHERE type='table'", [], async (err, tables) => {
            if (err) {
                console.error("Error fetching table names:", err);
                return;
            }

            // Iterate and print each table
            for (const table of tables) {
                if (table.name !== 'sqlite_sequence') { // Skip internal SQLite table
                    await printTable(table.name);
                }
            }

            db.close();
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

viewAllData();
