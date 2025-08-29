"use client"

import { useState, useEffect } from "react"
import { useTeam } from "../state/TeamContext"

const PlayerForm = ({ player, onSubmit, onCancel, isEditing = false }) => {
  const { teams } = useTeam()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    nationality: "",
    currentTeam: "",
    marketValue: "",
    bio: "",
    height: "",
    weight: "",
    preferredFoot: "right",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (player && isEditing) {
      setFormData({
        name: player.name || "",
        age: player.age || "",
        position: player.position || "",
        nationality: player.nationality || "",
        currentTeam: player.currentTeam || "",
        marketValue: player.marketValue || "",
        bio: player.bio || "",
        height: player.height || "",
        weight: player.weight || "",
        preferredFoot: player.preferredFoot || "right",
      })
    }
  }, [player, isEditing])

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
      console.error("Error submitting player form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card glass-effect max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? "Edit Player" : "Add New Player"}</h2>

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
            <label className="block text-white text-sm font-medium mb-2">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input-field"
              min="16"
              max="45"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Position *</label>
            <select name="position" value={formData.position} onChange={handleChange} className="input-field" required>
              <option value="">Select Position</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Nationality *</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Current Team</label>
            <select name="currentTeam" value={formData.currentTeam} onChange={handleChange} className="input-field">
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
              name="marketValue"
              value={formData.marketValue}
              onChange={handleChange}
              className="input-field"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="input-field"
              placeholder="180"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="input-field"
              placeholder="75"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Preferred Foot</label>
            <select name="preferredFoot" value={formData.preferredFoot} onChange={handleChange} className="input-field">
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Biography</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input-field"
            rows="3"
            placeholder="Brief description about the player..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? "Saving..." : isEditing ? "Update Player" : "Add Player"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PlayerForm
