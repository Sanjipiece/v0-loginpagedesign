import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Facebook - Log In or Sign Up",
  description: "Log in to Facebook to connect with friends and the world.",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Left Section - Branding */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start px-16 bg-white">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">facebook</h1>
        <p className="text-3xl text-gray-800 font-light leading-snug max-w-sm">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <LoginForm />
      </div>
    </main>
  )
}
