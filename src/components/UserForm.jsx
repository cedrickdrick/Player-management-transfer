"use client"

import { useState, useEffect } from "react"

const UserForm = ({ user, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    department: "",
    phone: "",
    bio: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        department: user.department || "",
        phone: user.phone || "",
        bio: user.bio || "",
      })
    }
  }, [user, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting user form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card glass-effect max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? "Edit User" : "Add New User"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
              disabled={isEditing}
            />
            {isEditing && <p className="text-gray-400 text-xs mt-1">Email cannot be changed</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Role *</label>
            <select name="role" value={formData.role} onChange={handleChange} className="input-field" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="scout">Scout</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} className="input-field">
              <option value="">Select Department</option>
              <option value="management">Management</option>
              <option value="scouting">Scouting</option>
              <option value="transfers">Transfers</option>
              <option value="analytics">Analytics</option>
              <option value="administration">Administration</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input-field"
            rows="3"
            placeholder="Brief description about the user..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? "Saving..." : isEditing ? "Update User" : "Add User"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
