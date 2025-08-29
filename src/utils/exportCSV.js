// CSV export utilities for the player transfer system

export const exportPlayersToCSV = (players) => {
  const headers = ["Name", "Age", "Position", "Nationality", "Current Team", "Market Value", "Height", "Weight"]

  const csvContent = [
    headers.join(","),
    ...players.map((player) =>
      [
        `"${player.name || ""}"`,
        player.age || "",
        `"${player.position || ""}"`,
        `"${player.nationality || ""}"`,
        `"${player.currentTeam || ""}"`,
        player.marketValue || "",
        player.height || "",
        player.weight || "",
      ].join(","),
    ),
  ].join("\n")

  downloadCSV(csvContent, "players.csv")
}

export const exportTeamsToCSV = (teams) => {
  const headers = ["Name", "League", "Country", "Founded", "Stadium", "Manager"]

  const csvContent = [
    headers.join(","),
    ...teams.map((team) =>
      [
        `"${team.name || ""}"`,
        `"${team.league || ""}"`,
        `"${team.country || ""}"`,
        team.founded || "",
        `"${team.stadium || ""}"`,
        `"${team.manager || ""}"`,
      ].join(","),
    ),
  ].join("\n")

  downloadCSV(csvContent, "teams.csv")
}

export const exportTransfersToCSV = (transfers) => {
  const headers = [
    "Player Name",
    "From Team",
    "To Team",
    "Transfer Fee",
    "Transfer Date",
    "Transfer Type",
    "Status",
    "Contract Length",
  ]

  const csvContent = [
    headers.join(","),
    ...transfers.map((transfer) =>
      [
        `"${transfer.playerName || ""}"`,
        `"${transfer.fromTeam || ""}"`,
        `"${transfer.toTeam || ""}"`,
        transfer.transferFee || "",
        transfer.transferDate?.toDate?.()?.toLocaleDateString() || "",
        `"${transfer.transferType || ""}"`,
        `"${transfer.status || ""}"`,
        transfer.contractLength || "",
      ].join(","),
    ),
  ].join("\n")

  downloadCSV(csvContent, "transfers.csv")
}

export const exportUsersToCSV = (users) => {
  const headers = ["Name", "Email", "Role", "Department", "Created Date"]

  const csvContent = [
    headers.join(","),
    ...users.map((user) =>
      [
        `"${user.name || ""}"`,
        `"${user.email || ""}"`,
        `"${user.role || ""}"`,
        `"${user.department || ""}"`,
        user.createdAt?.toDate?.()?.toLocaleDateString() || "",
      ].join(","),
    ),
  ].join("\n")

  downloadCSV(csvContent, "users.csv")
}

const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Generic CSV export function
export const exportToCSV = (data, headers, filename) => {
  if (!data || data.length === 0) {
    console.warn("No data to export")
    return
  }

  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
  ].join("\n")

  downloadCSV(csvContent, filename)
}
