import Database from "better-sqlite3"
import path from "path"

let db: Database.Database

function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "app.db")
    db = new Database(dbPath)
    db.pragma("journal_mode = WAL")
  }
  return db
}

export function initDatabase() {
  const database = getDatabase()
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `

  database.exec(schema)
}

export function saveUser(email: string, password: string) {
  const database = getDatabase()
  const stmt = database.prepare("INSERT INTO users (email, password) VALUES (?, ?)")

  try {
    stmt.run(email, password)
    return { success: true }
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return { success: false, error: "Email already registered" }
    }
    return { success: false, error: error.message }
  }
}

export function getUser(email: string) {
  const database = getDatabase()
  const stmt = database.prepare("SELECT * FROM users WHERE email = ?")
  return stmt.get(email)
}

export function getAllUsers() {
  const database = getDatabase()
  const stmt = database.prepare("SELECT id, email, created_at FROM users ORDER BY created_at DESC")
  return stmt.all()
}
