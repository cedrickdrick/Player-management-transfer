import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION_NAME = "teams"

export const teamService = {
  // Get all teams
  getAllTeams: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("name"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting teams:", error)
      throw error
    }
  },

  // Get team by ID
  getTeamById: async (teamId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, teamId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("Team not found")
      }
    } catch (error) {
      console.error("Error getting team:", error)
      throw error
    }
  },

  // Create new team
  createTeam: async (teamData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...teamData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return { id: docRef.id, ...teamData }
    } catch (error) {
      console.error("Error creating team:", error)
      throw error
    }
  },

  // Update team
  updateTeam: async (teamId, teamData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, teamId)
      await updateDoc(docRef, {
        ...teamData,
        updatedAt: new Date(),
      })

      return { id: teamId, ...teamData }
    } catch (error) {
      console.error("Error updating team:", error)
      throw error
    }
  },

  // Delete team
  deleteTeam: async (teamId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, teamId))
    } catch (error) {
      console.error("Error deleting team:", error)
      throw error
    }
  },
}
