import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const cards = ['Card One', 'Card Two', 'Card Three']

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Card Based Layout</h2>

      <div className="row">
        {cards.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item}</h5>
                <p className="card-text">Bootstrap card component</p>
                <button className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
