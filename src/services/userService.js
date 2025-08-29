import { collection, doc, getDocs, getDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "./firebase"

const COLLECTION_NAME = "users"

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("name"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting users:", error)
      throw error
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      console.error("Error getting user:", error)
      throw error
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, userId)
      await updateDoc(docRef, {
        ...userData,
        updatedAt: new Date(),
      })

      return { id: userId, ...userData }
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, userId)
      await updateDoc(docRef, {
        role,
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error("Error updating user role:", error)
      throw error
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, userId))
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  },
}
