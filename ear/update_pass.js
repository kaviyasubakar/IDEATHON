import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./server/agrisathi_v3.db', (err) => {
    if (err) console.error('Error opening database:', err.message);
});

db.run("UPDATE users SET password = 'deeva' WHERE mobile = '9943200161'", function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
});
db.close();
