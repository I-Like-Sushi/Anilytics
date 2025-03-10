import { useState } from 'react';
import './LoginForm.css';
import Nav from "../../../../components/Nav/Nav.jsx";
import Footer from "../../../../components/Footer/Footer.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Placeholder authentication function
    const authenticateUser = async (email, password) => {
        // Simulating an authentication request (replace this with your actual logic)
        if (email === 'test@example.com' && password === 'password') {
            return { success: true };
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authenticateUser(email, password);
            setError(''); // Clear error if authentication is successful
        } catch (err) {
            setError(err.message); // Use the error message
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
            < Footer />
        </>
    );
}

export default LoginForm;
