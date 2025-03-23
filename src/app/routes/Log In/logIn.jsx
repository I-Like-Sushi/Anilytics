import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './logIn.css';
import Nav from '../../../components/Nav/Nav.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/Anilytics/users/authenticate',
                { email, password }
            );
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            const decodedToken = jwtDecode(token); // ✅ Simplified usage
            console.log('Decoded Token:', decodedToken);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <>
            <Nav />
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Welcome Back!</h2>
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button type="submit">Log In</button>
                    <Link className="createNewAccount" to="/CreateNewAccount">
                        Create new account
                    </Link>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;