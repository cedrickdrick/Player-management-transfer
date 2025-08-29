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

const COLLECTION_NAME = "transfers"

export const transferService = {
  // Get all transfers
  getAllTransfers: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("transferDate", "desc"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting transfers:", error)
      throw error
    }
  },

  // Get transfer by ID
  getTransferById: async (transferId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, transferId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("Transfer not found")
      }
    } catch (error) {
      console.error("Error getting transfer:", error)
      throw error
    }
  },

  // Create new transfer
  createTransfer: async (transferData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...transferData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return { id: docRef.id, ...transferData }
    } catch (error) {
      console.error("Error creating transfer:", error)
      throw error
    }
  },

  // Update transfer
  updateTransfer: async (transferId, transferData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, transferId)
      await updateDoc(docRef, {
        ...transferData,
        updatedAt: new Date(),
      })

      return { id: transferId, ...transferData }
    } catch (error) {
      console.error("Error updating transfer:", error)
      throw error
    }
  },

  // Delete transfer
  deleteTransfer: async (transferId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, transferId))
    } catch (error) {
      console.error("Error deleting transfer:", error)
      throw error
    }
  },

  // Get transfers by player
  getTransfersByPlayer: async (playerId) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("playerId", "==", playerId),
        orderBy("transferDate", "desc"),
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting transfers by player:", error)
      throw error
    }
  },
}
