import { usePlayer } from "../state/PlayerContext"
import { useTeam } from "../state/TeamContext"
import { useTransfer } from "../state/TransferContext"
import { Users, UserCheck, BarChart3, TrendingUp } from "lucide-react"

const Dashboard = () => {
  const { players } = usePlayer()
  const { teams } = useTeam()
  const { transfers } = useTransfer()

  const stats = [
    {
      title: "Total Players",
      value: players.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Teams",
      value: teams.length,
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      title: "Total Transfers",
      value: transfers.length,
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      title: "Recent Transfers",
      value: transfers.filter((t) => {
        const transferDate = new Date(t.transferDate?.seconds * 1000)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        return transferDate > thirtyDaysAgo
      }).length,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Player Transfer System Dashboard</h1>
        <p className="text-gray-200">Manage players, teams, and transfers efficiently</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card glass-effect">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Players */}
        <div className="card glass-effect">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Players</h3>
          <div className="space-y-3">
            {players.slice(0, 5).map((player) => (
              <div key={player.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{player.name?.charAt(0) || "P"}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{player.name}</p>
                  <p className="text-gray-300 text-sm">{player.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transfers */}
        <div className="card glass-effect">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transfers</h3>
          <div className="space-y-3">
            {transfers.slice(0, 5).map((transfer) => (
              <div key={transfer.id} className="border-l-4 border-orange-500 pl-3">
                <p className="text-white font-medium">{transfer.playerName || "Player"}</p>
                <p className="text-gray-300 text-sm">
                  {transfer.fromTeam} → {transfer.toTeam}
                </p>
                <p className="text-gray-400 text-xs">
                  {transfer.transferFee ? `$${transfer.transferFee}` : "Free transfer"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
