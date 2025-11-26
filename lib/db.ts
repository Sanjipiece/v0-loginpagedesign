import fs from "fs"
import path from "path"

const DATA_DIR = "/tmp"
const DATA_FILE = path.join(DATA_DIR, "users.json")

export function initDatabase() {
  ensureDataFile()
}

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2))
    }
  } catch (error) {
    console.error("[v0] Error ensuring data file:", error)
  }
}

function readUsers() {
  try {
    ensureDataFile()
    const data = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("[v0] Error reading users:", error)
    return []
  }
}

function writeUsers(users: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error("[v0] Error writing users:", error)
  }
}

export function saveUser(email: string, password: string) {
  try {
    const users = readUsers()

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return { success: false, error: "البريد الإلكتروني مسجل بالفعل" }
    }

    const newUser = {
      id: users.length + 1,
      email,
      password,
      created_at: new Date().toISOString(),
    }

    users.push(newUser)
    writeUsers(users)

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error saving user:", error)
    return { success: false, error: "حدث خطأ في حفظ البيانات" }
  }
}

export function getUser(email: string) {
  try {
    const users = readUsers()
    return users.find((u: any) => u.email === email)
  } catch (error) {
    console.error("[v0] Error getting user:", error)
    return null
  }
}

export function getAllUsers() {
  try {
    const users = readUsers()
    return users.map((u: any) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
    }))
  } catch (error) {
    console.error("[v0] Error getting all users:", error)
    return []
  }
}
