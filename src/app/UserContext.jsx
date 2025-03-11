import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                const json = await response.json();
                setData(json.data || []);
            } else {
                setError("Error: Unable to fetch data.");
            }
        } catch (err) {
            console.error("Error fetching data:", err); // Use the variable here
            setError(`Error: ${err.message || "Unable to fetch data."}`);
        }
    };

    return (
        <UserContext.Provider value={{ data, loading, error, fetchData }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
