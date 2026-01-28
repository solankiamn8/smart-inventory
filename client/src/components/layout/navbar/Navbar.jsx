import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/button/Button";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Group 1: Logo & Links */}
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h2 style={{ margin: 0 }}>📦 SmartInv</h2>
        </Link>

        {/* Hamburger Icon (Only visible on mobile via CSS) */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Dynamic Class:
                    If isMenuOpen is true, we add 'active' class to show the menu
            */}
      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {/* LOGIC:
                    If User is Logged In -> Show Dashboard & Logout
                    If User is Guest -> Show Home, Login & Signup
                */}
        {user ? (
          <>
            {/* LOGGED IN VIEW */}
            <span className="nav-text">
              Hi, <strong>{user.name?.split(" ")[0]}</strong>
            </span>

            <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>
              Dashboard
            </Link>

            <div>
              <Button
                variant="secondary"
                onClick={handleLogout}
                style={{ padding: "8px 16px", fontSize: "0.9rem" }}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* GUEST VIEW */}
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/login" className="nav-link" onClick={toggleMenu}>
              Login
            </Link>
            <div style={{ width: "fit-content" }}>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/signup");
                  toggleMenu();
                }}
                style={{ padding: "10px 16px", fontSize: "0.9rem" }}
              >
                Get Started
              </Button>
            </div>
          </>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-btn"
          style={{ cursor: "pointer", padding: "8px 16px" }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
