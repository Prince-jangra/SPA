import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Profile from "./components/profile";
import Dashboard from "./components/dasboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
