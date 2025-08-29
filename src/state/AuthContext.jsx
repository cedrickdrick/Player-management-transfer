"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../services/firebase"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    await fetchUserRole(result.user.uid)
    return result
  }

  const register = async (email, password, userData) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Create user document in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      email,
      role: userData.role || "user",
      name: userData.name || "",
      createdAt: new Date(),
      ...userData,
    })

    await fetchUserRole(result.user.uid)
    return result
  }

  const logout = () => {
    setUserRole(null)
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid))
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role || "user")
      }
    } catch (error) {
      console.error("Error fetching user role:", error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        await fetchUserRole(user.uid)
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userRole,
    login,
    register,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
