"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../state/AuthContext"

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />
  }

  return children
}

export default RoleBasedRoute
