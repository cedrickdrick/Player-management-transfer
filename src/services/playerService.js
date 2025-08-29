import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION_NAME = "players"

export const playerService = {
  // Get all players
  getAllPlayers: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("name"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting players:", error)
      throw error
    }
  },

  // Get player by ID
  getPlayerById: async (playerId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, playerId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("Player not found")
      }
    } catch (error) {
      console.error("Error getting player:", error)
      throw error
    }
  },

  // Create new player
  createPlayer: async (playerData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...playerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return { id: docRef.id, ...playerData }
    } catch (error) {
      console.error("Error creating player:", error)
      throw error
    }
  },

  // Update player
  updatePlayer: async (playerId, playerData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, playerId)
      await updateDoc(docRef, {
        ...playerData,
        updatedAt: new Date(),
      })

      return { id: playerId, ...playerData }
    } catch (error) {
      console.error("Error updating player:", error)
      throw error
    }
  },

  // Delete player
  deletePlayer: async (playerId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, playerId))
    } catch (error) {
      console.error("Error deleting player:", error)
      throw error
    }
  },

  // Get players by team
  getPlayersByTeam: async (teamId) => {
    try {
      const q = query(collection(db, COLLECTION_NAME), where("currentTeam", "==", teamId), orderBy("name"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting players by team:", error)
      throw error
    }
  },
}
