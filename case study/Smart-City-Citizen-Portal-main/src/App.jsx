import { useState, useEffect } from "react"
import Dashboard from "./pages/dashboard"
import Login from "./components/Login"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is already logged in (from sessionStorage)
  useEffect(() => {
    const savedUser = sessionStorage.getItem("urbanovaUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("urbanovaUser")
    setUser(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="app-shell">
      <Dashboard user={user} onLogout={handleLogout} />
    </div>
  )
}
