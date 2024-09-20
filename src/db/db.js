/*const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/tmp/database.db'); // Cambiado a un archivo en /tmp

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run("admin", "admin");
  stmt.finalize();
});

module.exports = db;*/