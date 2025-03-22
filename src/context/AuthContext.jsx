import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for runtime prop type checking

// 1. Create the context object for authentication.
// This is just a placeholder that will hold the authentication-related state and functions.
const AuthContext = createContext();

/**
 * 2. Custom hook to make it easier to access the AuthContext.
 * This ensures that any component wanting to use the context simply calls `useAuth()`.
 * It also throws an error if `useAuth` is used outside the `AuthProvider`.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

/**
 * 3. The AuthProvider component.
 * This component wraps parts of your app where authentication should be available.
 * It provides user data (`user`) and functions (`login`, `logout`) to its child components.
 */
export const AuthProvider = ({ children }) => {
    // State to hold the current authenticated user.
    // Initially, this is null, meaning the user is not logged in.
    const [user, setUser] = useState(null);

    /**
     * Function to log in a user.
     * This could be tied to an API call to validate credentials.
     * @param {Object} userData - The user data to set after a successful login.
     */
    const login = (userData) => {
        setUser(userData);
    };

    /**
     * Function to log out a user.
     * It clears the user state, effectively logging them out.
     */
    const logout = () => {
        setUser(null);
    };

    /**
     * The context value that will be shared with all components consuming AuthContext.
     * It includes:
     * - `user`: The current authenticated user (or `null` if not logged in).
     * - `login`: A function to log in the user.
     * - `logout`: A function to log out the user.
     */
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Add PropTypes for the AuthProvider component so ESLint knows that `children` is expected.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/*
Notes:
- `children` refers to the components that are wrapped by the `AuthProvider`.
- The custom hook `useAuth` makes it simple for other components to access the authentication context.
*/

