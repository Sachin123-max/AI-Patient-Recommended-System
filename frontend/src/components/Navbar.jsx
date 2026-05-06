import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        🏥 MediCare
      </div>

      {/* Navigation Links */}
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/appointment" onClick={() => setMenuOpen(false)}>Appointment</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/ai-chatbot" onClick={() => setMenuOpen(false)}>AI Chat</Link>
      </nav>

      {/* Right Buttons */}
      <div className="nav-actions">
        {!isAuthenticated && (
          <button
            className="btn admin-btn"
            onClick={() =>
              window.open("http://localhost:5174/login", "/login")
            }
          >
            Admin
          </button>
        )}

        {isAuthenticated ? (
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <GiHamburgerMenu />
      </div>
    </header>
  );
};

export default Navbar;