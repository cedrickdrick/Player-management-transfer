"use client"

import { useState } from "react"
import { usePlayer } from "../state/PlayerContext"
import { useTeam } from "../state/TeamContext"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

const Players = () => {
  const { players, loading, addPlayer, updatePlayer, deletePlayer } = usePlayer()
  const { teams } = useTeam()
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    nationality: "",
    currentTeam: "",
    marketValue: "",
  })

  const filteredPlayers = players.filter((player) => player.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPlayer) {
        await updatePlayer(editingPlayer.id, formData)
      } else {
        await addPlayer(formData)
      }
      setShowForm(false)
      setEditingPlayer(null)
      setFormData({
        name: "",
        age: "",
        position: "",
        nationality: "",
        currentTeam: "",
        marketValue: "",
      })
    } catch (error) {
      console.error("Error saving player:", error)
    }
  }

  const handleEdit = (player) => {
    setEditingPlayer(player)
    setFormData({
      name: player.name || "",
      age: player.age || "",
      position: player.position || "",
      nationality: player.nationality || "",
      currentTeam: player.currentTeam || "",
      marketValue: player.marketValue || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (playerId) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayer(playerId)
      } catch (error) {
        console.error("Error deleting player:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Players Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Player</span>
        </button>
      </div>

      {/* Search */}
      <div className="card glass-effect">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Players List */}
      <div className="card glass-effect">
        {loading ? (
          <div className="text-center text-white">Loading players...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left text-white font-medium py-3">Name</th>
                  <th className="text-left text-white font-medium py-3">Age</th>
                  <th className="text-left text-white font-medium py-3">Position</th>
                  <th className="text-left text-white font-medium py-3">Nationality</th>
                  <th className="text-left text-white font-medium py-3">Current Team</th>
                  <th className="text-left text-white font-medium py-3">Market Value</th>
                  <th className="text-left text-white font-medium py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player) => (
                  <tr key={player.id} className="border-b border-gray-700">
                    <td className="text-white py-3">{player.name}</td>
                    <td className="text-gray-300 py-3">{player.age}</td>
                    <td className="text-gray-300 py-3">{player.position}</td>
                    <td className="text-gray-300 py-3">{player.nationality}</td>
                    <td className="text-gray-300 py-3">
                      {teams.find((t) => t.id === player.currentTeam)?.name || player.currentTeam}
                    </td>
                    <td className="text-gray-300 py-3">${player.marketValue}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(player)} className="text-blue-400 hover:text-blue-300">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(player.id)} className="text-red-400 hover:text-red-300">
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

      {/* Player Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card glass-effect max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">{editingPlayer ? "Edit Player" : "Add New Player"}</h3>
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
                <label className="block text-white text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Current Team</label>
                <select
                  value={formData.currentTeam}
                  onChange={(e) => setFormData({ ...formData, currentTeam: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Market Value</label>
                <input
                  type="number"
                  value={formData.marketValue}
                  onChange={(e) => setFormData({ ...formData, marketValue: e.target.value })}
                  className="input-field"
                  placeholder="0"
                />
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingPlayer ? "Update" : "Add"} Player
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingPlayer(null)
                    setFormData({
                      name: "",
                      age: "",
                      position: "",
                      nationality: "",
                      currentTeam: "",
                      marketValue: "",
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

export default Players
