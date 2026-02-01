import { Card, CardContent, Typography, Chip } from "@mui/material"

const alerts = [
  {
    level: "Critical",
    text: "Emergency road closure near Central Square",
    color: "#ff3366",
    time: "2 min ago",
    isPrediction: false
  },
  {
    level: "Warning",
    text: "Heavy traffic expected on Ring Road from 6–8 PM",
    color: "#ffb800",
    time: "12 min ago",
    isPrediction: true
  },
  {
    level: "Info",
    text: "Your water usage is within the normal range",
    color: "#00e5ff",
    time: "1h ago",
    isPrediction: false
  },
  {
    level: "Prediction",
    text: "Energy demand forecast: +18% in your area by 8 PM",
    color: "#00ff9d",
    time: "Just now",
    isPrediction: true
  }
]

export default function AlertsPanel() {
  return (
    <Card
      sx={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
        borderRadius: 3,
        height: "100%",
        minHeight: 400
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Typography sx={{ color: "#0f172a", fontSize: 16, fontWeight: 600 }}>
            Notifications & alerts
          </Typography>
          <span style={{ fontSize: 11, color: "#6b7280" }}>4 active</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {alerts.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                border: a.isPrediction
                  ? `1px solid ${a.color}`
                  : "1px solid rgba(226,232,240,0.9)",
                background: a.isPrediction
                  ? `${a.color}12`
                  : "rgba(248, 250, 252, 0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: a.isPrediction
                  ? `0 0 20px ${a.color}40`
                  : "0 8px 24px rgba(15,23,42,0.08)",
                transition: "all 200ms ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)"
                e.currentTarget.style.boxShadow = a.isPrediction
                  ? `0 0 30px ${a.color}60`
                  : "0 4px 16px rgba(0, 0, 0, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)"
                e.currentTarget.style.boxShadow = a.isPrediction
                  ? `0 0 20px ${a.color}40`
                  : "none"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: "#0f172a",
                      marginBottom: 4,
                      fontWeight: a.isPrediction ? 600 : 500
                    }}
                  >
                    {a.text}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#6b7280" }}>
                    {a.time}
                  </Typography>
                </div>
                <Chip
                  label={a.level}
                  sx={{
                    background: a.color,
                    color: "#0a0e1a",
                    fontWeight: 600,
                    fontSize: 10,
                    height: 24,
                    boxShadow: a.isPrediction ? `0 0 15px ${a.color}80` : "none"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
