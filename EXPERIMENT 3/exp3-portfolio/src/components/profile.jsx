import pic from "../assets/MYPIC.jpeg";

function Profile() {
  return (
    <div className="card">
      <img src={pic} width="150" style={{ borderRadius: "8px" }} />

      <p><b>Name:</b> Prince Jangra</p>
      <p><b>UID:</b> 23BAI70215</p>

      <h3>Projects</h3>
      <ul>
        <li>RBAC</li>
        <li>Bitcoin Price Prediction</li>
        <li>AI Chatbot</li>
      </ul>
    </div>
  );
}

export default Profile;
