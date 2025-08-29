"use client"

import { useState, useEffect } from "react"
import { usePlayer } from "../state/PlayerContext"
import { useTeam } from "../state/TeamContext"

const TransferForm = ({ transfer, onSubmit, onCancel, isEditing = false }) => {
  const { players } = usePlayer()
  const { teams } = useTeam()
  const [formData, setFormData] = useState({
    playerId: "",
    playerName: "",
    fromTeam: "",
    toTeam: "",
    transferFee: "",
    transferDate: "",
    transferType: "permanent",
    status: "pending",
    contractLength: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (transfer && isEditing) {
      setFormData({
        playerId: transfer.playerId || "",
        playerName: transfer.playerName || "",
        fromTeam: transfer.fromTeam || "",
        toTeam: transfer.toTeam || "",
        transferFee: transfer.transferFee || "",
        transferDate: transfer.transferDate?.toDate?.()?.toISOString().split("T")[0] || "",
        transferType: transfer.transferType || "permanent",
        status: transfer.status || "pending",
        contractLength: transfer.contractLength || "",
        notes: transfer.notes || "",
      })
    }
  }, [transfer, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlayerChange = (e) => {
    const selectedPlayer = players.find((p) => p.id === e.target.value)
    setFormData((prev) => ({
      ...prev,
      playerId: e.target.value,
      playerName: selectedPlayer?.name || "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const transferData = {
        ...formData,
        transferDate: new Date(formData.transferDate),
      }
      await onSubmit(transferData)
    } catch (error) {
      console.error("Error submitting transfer form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card glass-effect max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? "Edit Transfer" : "Add New Transfer"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Player *</label>
            <select
              name="playerId"
              value={formData.playerId}
              onChange={handlePlayerChange}
              className="input-field"
              required
            >
              <option value="">Select Player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} - {player.position}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Transfer Date *</label>
            <input
              type="date"
              name="transferDate"
              value={formData.transferDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">From Team *</label>
            <select name="fromTeam" value={formData.fromTeam} onChange={handleChange} className="input-field" required>
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">To Team *</label>
            <select name="toTeam" value={formData.toTeam} onChange={handleChange} className="input-field" required>
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Transfer Fee</label>
            <input
              type="number"
              name="transferFee"
              value={formData.transferFee}
              onChange={handleChange}
              className="input-field"
              placeholder="0 (leave empty for free transfer)"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Transfer Type *</label>
            <select
              name="transferType"
              value={formData.transferType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="permanent">Permanent</option>
              <option value="loan">Loan</option>
              <option value="free">Free Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Status *</label>
            <select name="status" value={formData.status} onChange={handleChange} className="input-field" required>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Contract Length (years)</label>
            <input
              type="number"
              name="contractLength"
              value={formData.contractLength}
              onChange={handleChange}
              className="input-field"
              min="0.5"
              max="10"
              step="0.5"
              placeholder="3"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-field"
            rows="3"
            placeholder="Additional notes about the transfer..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? "Saving..." : isEditing ? "Update Transfer" : "Add Transfer"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransferForm
