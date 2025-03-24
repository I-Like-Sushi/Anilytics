import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx'; // Adjust the path
import './logIn.css';
import Nav from '../../../components/Nav/Nav.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useAuth(); // Use login from AuthContext
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Stop form reload
        console.log('Form submitted'); // Debugging

        try {
            const response = await axios.post(
                'https://api.datavortex.nl/anilytics/users/authenticate',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': '',
                    },
                }
            );

            console.log('API response:', response); // Debugging to verify the full response

            const token = response.data.jwt; // Correct property for accessing the token
            console.log('Token:', token); // Debugging to verify the token value is retrieved

            login(token); // Save token and update user context
            console.log('User logged in!'); // Confirm that login succeeded

            setSuccess('Login successful!'); // Show success message in the UI
            setError(''); // Clear any existing error message

            navigate('/ProfilePage'); // Navigate to the profile page after successful login
            console.log('Navigated to ProfilePage'); // Confirm navigation
        } catch (err) {
            // Handle errors and provide feedback to the user
            console.error('Login error:', err); // Debugging to identify issues
            setError(err.response?.data?.message || 'Failed to log in'); // Set user-visible error
            setSuccess(''); // Clear any existing success message
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


