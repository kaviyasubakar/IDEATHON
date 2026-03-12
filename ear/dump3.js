import sqlite3 from 'sqlite3';
import fs from 'fs';
const db = new sqlite3.Database('server/agrisathi_v3.db');
db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) throw err;
    fs.writeFileSync('dbdump.json', JSON.stringify(rows, null, 2), 'utf-8');
});
db.close();
