import { useState, useEffect } from "react"

// Centralizes the localStorage token logic so Admin.jsx does not repeat it
// checks on mount whether a saved token still exists and has not expired past 3 hours
const useAdminAuth = () => {
  const [token, setToken] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token")
    const savedExpiry = localStorage.getItem("admin_token_expiry")

    // If a token exists and its stored expiry timestamp is still in the future, restore the session
    if (savedToken && savedExpiry && Date.now() < Number(savedExpiry)) {
      setToken(savedToken)
    } else {
      // Clears anything stale so an expired token never lingers in storage
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_token_expiry")
    }
    setChecked(true)
  }, [])

  // Called after a successful login, stores the token plus a plain timestamp 3 hours from now
  // storing our own expiry timestamp lets the frontend check validity without decoding the jwt itself
  const login = (newToken) => {
    const expiry = Date.now() + 3 * 60 * 60 * 1000
    localStorage.setItem("admin_token", newToken)
    localStorage.setItem("admin_token_expiry", String(expiry))
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_token_expiry")
    setToken(null)
  }

  return { token, checked, login, logout }
}

export default useAdminAuth