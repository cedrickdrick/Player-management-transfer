"use client"

import { useState, useEffect } from "react"
import { userService } from "../services/userService"
import { Search, Edit, Trash2, UserCheck, User } from "lucide-react"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const usersData = await userService.getAllUsers()
      setUsers(usersData)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userService.updateUser(editingUser.id, formData)
      await fetchUsers()
      setShowForm(false)
      setEditingUser(null)
      setFormData({
        name: "",
        email: "",
        role: "user",
      })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(userId)
        await fetchUsers()
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole)
      await fetchUsers()
    } catch (error) {
      console.error("Error updating user role:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <div className="text-gray-300">Total Users: {users.length}</div>
      </div>

      {/* Search */}
      <div className="card glass-effect">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="card glass-effect">
        {loading ? (
          <div className="text-center text-white">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left text-white font-medium py-3">User</th>
                  <th className="text-left text-white font-medium py-3">Email</th>
                  <th className="text-left text-white font-medium py-3">Role</th>
                  <th className="text-left text-white font-medium py-3">Created</th>
                  <th className="text-left text-white font-medium py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                          {user.role === "admin" ? (
                            <UserCheck className="text-white" size={20} />
                          ) : (
                            <User className="text-white" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-300 py-3">{user.email}</td>
                    <td className="py-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="text-gray-300 py-3">{user.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(user)} className="text-blue-400 hover:text-blue-300">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showForm && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card glass-effect max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Name</label>
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
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                  disabled
                />
                <p className="text-gray-400 text-xs mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input-field"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingUser(null)
                    setFormData({
                      name: "",
                      email: "",
                      role: "user",
                    })
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
