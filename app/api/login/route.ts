import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, saveUser } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    initDatabase()

    const { email, password } = await request.json()

    // Validate that data is present
    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 })
    }

    const result = saveUser(email, password)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "حدث خطأ في حفظ البيانات" }, { status: 400 })
    }

    return NextResponse.json({ message: "تم حفظ البيانات بنجاح" }, { status: 200 })
  } catch (error) {
    console.error("خطأ في حفظ البيانات:", error)
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
