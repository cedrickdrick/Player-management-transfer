// Validation utilities for the player transfer system

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6
}

export const validatePlayerData = (playerData) => {
  const errors = {}

  if (!playerData.name || playerData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  if (!playerData.age || playerData.age < 16 || playerData.age > 45) {
    errors.age = "Age must be between 16 and 45"
  }

  if (!playerData.position) {
    errors.position = "Position is required"
  }

  if (!playerData.nationality || playerData.nationality.trim().length < 2) {
    errors.nationality = "Nationality is required"
  }

  if (playerData.marketValue && playerData.marketValue < 0) {
    errors.marketValue = "Market value cannot be negative"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateTeamData = (teamData) => {
  const errors = {}

  if (!teamData.name || teamData.name.trim().length < 2) {
    errors.name = "Team name must be at least 2 characters long"
  }

  if (!teamData.league || teamData.league.trim().length < 2) {
    errors.league = "League is required"
  }

  if (!teamData.country || teamData.country.trim().length < 2) {
    errors.country = "Country is required"
  }

  if (teamData.founded && (teamData.founded < 1800 || teamData.founded > new Date().getFullYear())) {
    errors.founded = "Founded year must be between 1800 and current year"
  }

  if (teamData.website && !isValidUrl(teamData.website)) {
    errors.website = "Please enter a valid URL"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateTransferData = (transferData) => {
  const errors = {}

  if (!transferData.playerId) {
    errors.playerId = "Player is required"
  }

  if (!transferData.fromTeam) {
    errors.fromTeam = "From team is required"
  }

  if (!transferData.toTeam) {
    errors.toTeam = "To team is required"
  }

  if (transferData.fromTeam === transferData.toTeam) {
    errors.toTeam = "From team and to team cannot be the same"
  }

  if (!transferData.transferDate) {
    errors.transferDate = "Transfer date is required"
  }

  if (transferData.transferFee && transferData.transferFee < 0) {
    errors.transferFee = "Transfer fee cannot be negative"
  }

  if (transferData.contractLength && (transferData.contractLength < 0.5 || transferData.contractLength > 10)) {
    errors.contractLength = "Contract length must be between 0.5 and 10 years"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export const validateUserData = (userData) => {
  const errors = {}

  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long"
  }

  if (!userData.email || !validateEmail(userData.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!userData.role) {
    errors.role = "Role is required"
  }

  if (userData.phone && !isValidPhoneNumber(userData.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
}
