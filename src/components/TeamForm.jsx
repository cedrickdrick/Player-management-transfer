"use client"

import { useState, useEffect } from "react"

const TeamForm = ({ team, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    league: "",
    country: "",
    founded: "",
    stadium: "",
    manager: "",
    website: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (team && isEditing) {
      setFormData({
        name: team.name || "",
        league: team.league || "",
        country: team.country || "",
        founded: team.founded || "",
        stadium: team.stadium || "",
        manager: team.manager || "",
        website: team.website || "",
        description: team.description || "",
      })
    }
  }, [team, isEditing])

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
      console.error("Error submitting team form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card glass-effect max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? "Edit Team" : "Add New Team"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Team Name *</label>
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
            <label className="block text-white text-sm font-medium mb-2">League *</label>
            <input
              type="text"
              name="league"
              value={formData.league}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="e.g., Premier League, La Liga"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Founded Year</label>
            <input
              type="number"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              className="input-field"
              min="1800"
              max={new Date().getFullYear()}
              placeholder="1900"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Stadium</label>
            <input
              type="text"
              name="stadium"
              value={formData.stadium}
              onChange={handleChange}
              className="input-field"
              placeholder="Stadium name"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="input-field"
              placeholder="Manager name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-white text-sm font-medium mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            rows="3"
            placeholder="Brief description about the team..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? "Saving..." : isEditing ? "Update Team" : "Add Team"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeamForm
