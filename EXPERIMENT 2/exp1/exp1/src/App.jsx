function App() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: '380px' }}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <button className="btn btn-primary w-100 mb-3">Sign In</button>

        <p className="text-center text-muted mb-0">
          Don’t have an account? <span className="text-primary">Register</span>
        </p>
      </div>
    </div>
  )
}

export default App
