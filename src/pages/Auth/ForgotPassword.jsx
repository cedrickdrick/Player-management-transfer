"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../state/AuthContext"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch (error) {
      setError("Failed to reset password: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full glass-effect">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Password Reset</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-300 hover:text-blue-200">
            Back to Login
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span className="text-white">Don't have an account? </span>
          <Link to="/register" className="text-blue-300 hover:text-blue-200">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
