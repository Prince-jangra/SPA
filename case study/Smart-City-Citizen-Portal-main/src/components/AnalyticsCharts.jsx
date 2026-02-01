import { Card, CardContent, Typography } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const pollution = [
  { day: "Mon", value: 62, prediction: null },
  { day: "Tue", value: 68, prediction: null },
  { day: "Wed", value: 71, prediction: null },
  { day: "Thu", value: 66, prediction: null },
  { day: "Fri", value: 74, prediction: null },
  { day: "Sat", value: 70, prediction: null },
  { day: "Sun", value: 65, prediction: null },
  { day: "Mon", value: null, prediction: 72 },
  { day: "Tue", value: null, prediction: 75 },
  { day: "Wed", value: null, prediction: 78 }
]

export default function AnalyticsCharts() {
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
            City well‑being trend
          </Typography>
          <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5ff" }} />
              <span style={{ color: "#9ca3af" }}>Past week</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#00ff9d",
                  boxShadow: "0 0 8px rgba(0, 255, 157, 0.8)"
                }}
              />
            <span style={{ color: "#9ca3af" }}>Upcoming</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={pollution}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              style={{ fontSize: 11 }}
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: 11 }}
              tick={{ fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#e5e7eb"
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00e5ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            <Area
              type="monotone"
              dataKey="prediction"
              stroke="#00ff9d"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorPrediction)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
