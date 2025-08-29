"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../state/AuthContext"
import { userService } from "../services/userService"
import { User, Mail, Shield, Calendar } from "lucide-react"

const Profile = () => {
  const { currentUser, userRole } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile()
    }
  }, [currentUser])

  const fetchUserProfile = async () => {
    try {
      const profile = await userService.getUserById(currentUser.uid)
      setUserProfile(profile)
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
      })
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userService.updateUser(currentUser.uid, {
        name: formData.name,
      })
      await fetchUserProfile()
      setEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
        <p className="text-gray-300">Manage your account information</p>
      </div>

      <div className="card glass-effect">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userProfile?.name || "User"}</h2>
              <p className="text-gray-300 capitalize">{userRole} Account</p>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} className="btn-primary">
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input type="email" value={formData.email} className="input-field" disabled />
              <p className="text-gray-400 text-xs mt-1">Email cannot be changed</p>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
              <User className="text-gray-400" size={20} />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white">{userProfile?.name || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-white">{userProfile?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
              <Shield className="text-gray-400" size={20} />
              <div>
                <p className="text-gray-400 text-sm">Account Role</p>
                <p className="text-white capitalize">{userRole}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
              <Calendar className="text-gray-400" size={20} />
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white">{userProfile?.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      <div className="card glass-effect">
        <h3 className="text-xl font-bold text-white mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-primary-400">Active</p>
            <p className="text-gray-300 text-sm">Account Status</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-primary-400">{userRole === "admin" ? "Full" : "Limited"}</p>
            <p className="text-gray-300 text-sm">Access Level</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-primary-400">Secure</p>
            <p className="text-gray-300 text-sm">Security Status</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
