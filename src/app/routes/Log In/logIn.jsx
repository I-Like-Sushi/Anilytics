import { useState } from 'react';
import './logIn.css';
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const API_ENDPOINT = "https://api.datavortex.nl/Anilytics";

    // Authentication function that calls the API endpoint
    const authenticateUser = async (email, password) => {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            let errorMessage = "Failed to authenticate";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // If response parsing fails, fall back to the default error message.
            }
            throw new Error(errorMessage);
        }

        // On success, parse the JSON response (e.g., token, user data)
        return await response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await authenticateUser(email, password);
            console.log("Login successful:", data);
            setError(''); // Clear any previous error message
            // TODO: Handle login success (store token, update user state, or redirect user).
        } catch (err) {
            setError(err.message);
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

                    <button type="submit">Log In</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default LoginForm;
