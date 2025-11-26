import { NextResponse } from "next/server"
import { initDatabase, getAllUsers } from "@/lib/db"

export async function GET() {
  try {
    initDatabase()
    const users = getAllUsers()

    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Error retrieving users:", error)
    return NextResponse.json({ error: "حدث خطأ في استرجاع البيانات" }, { status: 500 })
  }
}
