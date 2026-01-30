import { useState } from "react"

function App() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? "app dark" : "app light"}>
      <h1>Theme Toggle SPA</h1>
      <p>Current Theme: {dark ? "Dark Mode" : "Light Mode"}</p>

      <button onClick={() => setDark(!dark)}>
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
    </div>
  )
}

export default App
