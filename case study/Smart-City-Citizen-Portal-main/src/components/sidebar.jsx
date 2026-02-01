import DashboardIcon from "@mui/icons-material/Dashboard"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import WarningIcon from "@mui/icons-material/Warning"
import AssessmentIcon from "@mui/icons-material/Assessment"
import MapIcon from "@mui/icons-material/Map"
import SettingsIcon from "@mui/icons-material/Settings"

const navItems = [
  { key: "dashboard", label: "Citizen Overview", icon: <DashboardIcon /> },
  { key: "analytics", label: "City Insights", icon: <AnalyticsIcon /> },
  { key: "alerts", label: "Alerts & Safety", icon: <WarningIcon /> },
  { key: "reports", label: "Bills & Usage", icon: <AssessmentIcon /> },
  { key: "operations", label: "Mobility & Maps", icon: <MapIcon /> },
  { key: "settings", label: "Profile & Settings", icon: <SettingsIcon /> }
]

export default function Sidebar({ activeView, onChangeView }) {
  return (
    <div
      style={{
        height: "100vh",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        borderRight: "1.5px solid rgba(148,163,184,0.2)",
        background:
          "linear-gradient(180deg, #e0f2fe, #e0f2fe 10%, #f5f3ff 55%, #fef3c7 100%)",
        backdropFilter: "blur(12px)"
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h5
          style={{
            color: "#8b5cf6",
            letterSpacing: "0.18em",
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 900,
            textTransform: "uppercase"
          }}
        >
          URBANOVA
        </h5>
        <p
          style={{
            fontSize: 12,
            color: "#64748b",
            marginBottom: 0,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600
          }}
        >
          Citizen Portal
        </p>
      </div>

      {/* City ID block */}
      <div
        style={{
          padding: "20px 22px",
          borderRadius: 20,
          border: "1.5px solid rgba(148,163,184,0.25)",
          background:
            "radial-gradient(circle at 0 0, rgba(56,189,248,0.2), transparent 60%), radial-gradient(circle at 100% 100%, rgba(251,191,36,0.25), transparent 60%), #ffffff",
          boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
          marginBottom: 20,
          fontSize: 11
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#94a3b8", letterSpacing: "0.08em", fontWeight: 700 }}>CITY ID</span>
          <span style={{ color: "#0ea5e9", fontWeight: 800, fontSize: 13 }}>UBN-2049</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>Portal Status</span>
          <span style={{ color: "#16a34a", fontWeight: 700 }}>Live • 24/7</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>Your Zone</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Central District</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>Last update</span>
          <span style={{ color: "#0ea5e9", fontWeight: 600 }}>Just now</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>Access type</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "999px",
                background: "#22c55e",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)"
              }}
            />
            <span style={{ color: "#0f172a", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
              Citizen
            </span>
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 24,
          borderTop: "1.5px solid rgba(148,163,184,0.2)"
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#94a3b8",
            marginBottom: 16,
            fontWeight: 700
          }}
        >
          Portal Views
        </div>
        {navItems.map(item => {
          const isActive = activeView === item.key
          return (
            <button
              key={item.key}
              onClick={() => onChangeView?.(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "12px 14px",
                marginBottom: 8,
                borderRadius: 999,
                border: isActive ? "1.5px solid rgba(14, 165, 233, 0.6)" : "1px solid transparent",
                cursor: "pointer",
                fontSize: 14,
                textAlign: "left",
                background: isActive
                  ? "linear-gradient(90deg, rgba(14,165,233,0.12), rgba(139,92,246,0.12))"
                  : "transparent",
                color: isActive ? "#0f172a" : "#64748b",
                fontWeight: isActive ? 700 : 500,
                boxShadow: isActive ? "0 0 0 1px rgba(56,189,248,0.4)" : "none",
                transition: "all 200ms ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)"
                  e.currentTarget.style.color = "#0f172a"
                  e.currentTarget.style.border = "1px solid rgba(148,163,184,0.3)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#64748b"
                  e.currentTarget.style.border = "1px solid transparent"
                }
              }}
            >
              <span style={{ display: "flex", alignItems: "center", fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
            </button>
          )
        })}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 24, fontSize: 11 }}>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 18,
            border: "1.5px dashed rgba(129,140,248,0.6)",
            background:
              "radial-gradient(circle at 100% 0, rgba(244,114,182,0.2), transparent 60%), #ffffff",
            boxShadow: "0 8px 24px rgba(129,140,248,0.15)",
            color: "#4b5563",
            marginBottom: 12
          }}
        >
          <div style={{ marginBottom: 6, fontSize: 12, color: "#1f2937", fontWeight: 700 }}>Need help quickly?</div>
          <div style={{ fontSize: 11, lineHeight: 1.6, color: "#64748b" }}>
            Start a service request, report an issue, or track applications.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#94a3b8",
            paddingTop: 12,
            borderTop: "1px solid rgba(148,163,184,0.15)"
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 600 }}>Urbanova v0.1</span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "999px",
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)"
            }}
          />
        </div>
      </div>
    </div>
  )
}
