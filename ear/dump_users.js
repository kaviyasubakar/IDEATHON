const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');
db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(`Name: ${row.name || 'N/A'}, Mobile: ${row.mobile}, Password: ${row.password || 'null'}, District: ${row.district}`);
    });
});
db.close();
