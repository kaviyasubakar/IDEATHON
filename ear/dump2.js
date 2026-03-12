import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('server/agrisathi_v3.db');
db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) throw err;
    rows.forEach(r => console.log(`Phone: ${r.mobile} | Pass: ${r.password} | Name: ${r.name} | Dist: ${r.district}`));
});
db.close();
