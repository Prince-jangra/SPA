import { useState } from "react"

export default function Login({ onLoginSuccess }) {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate backend validation (you can replace this with actual API call)
    setTimeout(() => {
      if (id.trim() === "" || password.trim() === "") {
        setError("Please enter both ID and password")
        setLoading(false)
        return
      }

      if (password.length < 4) {
        setError("Password must be at least 4 characters")
        setLoading(false)
        return
      }

      // Mock validation - in real app, validate against backend
      if (id && password) {
        // Save to sessionStorage for basic persistence
        sessionStorage.setItem("urbanovaUser", JSON.stringify({ id, name: id }))
        onLoginSuccess({ id, name: id })
      } else {
        setError("Invalid credentials")
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.25), transparent 55%), radial-gradient(circle at 100% 0%, rgba(244, 114, 182, 0.2), transparent 55%), radial-gradient(circle at 0% 100%, rgba(52, 211, 153, 0.2), transparent 55%), radial-gradient(circle at 100% 100%, rgba(250, 204, 21, 0.18), transparent 55%), #fafbfc"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "0 20px"
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 32,
            padding: "48px 40px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 20px 60px rgba(15,23,42,0.12)"
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "999px",
                background: "linear-gradient(135deg, #00e5ff, #00ff9d)",
                boxShadow: "0 0 32px rgba(0, 229, 255, 0.4)",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
                color: "#0a0e1a"
              }}
            >
              🏙️
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              Urbanova
            </h1>
            <p style={{ margin: 0, marginTop: 8, fontSize: 14, color: "#64748b", fontWeight: 500 }}>
              Citizen Portal Login
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ marginBottom: 20 }}>
            {/* ID Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Citizen ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter your citizen ID"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0f172a",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0ea5e9"
                  e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0f172a",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0ea5e9"
                  e.target.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  marginBottom: 20,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#dc2626",
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 999,
                border: "none",
                background: loading
                  ? "rgba(14, 165, 233, 0.5)"
                  : "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 16px rgba(14, 165, 233, 0.3)",
                transition: "all 250ms ease",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = "0 8px 28px rgba(14, 165, 233, 0.5)"
                  e.target.style.transform = "translateY(-2px)"
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = "0 4px 16px rgba(14, 165, 233, 0.3)"
                  e.target.style.transform = "translateY(0)"
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
            Urbanova Smart City Portal v1.0
          </p>
        </div>
      </div>
    </div>
  )
}
