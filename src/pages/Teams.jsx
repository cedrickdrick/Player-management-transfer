"use client"

import { useState } from "react"
import { useTeam } from "../state/TeamContext"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

const Teams = () => {
  const { teams, loading, addTeam, updateTeam, deleteTeam } = useTeam()
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingTeam, setEditingTeam] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    league: "",
    country: "",
    founded: "",
    stadium: "",
    manager: "",
  })

  const filteredTeams = teams.filter((team) => team.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTeam) {
        await updateTeam(editingTeam.id, formData)
      } else {
        await addTeam(formData)
      }
      setShowForm(false)
      setEditingTeam(null)
      setFormData({
        name: "",
        league: "",
        country: "",
        founded: "",
        stadium: "",
        manager: "",
      })
    } catch (error) {
      console.error("Error saving team:", error)
    }
  }

  const handleEdit = (team) => {
    setEditingTeam(team)
    setFormData({
      name: team.name || "",
      league: team.league || "",
      country: team.country || "",
      founded: team.founded || "",
      stadium: team.stadium || "",
      manager: team.manager || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(teamId)
      } catch (error) {
        console.error("Error deleting team:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Teams Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Team</span>
        </button>
      </div>

      {/* Search */}
      <div className="card glass-effect">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-white">Loading teams...</div>
        ) : (
          filteredTeams.map((team) => (
            <div key={team.id} className="card glass-effect">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{team.name}</h3>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(team)} className="text-blue-400 hover:text-blue-300">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(team.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">League:</span> {team.league}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Country:</span> {team.country}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Founded:</span> {team.founded}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Stadium:</span> {team.stadium}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Manager:</span> {team.manager}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Team Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card glass-effect max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">{editingTeam ? "Edit Team" : "Add New Team"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Team Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">League</label>
                <input
                  type="text"
                  value={formData.league}
                  onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Founded</label>
                <input
                  type="number"
                  value={formData.founded}
                  onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Stadium</label>
                <input
                  type="text"
                  value={formData.stadium}
                  onChange={(e) => setFormData({ ...formData, stadium: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingTeam ? "Update" : "Add"} Team
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingTeam(null)
                    setFormData({
                      name: "",
                      league: "",
                      country: "",
                      founded: "",
                      stadium: "",
                      manager: "",
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

export default Teams
