function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#">
            MyApp
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item px-2">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">Contact</a>
              </li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button className="btn btn-outline-light px-4">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="container mt-5 text-center">
        <h1 className="fw-bold">Welcome to MyApp</h1>
        <p className="text-muted mt-2">
          Responsive Navigation Bar using Bootstrap Components
        </p>
      </div>
    </>
  )
}

export default App
