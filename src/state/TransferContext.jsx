"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { transferService } from "../services/transferService"

const TransferContext = createContext()

export const useTransfer = () => {
  const context = useContext(TransferContext)
  if (!context) {
    throw new Error("useTransfer must be used within a TransferProvider")
  }
  return context
}

export const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTransfers = async () => {
    setLoading(true)
    try {
      const transfersData = await transferService.getAllTransfers()
      setTransfers(transfersData)
    } catch (error) {
      console.error("Error fetching transfers:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTransfer = async (transferData) => {
    try {
      const newTransfer = await transferService.createTransfer(transferData)
      setTransfers((prev) => [...prev, newTransfer])
      return newTransfer
    } catch (error) {
      console.error("Error adding transfer:", error)
      throw error
    }
  }

  const updateTransfer = async (transferId, transferData) => {
    try {
      const updatedTransfer = await transferService.updateTransfer(transferId, transferData)
      setTransfers((prev) => prev.map((transfer) => (transfer.id === transferId ? updatedTransfer : transfer)))
      return updatedTransfer
    } catch (error) {
      console.error("Error updating transfer:", error)
      throw error
    }
  }

  const deleteTransfer = async (transferId) => {
    try {
      await transferService.deleteTransfer(transferId)
      setTransfers((prev) => prev.filter((transfer) => transfer.id !== transferId))
    } catch (error) {
      console.error("Error deleting transfer:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchTransfers()
  }, [])

  const value = {
    transfers,
    loading,
    fetchTransfers,
    addTransfer,
    updateTransfer,
    deleteTransfer,
  }

  return <TransferContext.Provider value={value}>{children}</TransferContext.Provider>
}
