import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CreateNewAccount.css';
import Nav from '../../../../components/Nav/Nav.jsx';
import Footer from '../../../../components/Footer/Footer.jsx';

function CreateNewAccount() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    username,
                    email,
                    password,
                    info,
                    role: ["user"],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'anilytics:XZgYZxpjq6LTYAhvpWA9',
                    },
                }
            );
            console.log("Response ", response);

            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            setSuccess('Account created successfully!');
            setError('');

            window.location.href = '/ProfilePage';
        } catch (err) {
            console.error("Error creating account: ", err);
            setError(err.response?.data?.message || 'Failed to create account');
        }
    };

    return (
        <>
            <Nav />
            <div className="create-account-container">
                <form onSubmit={handleSubmit} className="create-account-form">
                    <h2>Create a New Account</h2>
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
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="info">Additional Info</label>
                    <textarea
                        id="info"
                        placeholder="Tell us something about yourself"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <button type="submit">Create Account</button>
                    <Link className="login-link" to="/LogIn">
                        Already have an account? Log In
                    </Link>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CreateNewAccount;