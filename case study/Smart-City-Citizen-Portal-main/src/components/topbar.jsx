import { useState } from "react"

export default function Topbar({ user, onLogout }) {
  const [showLogout, setShowLogout] = useState(false)
  return (
    <div
      style={{
        padding: "18px 40px",
        borderBottom: "1.5px solid rgba(148,163,184,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        background:
          "linear-gradient(90deg, rgba(14,165,233,0.95), rgba(129,140,248,0.95), rgba(249,115,22,0.95))",
        backdropFilter: "blur(16px)",
        boxShadow: "0 10px 32px rgba(15, 23, 42, 0.15)",
        borderRadius: "0 0 24px 24px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "999px",
            background: "linear-gradient(135deg, #00e5ff, #00ff9d)",
            boxShadow: "0 0 28px rgba(0, 229, 255, 0.5)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 7,
              borderRadius: "999px",
              border: "1.5px solid rgba(15,23,42,0.4)",
              boxShadow: "0 0 16px rgba(15,23,42,0.6) inset"
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 15,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ffffff",
              fontWeight: 800
            }}
          >
            Urbanova Citizen Portal
          </div>
          <div style={{ fontSize: 13, color: "#e0f2fe", marginTop: 3, fontWeight: 500 }}>
            Smart City access for residents • services, mobility, safety
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 13
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            border: "1.5px solid rgba(15,23,42,0.06)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            minWidth: 260
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "999px",
              border: "2px solid #cbd5e1",
              boxSizing: "border-box",
              position: "relative"
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 3,
                borderRadius: "999px",
                border: "1px solid #e2e8f0",
                opacity: 0.7
              }}
            />
          </span>
          <input
            placeholder="Search services, permits, bills..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#0f172a",
              fontSize: 13,
              width: "100%",
              fontWeight: 500
            }}
          />
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(15,23,42,0.08)",
            background: "rgba(15,23,42,0.12)",
            backdropFilter: "blur(10px)",
            color: "#ffffff",
            gap: 8
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "999px",
              background: "#00ff9d",
              boxShadow: "0 0 12px rgba(0, 255, 157, 0.8)"
            }}
          />
          <span style={{ fontWeight: 700 }}>City status: Stable</span>
        </div>

        <div
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1.5px dashed rgba(248,250,252,0.7)",
            color: "#fefce8",
            background: "rgba(15, 23, 42, 0.2)",
            fontWeight: 600,
            fontSize: 12
          }}
        >
          <span style={{ fontWeight: 800 }}>Your city:</span> Urbanova • Resident
        </div>

        <div
          style={{
            position: "relative",
            display: "inline-flex"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #fbbf24, #fb7185)",
              backdropFilter: "blur(10px)",
              border: "1.5px solid rgba(251,191,36,0.8)",
              cursor: "pointer",
              boxShadow: "0 0 28px rgba(248, 250, 252, 0.4)",
              transition: "all 250ms ease"
            }}
            onClick={() => setShowLogout(!showLogout)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #22d3ee, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#0f172a"
              }}
            >
              {user?.id?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <div style={{ fontSize: 13, color: "#111827", fontWeight: 700 }}>{user?.name || "Resident"}</div>
              <div style={{ fontSize: 11, color: "#1f2937", fontWeight: 500 }}>ID: {user?.id}</div>
            </div>
            <span
              style={{
                marginLeft: 8,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#fff7ed"
              }}
            >
              ▼
            </span>
          </div>

          {/* Logout Dropdown */}
          {showLogout && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 8,
                background: "#ffffff",
                borderRadius: 16,
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 12px 40px rgba(15,23,42,0.2)",
                zIndex: 1000,
                overflow: "hidden",
                minWidth: 200
              }}
            >
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "rgba(14, 165, 233, 0.05)" }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Logged in as</p>
                <p style={{ margin: 0, marginTop: 4, fontSize: 13, fontWeight: 700, color: "#0ea5e9" }}>{user?.id}</p>
              </div>

              <button
                onClick={() => {
                  onLogout()
                  setShowLogout(false)
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ef4444",
                  textAlign: "left",
                  transition: "all 150ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
