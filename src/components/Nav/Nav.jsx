import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'; // Adjust the path as needed
import './Nav.css';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };


    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src="" alt="Current Logo" />
                </Link>
            </div>

            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {user && (
                    <li>
                        <Link to="/ProfilePage">Profile</Link>
                    </li>
                )}
            </ul>

            <div className="auth-button">
                {user ? (
                    <button className="log-out-button" onClick={handleLogout}>Log Out</button>
                ) : (
                    <Link className="log-in-button" to="/logIn">Log In</Link>
                )}
            </div>

            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="hamburger"></span>
            </div>
        </nav>
    );
}

export default Nav;
