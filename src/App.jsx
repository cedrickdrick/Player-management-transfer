import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./state/AuthContext"
import { PlayerProvider } from "./state/PlayerContext"
import { TeamProvider } from "./state/TeamContext"
import { TransferProvider } from "./state/TransferContext"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleBasedRoute from "./components/RoleBasedRoute"

// Pages
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import Players from "./pages/Players"
import Teams from "./pages/Teams"
import Transfers from "./pages/Transfers"
import Users from "./pages/Users"
import Profile from "./pages/Profile"

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <TeamProvider>
          <TransferProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                {/* Video Background */}
                <video className="video-background" autoPlay muted loop playsInline>
                  <source src="/bg.mp4" type="video/mp4" />
                </video>

                <div className="overlay min-h-screen">
                  <Navbar />

                  <main className="container mx-auto px-4 py-8">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* Protected Routes */}
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/players"
                        element={
                          <ProtectedRoute>
                            <Players />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/teams"
                        element={
                          <ProtectedRoute>
                            <Teams />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/transfers"
                        element={
                          <ProtectedRoute>
                            <Transfers />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin Only Routes */}
                      <Route
                        path="/users"
                        element={
                          <RoleBasedRoute allowedRoles={["admin"]}>
                            <Users />
                          </RoleBasedRoute>
                        }
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </Router>
          </TransferProvider>
        </TeamProvider>
      </PlayerProvider>
    </AuthProvider>
  )
}

export default App
