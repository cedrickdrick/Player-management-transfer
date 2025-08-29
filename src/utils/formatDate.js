// Date formatting utilities for the player transfer system

export const formatDate = (date, options = {}) => {
  if (!date) return "N/A"

  const dateObj = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date)

  if (isNaN(dateObj.getTime())) return "Invalid Date"

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return dateObj.toLocaleDateString("en-US", { ...defaultOptions, ...options })
}

export const formatDateTime = (date, options = {}) => {
  if (!date) return "N/A"

  const dateObj = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date)

  if (isNaN(dateObj.getTime())) return "Invalid Date"

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return dateObj.toLocaleDateString("en-US", { ...defaultOptions, ...options })
}

export const formatRelativeTime = (date) => {
  if (!date) return "N/A"

  const dateObj = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date)

  if (isNaN(dateObj.getTime())) return "Invalid Date"

  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`
}

export const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false

  const dateObj = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date)
  const startObj = startDate instanceof Date ? startDate : new Date(startDate)
  const endObj = endDate instanceof Date ? endDate : new Date(endDate)

  return dateObj >= startObj && dateObj <= endObj
}

export const getDateRangeString = (startDate, endDate) => {
  if (!startDate || !endDate) return "N/A"

  const start = formatDate(startDate)
  const end = formatDate(endDate)

  return `${start} - ${end}`
}

export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const subtractDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false

  const d1 = date1 instanceof Date ? date1 : date1.toDate ? date1.toDate() : new Date(date1)
  const d2 = date2 instanceof Date ? date2 : date2.toDate ? date2.toDate() : new Date(date2)

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export const getAge = (birthDate) => {
  if (!birthDate) return null

  const birth = birthDate instanceof Date ? birthDate : new Date(birthDate)
  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}
