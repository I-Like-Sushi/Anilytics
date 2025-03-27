import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx'; // Adjust the path if necessary
import './logIn.css';
import Nav from '../../../components/Nav/Nav.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'anilytics:XZgYZxpjq6LTYAhvpWA9',
                    },
                }
            );
            console.log("Login response: ", response);

            const token = response.data.accessToken;
            localStorage.setItem('jwtToken', token);
            login(token);
            setSuccess('Login successful!');
            setError('');

            navigate('/ProfilePage'); // Redirect to profile page
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Failed to log in');
            setSuccess('');
        }
    };

    return (
        <>
            <Nav />
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Log In</h2>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                    <Link className="register-link" to="/CreateNewAccount">
                        Don’t have an account? Create One
                    </Link>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;