"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { teamService } from "../services/teamService"

const TeamContext = createContext()

export const useTeam = () => {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTeams = async () => {
    setLoading(true)
    try {
      const teamsData = await teamService.getAllTeams()
      setTeams(teamsData)
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTeam = async (teamData) => {
    try {
      const newTeam = await teamService.createTeam(teamData)
      setTeams((prev) => [...prev, newTeam])
      return newTeam
    } catch (error) {
      console.error("Error adding team:", error)
      throw error
    }
  }

  const updateTeam = async (teamId, teamData) => {
    try {
      const updatedTeam = await teamService.updateTeam(teamId, teamData)
      setTeams((prev) => prev.map((team) => (team.id === teamId ? updatedTeam : team)))
      return updatedTeam
    } catch (error) {
      console.error("Error updating team:", error)
      throw error
    }
  }

  const deleteTeam = async (teamId) => {
    try {
      await teamService.deleteTeam(teamId)
      setTeams((prev) => prev.filter((team) => team.id !== teamId))
    } catch (error) {
      console.error("Error deleting team:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const value = {
    teams,
    loading,
    fetchTeams,
    addTeam,
    updateTeam,
    deleteTeam,
  }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}
