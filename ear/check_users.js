import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./server/agrisathi_v3.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    if (rows.length === 0) {
        console.log("No users found.");
    } else {
        console.log("Registered Users:");
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.name} - ${row.mobile} (${row.role}) - ${row.district}, ${row.crop}`);
        });
    }
    db.close();
});
