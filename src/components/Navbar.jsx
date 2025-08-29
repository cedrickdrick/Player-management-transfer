"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../state/AuthContext"
import { LogOut, User, Users, UserCheck, BarChart3, Home } from "lucide-react"

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  if (!currentUser) {
    return (
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-white font-bold text-xl">
              Player Transfer System
            </Link>
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white font-bold text-xl">
            Player Transfer System
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 flex items-center space-x-1">
              <Home size={18} />
              <span>Dashboard</span>
            </Link>

            <Link to="/players" className="text-white hover:text-gray-200 flex items-center space-x-1">
              <User size={18} />
              <span>Players</span>
            </Link>

            <Link to="/teams" className="text-white hover:text-gray-200 flex items-center space-x-1">
              <Users size={18} />
              <span>Teams</span>
            </Link>

            <Link to="/transfers" className="text-white hover:text-gray-200 flex items-center space-x-1">
              <BarChart3 size={18} />
              <span>Transfers</span>
            </Link>

            {userRole === "admin" && (
              <Link to="/users" className="text-white hover:text-gray-200 flex items-center space-x-1">
                <UserCheck size={18} />
                <span>Users</span>
              </Link>
            )}

            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-white hover:text-gray-200">
                Profile
              </Link>

              <button onClick={handleLogout} className="text-white hover:text-gray-200 flex items-center space-x-1">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
