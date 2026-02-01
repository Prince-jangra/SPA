import { Card, CardContent, Typography } from "@mui/material"

export default function StatCard({ title, value, color, isPrediction = false }) {
  const accent = color || "#0f172a"

  return (
    <Card
      sx={{
        background: "#ffffff",
        border: `1.5px solid ${accent}20`,
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
        borderRadius: "20px",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 48px rgba(15,23,42,0.15)",
          borderColor: `${accent}40`
        }
      }}
    >
      <CardContent sx={{ py: 3, px: 3 }}>
        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 12,
            letterSpacing: "0.14em",
            mb: 1.2,
            textTransform: "uppercase",
            fontWeight: 700
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: accent,
            fontSize: 32,
            fontWeight: 800,
            mt: 1,
            textShadow: isPrediction ? `0 0 16px ${accent}40` : "none",
            letterSpacing: "-0.01em"
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
