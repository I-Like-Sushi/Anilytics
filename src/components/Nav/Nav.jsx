import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Nav.css';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            {/* Anilytics */}
            {/* Logo */}
            <div className="logo">
                <a href="/">
                    {/* Place logo below */}
                    <img src="" alt="Current Logo" />
                </a>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/data">Data</Link></li>
            </ul>

            {/* Log In Button */}
            <div className="log-in-button">
                <Link to="/loginForm">Log In</Link>
            </div>

            {/* Hamburger Menu Icon for Mobile */}
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="hamburger"></span>
            </div>
        </nav>
    );
}

export default Nav;