import { Button, TextField, Card, CardContent, Typography } from '@mui/material'

function App() {
  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Material UI Design
      </Typography>

      <Card style={{ maxWidth: 400, margin: 'auto' }}>
        <CardContent>
          <TextField label="Email" fullWidth margin="normal" />
          <TextField label="Password" type="password" fullWidth margin="normal" />
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
