import { useState } from "react"
import Sidebar from "../components/sidebar"
import Topbar from "../components/topbar"
import StatCard from "../components/statcard"
import AnalyticsCharts from "../components/AnalyticsCharts"
import AlertsPanel from "../components/AlertsPanel"
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts"

import { Container, Row, Col } from "react-bootstrap"

export default function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState("dashboard")
  const [timeframe, setTimeframe] = useState("24h")
  const [selectedChart, setSelectedChart] = useState(null)
  const [selectedAlert, setSelectedAlert] = useState(null)

  const viewMeta = {
    dashboard: {
      title: "Citizen overview",
      subtitle: "See your services, requests, bills and city status in one clear view."
    },
    analytics: {
      title: "City insights",
      subtitle: "Understand how Urbanova is performing across mobility, environment and utilities."
    },
    alerts: {
      title: "Alerts & safety",
      subtitle: "Stay on top of urgent city notifications, safety advisories and local disruptions."
    },
    reports: {
      title: "Bills & usage",
      subtitle: "Track household consumption, download statements and manage your payments."
    },
    operations: {
      title: "Mobility & maps",
      subtitle: "Check real‑time traffic, public transport status and wayfinding across the city."
    },
    settings: {
      title: "Profile & settings",
      subtitle: "Manage your profile, notification preferences and connected households."
    }
  }

  const renderMainContent = () => {
    if (activeView === "analytics") {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>📊 City Insights</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Real-time analytics across all city departments</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            <StatCard title="Sensor Coverage" value="94%" color="#00e5ff" />
            <StatCard title="Data Streams" value="312" color="#ffb800" />
            <StatCard title="Anomaly Rate" value="1.2%" color="#ff3366" isPrediction={true} />
            <StatCard title="Model Health" value="Stable" color="#00ff9d" />
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>📈 Key Metrics Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { day: "Mon", value: 45 },
                { day: "Tue", value: 52 },
                { day: "Wed", value: 48 },
                { day: "Thu", value: 61 },
                { day: "Fri", value: 55 },
                { day: "Sat", value: 67 },
                { day: "Sun", value: 72 }
              ]}>
                <defs>
                  <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                <YAxis stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#e5e7eb" }} />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#analyticsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )
    }

    if (activeView === "alerts") {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>🚨 Alerts & Safety</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Active incidents and safety notifications</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <StatCard title="Open Incidents" value="7" color="#ff3366" />
            <StatCard title="Avg. Response Time" value="4m 12s" color="#ffb800" />
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Recent Safety Alerts</p>
            {[
              { icon: "🔴", title: "Traffic Accident - Main St", status: "Active", time: "5 min ago", severity: "High" },
              { icon: "⚠️", title: "Power Outage - North Zone", status: "Being Handled", time: "18 min ago", severity: "Medium" },
              { icon: "🌊", title: "Flash Flood Warning", status: "Cleared", time: "2 h ago", severity: "Critical" }
            ].map((alert, idx) => (
              <div key={idx} style={{ padding: "16px", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>{alert.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{alert.title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748b", marginTop: 4 }}>{alert.status} • {alert.time}</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: alert.severity === "High" ? "rgba(239, 68, 68, 0.1)" : alert.severity === "Critical" ? "rgba(239, 68, 68, 0.15)" : "rgba(255, 184, 0, 0.1)", color: alert.severity === "High" ? "#dc2626" : alert.severity === "Critical" ? "#b91c1c" : "#d97706" }}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </>
      )
    }

    if (activeView === "reports") {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>💳 Bills & Usage</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Track consumption and manage payments</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <StatCard title="Current Month Bill" value="₹ 4,820" color="#ffb800" />
            <StatCard title="Usage vs. Avg" value="8% Higher" color="#ff3366" />
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)", marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Usage Breakdown</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={[
                { week: "Week 1", usage: 340 },
                { week: "Week 2", usage: 380 },
                { week: "Week 3", usage: 350 },
                { week: "Week 4", usage: 420 }
              ]}>
                <defs>
                  <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffb800" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffb800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                <YAxis stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#e5e7eb" }} />
                <Area type="monotone" dataKey="usage" stroke="#ffb800" strokeWidth={3} fillOpacity={1} fill="url(#usageGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Payment History</p>
            {[
              { month: "January 2026", amount: "₹ 4,820", status: "Paid", date: "2 days ago" },
              { month: "December 2025", amount: "₹ 4,450", status: "Paid", date: "1 month ago" },
              { month: "November 2025", amount: "₹ 4,920", status: "Paid", date: "2 months ago" }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: "12px 0", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.month}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748b", marginTop: 2 }}>{item.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.amount}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(34, 197, 94, 0.1)", color: "#16a34a" }}>✓ {item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    }

    if (activeView === "operations") {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>🗺️ Mobility & Maps</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Real-time traffic and transportation network</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            <StatCard title="Active Routes" value="247" color="#00e5ff" />
            <StatCard title="Avg. Speed" value="32 km/h" color="#00ff9d" />
            <StatCard title="Congestion" value="Moderate" color="#ffb800" />
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)", marginBottom: 20, height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", color: "#94a3b8" }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>🗺️</p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Interactive Map View</p>
              <p style={{ margin: 0, marginTop: 6, fontSize: 12, color: "#cbd5e1" }}>Real-time traffic overlay and route planning</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Top Routes</p>
              {[
                { name: "Central Ave - Main St", status: "Moderate", emoji: "🟡" },
                { name: "Highway 5 North", status: "Heavy", emoji: "🔴" },
                { name: "Downtown Loop", status: "Free", emoji: "🟢" }
              ].map((route, idx) => (
                <div key={idx} style={{ padding: "10px 0", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{route.name}</p>
                  <span style={{ fontSize: 16 }}>{route.emoji}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Transit Status</p>
              {[
                { line: "Metro Line 1", schedule: "On Time", emoji: "✅" },
                { line: "Bus Route 42", schedule: "+4 min", emoji: "⏱️" },
                { line: "Tram Network", schedule: "Normal", emoji: "✅" }
              ].map((transit, idx) => (
                <div key={idx} style={{ padding: "10px 0", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{transit.line}</p>
                  <span style={{ fontSize: 14 }}>{transit.emoji} {transit.schedule}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    }

    if (activeView === "settings") {
      return (
        <>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>⚙️ Profile & Settings</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Manage your account and preferences</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <StatCard title="Notification Rules" value="12 Active" color="#00e5ff" />
            <StatCard title="Data Sources" value="18 Connected" color="#00ff9d" />
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)", marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Profile Information</p>
            {[
              { label: "Citizen ID", value: "UBN-2049", icon: "🆔" },
              { label: "Zone", value: "Central District", icon: "📍" },
              { label: "Account Type", value: "Residential", icon: "🏠" },
              { label: "Member Since", value: "Jan 2024", icon: "📅" }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: "14px 0", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#64748b" }}>{item.label}</p>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#ffffff", borderRadius: 18, padding: "20px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)", marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Notification Preferences</p>
            {[
              { name: "Traffic Alerts", enabled: true },
              { name: "Safety Notifications", enabled: true },
              { name: "Bill Reminders", enabled: false },
              { name: "Service Updates", enabled: true }
            ].map((pref, idx) => (
              <div key={idx} style={{ padding: "12px 0", borderTop: idx > 0 ? "1px solid #e2e8f0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{pref.name}</p>
                <button style={{ padding: "6px 12px", borderRadius: 999, border: "none", background: pref.enabled ? "rgba(34, 197, 94, 0.1)" : "rgba(149, 165, 166, 0.1)", color: pref.enabled ? "#16a34a" : "#6b7280", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {pref.enabled ? "✓ On" : "Off"}
                </button>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)" }}>
            🚪 Logout
          </button>
        </>
      )
    }

    // Compact single-page dashboard with smart modals
    const compactChartHeight = 100
    const compactWidth = "calc(33.33% - 11px)"

    return (
      <>
        {/* Hero Bar - Compact */}
        <div style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(139,92,246,0.08))", borderRadius: 20, padding: "18px 24px", border: "1.5px solid #e2e8f0", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 24, color: "#0f172a", fontWeight: 800 }}>Your smart city, one portal</h3>
            <p style={{ margin: 0, marginTop: 4, fontSize: 12, color: "#64748b" }}>12/12 services operational • All systems live</p>
          </div>
          <button style={{ padding: "10px 24px", borderRadius: 999, border: "none", background: "linear-gradient(135deg, #00e5ff, #00ff9d)", color: "#0a0e1a", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(0, 229, 255, 0.3)", transition: "all 200ms ease" }} onMouseEnter={(e) => { e.target.style.boxShadow = "0 6px 24px rgba(0, 229, 255, 0.45)"; e.target.style.transform = "scale(1.05)" }} onMouseLeave={(e) => { e.target.style.boxShadow = "0 4px 16px rgba(0, 229, 255, 0.3)"; e.target.style.transform = "scale(1)" }}>+ New Request</button>
        </div>

        {/* Key Metrics - 4 Cards Horizontal */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard title="Open requests" value="3" color="#00e5ff" />
          <StatCard title="Bills this month" value="₹ 4,820" color="#00ff9d" />
          <StatCard title="Energy usage" value="−12%" color="#ffb800" isPrediction={true} />
          <StatCard title="Alerts" value="2" color="#ff3366" />
        </div>

        {/* Three Mini Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {/* Mobility Score Chart */}
          <div
            onClick={() => setSelectedChart("mobility")}
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: "16px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              cursor: "pointer",
              transition: "all 200ms ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.15)"
              e.currentTarget.style.borderColor = "#00e5ff"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)"
              e.currentTarget.style.borderColor = "#e2e8f0"
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>📊 Mobility Score</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: compactChartHeight, marginBottom: 8 }}>
              {[40, 65, 52, 78, 85, 72, 88].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, #00e5ff, #00ff9d)`, borderRadius: 2, opacity: 0.7 + i * 0.04 }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#00ff9d" }}>8.6/10 ↑ 12%</p>
          </div>

          {/* Air Quality Chart */}
          <div
            onClick={() => setSelectedChart("airquality")}
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: "16px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              cursor: "pointer",
              transition: "all 200ms ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.15)"
              e.currentTarget.style.borderColor = "#0ea5e9"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)"
              e.currentTarget.style.borderColor = "#e2e8f0"
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>💨 Air Quality</p>
            <div style={{ textAlign: "center", height: compactChartHeight, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#0ea5e9" }}>72</div>
              <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginTop: 4 }}>Moderate</div>
            </div>
            <div style={{ height: 4, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
              <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, #00e5ff, #fbbf24)" }} />
            </div>
          </div>

          {/* Traffic Status Chart */}
          <div
            onClick={() => setSelectedChart("traffic")}
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: "16px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              cursor: "pointer",
              transition: "all 200ms ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.15)"
              e.currentTarget.style.borderColor = "#ffb800"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)"
              e.currentTarget.style.borderColor = "#e2e8f0"
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>🚗 Traffic Flow</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, height: compactChartHeight, alignItems: "flex-end" }}>
              {[65, 72, 58, 84, 71, 79, 68].map((val, i) => (
                <div key={i} style={{ background: `rgba(255, 184, 0, ${val / 100})`, borderRadius: 2, height: `${val}%`, cursor: "pointer" }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#ffb800", marginTop: 8 }}>Average: 72%</p>
          </div>
        </div>

        {/* Analytics Chart - Compact */}
        <div
          onClick={() => setSelectedChart("analytics")}
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: "16px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            marginBottom: 20,
            cursor: "pointer",
            transition: "all 200ms ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.15)"
            e.currentTarget.style.borderColor = "#8b5cf6"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)"
            e.currentTarget.style.borderColor = "#e2e8f0"
          }}
        >
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>📈 City Trends (7 days)</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={[
              { day: "Mon", value: 62 },
              { day: "Tue", value: 68 },
              { day: "Wed", value: 71 },
              { day: "Thu", value: 66 },
              { day: "Fri", value: 74 },
              { day: "Sat", value: 70 },
              { day: "Sun", value: 75 }
            ]}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#d1d5db" style={{ fontSize: 10 }} tick={{ fill: "#9ca3af" }} />
              <YAxis stroke="#d1d5db" style={{ fontSize: 10 }} tick={{ fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e5e7eb", fontSize: 11 }} />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Row: Alerts + Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 20 }}>
          {/* Alerts - Compact List */}
          <div style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.04))", borderRadius: 18, padding: "18px", border: "1.5px solid rgba(239, 68, 68, 0.3)", boxShadow: "0 8px 24px rgba(239,68,68,0.08)" }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#dc2626", marginBottom: 14 }}>🚨 Active Alerts (2)</p>
            {[
              { emoji: "🔴", title: "High traffic - Downtown", type: "Traffic", time: "2 min ago" },
              { emoji: "⚠️", title: "Air quality spike - North", type: "Environment", time: "15 min ago" }
            ].map((alert, i) => (
              <div
                key={i}
                onClick={() => setSelectedAlert(alert)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: i === 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(255, 184, 0, 0.1)",
                  border: i === 0 ? "1.5px solid rgba(239, 68, 68, 0.4)" : "1.5px solid rgba(255, 184, 0, 0.4)",
                  marginBottom: i === 0 ? 10 : 0,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.1)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none" }}
              >
                <span style={{ fontSize: 18 }}>{alert.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{alert.title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{alert.type} • {alert.time}</p>
                </div>
                <span style={{ fontSize: 13, color: "#0ea5e9", fontWeight: 700 }}>→</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ background: "linear-gradient(135deg, rgba(34,211,153,0.08), rgba(52,211,153,0.08))", borderRadius: 18, padding: "16px", border: "1.5px solid rgba(52,211,153,0.3)" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>⚡ Quick Actions</p>
            {[
              { emoji: "📋", label: "Permits" },
              { emoji: "💳", label: "Pay Bill" },
              { emoji: "🆘", label: "Report" },
              { emoji: "📱", label: "Services" }
            ].map((action) => (
              <button
                key={action.label}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1.5px solid rgba(52,211,153,0.4)",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0f172a",
                  transition: "all 150ms ease",
                  marginBottom: action.label !== "Services" ? 6 : 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(52,211,153,0.1)"
                  e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                {action.emoji} {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Operations - Compact */}
        <div style={{ background: "#ffffff", borderRadius: 18, padding: "18px", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>⚡ Recent Operations</p>
          {[
            { icon: "✅", title: "Signal optimized – B12", meta: "6 min ago" },
            { icon: "🟢", title: "Air alert cleared", meta: "24 min ago" },
            { icon: "🛣️", title: "Patrol routing updated", meta: "1 h ago" }
          ].map((item, idx) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 12,
                borderTop: idx > 0 ? "1px solid #e2e8f0" : "none",
                cursor: "pointer",
                transition: "all 150ms ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(14, 165, 233, 0.08)"; e.currentTarget.style.transform = "translateX(4px)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)" }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{item.meta}</p>
              </div>
              <span style={{ fontSize: 13, color: "#0ea5e9", fontWeight: 700 }}>→</span>
            </div>
          ))}
        </div>

        {/* Modal Overlays */}
        {selectedChart && (
          <div
            onClick={() => setSelectedChart(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(4px)"
            }}
            onMouseDown={() => setSelectedChart(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "28px 32px",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 20px 64px rgba(15,23,42,0.3)",
                maxWidth: 600,
                width: "90%",
                maxHeight: "80vh",
                overflow: "auto"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
                  {selectedChart === "mobility" && "📊 Mobility Score Trend"}
                  {selectedChart === "airquality" && "💨 Air Quality Analysis"}
                  {selectedChart === "traffic" && "🚗 Traffic Flow Analysis"}
                  {selectedChart === "analytics" && "📈 7-Day City Trends"}
                </h2>
                <button
                  onClick={() => setSelectedChart(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 24,
                    cursor: "pointer",
                    color: "#94a3b8"
                  }}
                >
                  ✕
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[
                  { day: "Mon", value: selectedChart === "mobility" ? 62 : selectedChart === "traffic" ? 68 : 72 },
                  { day: "Tue", value: selectedChart === "mobility" ? 68 : selectedChart === "traffic" ? 75 : 75 },
                  { day: "Wed", value: selectedChart === "mobility" ? 71 : selectedChart === "traffic" ? 62 : 78 },
                  { day: "Thu", value: selectedChart === "mobility" ? 66 : selectedChart === "traffic" ? 80 : 74 },
                  { day: "Fri", value: selectedChart === "mobility" ? 74 : selectedChart === "traffic" ? 71 : 82 },
                  { day: "Sat", value: selectedChart === "mobility" ? 70 : selectedChart === "traffic" ? 64 : 79 },
                  { day: "Sun", value: selectedChart === "mobility" ? 75 : selectedChart === "traffic" ? 58 : 76 }
                ]}>
                  <defs>
                    <linearGradient id="modalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedChart === "mobility" ? "#00e5ff" : selectedChart === "airquality" ? "#0ea5e9" : selectedChart === "traffic" ? "#ffb800" : "#8b5cf6"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={selectedChart === "mobility" ? "#00e5ff" : selectedChart === "airquality" ? "#0ea5e9" : selectedChart === "traffic" ? "#ffb800" : "#8b5cf6"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                  <YAxis stroke="#d1d5db" tick={{ fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#e5e7eb" }} />
                  <Area type="monotone" dataKey="value" stroke={selectedChart === "mobility" ? "#00e5ff" : selectedChart === "airquality" ? "#0ea5e9" : selectedChart === "traffic" ? "#ffb800" : "#8b5cf6"} strokeWidth={3} fillOpacity={1} fill="url(#modalGrad)" />
                </AreaChart>
              </ResponsiveContainer>
              <p style={{ margin: "20px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                {selectedChart === "mobility" && "Mobility score shows optimal movement patterns. Highest activity on Friday, slight dip on Thursday. Projected trend shows improvement."}
                {selectedChart === "airquality" && "Air quality remains moderate. Wednesday peaked with 78, currently stable at 72. Monitor during peak hours."}
                {selectedChart === "traffic" && "Traffic flow shows expected patterns with peak hours at noon. Weekend traffic significantly lower."}
                {selectedChart === "analytics" && "Overall city wellbeing trending positively. Integration of all metrics shows 8.6/10 satisfaction."}
              </p>
            </div>
          </div>
        )}

        {selectedAlert && (
          <div
            onClick={() => setSelectedAlert(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(4px)"
            }}
            onMouseDown={() => setSelectedAlert(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: "28px 32px",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 20px 64px rgba(15,23,42,0.3)",
                maxWidth: 450,
                width: "90%"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                    {selectedAlert.emoji} {selectedAlert.title}
                  </h2>
                  <p style={{ margin: 0, marginTop: 4, fontSize: 12, color: "#94a3b8" }}>{selectedAlert.type}</p>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 24,
                    cursor: "pointer",
                    color: "#94a3b8"
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ background: "rgba(14, 165, 233, 0.04)", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#0f172a", fontWeight: 600 }}>Alert Details</p>
                <p style={{ margin: 0, marginTop: 8, fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                  {selectedAlert.title === "High traffic - Downtown" ? "Major congestion detected on Main St and Central Ave. Average speed reduced to 12 km/h. Estimated resolution: 45 minutes." : "Air quality index spiked due to industrial activity. Recommend sensitive groups stay indoors. Air purifiers recommended."}
                </p>
              </div>
              <button style={{ width: "100%", padding: "12px 16px", borderRadius: 999, border: "none", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", color: "#ffffff", fontWeight: 700, cursor: "pointer", fontSize: 12 }} onClick={() => setSelectedAlert(null)}>
                Mark as Read
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div style={{ background: "transparent", minHeight: "100vh", color: "#0f172a" }}>
      <div className="topbar-shell">
        <Topbar user={user} onLogout={onLogout} />
      </div>
      <Container fluid style={{ display: "flex" }}>
        <Row style={{ width: "100%" }}>
          <Col md={2} style={{ padding: 0 }}>
            <Sidebar activeView={activeView} onChangeView={setActiveView} />
          </Col>
          <Col md={10} className="dashboard-main">
            <div>
              {/* Page Header Section */}
              <div
                style={{
                  marginBottom: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                  paddingBottom: 24,
                  borderBottom: "2px solid #e2e8f0"
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: 36, color: "#0f172a", fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {viewMeta[activeView]?.title ?? viewMeta.dashboard.title}
                  </h4>
                  <p style={{ fontSize: 15, color: "#64748b", marginTop: 12, marginBottom: 0, maxWidth: 600, lineHeight: 1.6 }}>
                    {viewMeta[activeView]?.subtitle ?? viewMeta.dashboard.subtitle}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11 }}>
                  <div
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      border: "1.5px solid #e2e8f0",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(8px)",
                      color: "#475569",
                      fontWeight: 500
                    }}
                  >
                    Last update: 18s ago
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 8px",
                      borderRadius: 999,
                      border: "1.5px solid #e2e8f0",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(8px)"
                    }}
                  >
                    {["24h", "7d", "30d"].map(tf => {
                      const isActive = timeframe === tf
                      return (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          style={{
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            padding: "6px 14px",
                            borderRadius: 999,
                            background: isActive
                              ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)"
                              : "transparent",
                            color: isActive ? "#ffffff" : "#94a3b8",
                            fontWeight: isActive ? 700 : 500,
                            transition: "all 200ms ease"
                          }}
                        >
                          {tf}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              {renderMainContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
