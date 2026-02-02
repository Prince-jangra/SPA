import pic from "../assets/MYPIC.jpeg";

function Home() {
  return (
    <div className="card">
      <img src={pic} width="150" style={{ borderRadius: "8px" }} />

      <h1>Prince Jangra</h1>
      <p>
        Aim: To build scalable web applications and explore AI-based solutions
        using modern technologies.
      </p>

      <h3>Projects</h3>
      <ul>
        <li>RBAC System</li>
        <li>Bitcoin Price Prediction</li>
        <li>AI Chatbot</li>
      </ul>

      <h3>Achievements</h3>
      <ul>
        <li>Completed Full Stack Development</li>
        <li>Built multiple React SPAs</li>
      </ul>
    </div>
  );
}

export default Home;
