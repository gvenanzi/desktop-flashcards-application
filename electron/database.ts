// electron/database.js
import Database from 'better-sqlite3';
import path from 'path';

// Percorso del file .db (puoi usare app.getPath('userData') per produzione)
const dbPath = path.join(__dirname, 'flashcards-app.db');
const db = new Database(dbPath);

// Attiva i vincoli di chiave esterna
db.pragma('foreign_keys = ON');

// Crea le tabelle se non esistono
db.prepare(`
  CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS flashcard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    collection_id INTEGER,
    last_time_has_been_answered INTEGER,
    FOREIGN KEY (collection_id) REFERENCES collection(id) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_time TEXT NOT NULL,-- as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
    rights INTEGER NOT NULL,
    wrongs INTEGER NOT NULL,
    collection_id INTEGER,
    FOREIGN KEY (collection_id) REFERENCES collection(id) ON DELETE CASCADE
  )
`).run();

export default db;
