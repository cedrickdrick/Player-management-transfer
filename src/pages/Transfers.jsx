"use client"

import { useState } from "react"
import { useTransfer } from "../state/TransferContext"
import { usePlayer } from "../state/PlayerContext"
import { useTeam } from "../state/TeamContext"
import { Plus, Search, Edit, Trash2, ArrowRight } from "lucide-react"

const Transfers = () => {
  const { transfers, loading, addTransfer, updateTransfer, deleteTransfer } = useTransfer()
  const { players } = usePlayer()
  const { teams } = useTeam()
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState(null)
  const [formData, setFormData] = useState({
    playerId: "",
    playerName: "",
    fromTeam: "",
    toTeam: "",
    transferFee: "",
    transferDate: "",
    transferType: "permanent",
    status: "pending",
  })

  const filteredTransfers = transfers.filter((transfer) =>
    transfer.playerName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const transferData = {
        ...formData,
        transferDate: new Date(formData.transferDate),
      }

      if (editingTransfer) {
        await updateTransfer(editingTransfer.id, transferData)
      } else {
        await addTransfer(transferData)
      }
      setShowForm(false)
      setEditingTransfer(null)
      setFormData({
        playerId: "",
        playerName: "",
        fromTeam: "",
        toTeam: "",
        transferFee: "",
        transferDate: "",
        transferType: "permanent",
        status: "pending",
      })
    } catch (error) {
      console.error("Error saving transfer:", error)
    }
  }

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer)
    setFormData({
      playerId: transfer.playerId || "",
      playerName: transfer.playerName || "",
      fromTeam: transfer.fromTeam || "",
      toTeam: transfer.toTeam || "",
      transferFee: transfer.transferFee || "",
      transferDate: transfer.transferDate?.toDate?.()?.toISOString().split("T")[0] || "",
      transferType: transfer.transferType || "permanent",
      status: transfer.status || "pending",
    })
    setShowForm(true)
  }

  const handleDelete = async (transferId) => {
    if (window.confirm("Are you sure you want to delete this transfer?")) {
      try {
        await deleteTransfer(transferId)
      } catch (error) {
        console.error("Error deleting transfer:", error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "cancelled":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Transfer Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Transfer</span>
        </button>
      </div>

      {/* Search */}
      <div className="card glass-effect">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transfers by player name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Transfers List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-white">Loading transfers...</div>
        ) : (
          filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="card glass-effect">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-bold text-white">{transfer.playerName}</h3>
                    <span className={`text-sm font-medium ${getStatusColor(transfer.status)}`}>
                      {transfer.status?.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-gray-300">
                    <span>{transfer.fromTeam}</span>
                    <ArrowRight size={16} />
                    <span>{transfer.toTeam}</span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Fee:</span>
                      <span className="text-white ml-1">
                        {transfer.transferFee ? `$${transfer.transferFee}` : "Free"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white ml-1">{transfer.transferType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white ml-1">
                        {transfer.transferDate?.toDate?.()?.toLocaleDateString() || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(transfer)} className="text-blue-400 hover:text-blue-300">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(transfer.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transfer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card glass-effect max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingTransfer ? "Edit Transfer" : "Add New Transfer"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Player</label>
                <select
                  value={formData.playerId}
                  onChange={(e) => {
                    const selectedPlayer = players.find((p) => p.id === e.target.value)
                    setFormData({
                      ...formData,
                      playerId: e.target.value,
                      playerName: selectedPlayer?.name || "",
                    })
                  }}
                  className="input-field"
                  required
                >
                  <option value="">Select Player</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">From Team</label>
                <select
                  value={formData.fromTeam}
                  onChange={(e) => setFormData({ ...formData, fromTeam: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">To Team</label>
                <select
                  value={formData.toTeam}
                  onChange={(e) => setFormData({ ...formData, toTeam: e.target.value })}
                  className="input-field"
                  required
                >
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
                  value={formData.transferFee}
                  onChange={(e) => setFormData({ ...formData, transferFee: e.target.value })}
                  className="input-field"
                  placeholder="0 (leave empty for free transfer)"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Transfer Date</label>
                <input
                  type="date"
                  value={formData.transferDate}
                  onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Transfer Type</label>
                <select
                  value={formData.transferType}
                  onChange={(e) => setFormData({ ...formData, transferType: e.target.value })}
                  className="input-field"
                >
                  <option value="permanent">Permanent</option>
                  <option value="loan">Loan</option>
                  <option value="free">Free Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingTransfer ? "Update" : "Add"} Transfer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingTransfer(null)
                    setFormData({
                      playerId: "",
                      playerName: "",
                      fromTeam: "",
                      toTeam: "",
                      transferFee: "",
                      transferDate: "",
                      transferType: "permanent",
                      status: "pending",
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

export default Transfers
