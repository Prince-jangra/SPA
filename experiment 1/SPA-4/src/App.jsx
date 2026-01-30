import { useState } from "react"
import "./index.css"

function App() {
  const [form, setForm] = useState({ name: "", email: "", age: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container">
      <h2>Simple Form SPA</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="age" placeholder="Age" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="output">
          <h4>Submitted Data</h4>
          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
          <p>Age: {form.age}</p>
        </div>
      )}
    </div>
  )
}

export default App
