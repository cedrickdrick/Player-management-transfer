"use client"

import { User, MapPin, Calendar, DollarSign } from "lucide-react"

const PlayerCard = ({ player, onEdit, onDelete, showActions = true }) => {
  const getPositionColor = (position) => {
    switch (position?.toLowerCase()) {
      case "goalkeeper":
        return "bg-yellow-500"
      case "defender":
        return "bg-blue-500"
      case "midfielder":
        return "bg-green-500"
      case "forward":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="card glass-effect hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{player.name}</h3>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPositionColor(player.position)}`}
              >
                {player.position}
              </span>
              <span className="text-gray-300 text-sm">Age {player.age}</span>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            {onEdit && (
              <button onClick={() => onEdit(player)} className="text-blue-400 hover:text-blue-300 transition-colors">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(player.id)} className="text-red-400 hover:text-red-300 transition-colors">
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {player.nationality && (
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin size={16} />
            <span className="text-sm">{player.nationality}</span>
          </div>
        )}

        {player.currentTeam && (
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar size={16} />
            <span className="text-sm">Current Team: {player.currentTeam}</span>
          </div>
        )}

        {player.marketValue && (
          <div className="flex items-center space-x-2 text-gray-300">
            <DollarSign size={16} />
            <span className="text-sm">Market Value: ${player.marketValue}</span>
          </div>
        )}
      </div>

      {player.bio && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-gray-300 text-sm">{player.bio}</p>
        </div>
      )}
    </div>
  )
}

export default PlayerCard
