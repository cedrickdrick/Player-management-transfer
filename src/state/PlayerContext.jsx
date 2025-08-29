"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { playerService } from "../services/playerService"

const PlayerContext = createContext()

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const playersData = await playerService.getAllPlayers()
      setPlayers(playersData)
    } catch (error) {
      console.error("Error fetching players:", error)
    } finally {
      setLoading(false)
    }
  }

  const addPlayer = async (playerData) => {
    try {
      const newPlayer = await playerService.createPlayer(playerData)
      setPlayers((prev) => [...prev, newPlayer])
      return newPlayer
    } catch (error) {
      console.error("Error adding player:", error)
      throw error
    }
  }

  const updatePlayer = async (playerId, playerData) => {
    try {
      const updatedPlayer = await playerService.updatePlayer(playerId, playerData)
      setPlayers((prev) => prev.map((player) => (player.id === playerId ? updatedPlayer : player)))
      return updatedPlayer
    } catch (error) {
      console.error("Error updating player:", error)
      throw error
    }
  }

  const deletePlayer = async (playerId) => {
    try {
      await playerService.deletePlayer(playerId)
      setPlayers((prev) => prev.filter((player) => player.id !== playerId))
    } catch (error) {
      console.error("Error deleting player:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const value = {
    players,
    loading,
    fetchPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
