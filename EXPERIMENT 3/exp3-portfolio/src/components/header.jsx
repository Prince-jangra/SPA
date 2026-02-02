import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 onClick={() => navigate("/profile")}>My Profile</h1>

      <div>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
}

export default Header;
