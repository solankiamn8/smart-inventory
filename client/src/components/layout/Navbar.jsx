import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            {/* Group 1: Logo & Links */}
            <div className="nav-brand">
                <h2 style={{ margin: 0 }}>📦 SmartInv</h2>

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
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
                <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
                <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link>

                <button onClick={toggleTheme} className="theme-btn" style={{ cursor: 'pointer', padding: '8px 16px' }}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    )
}

export default Navbar;