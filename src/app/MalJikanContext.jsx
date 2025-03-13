import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MalJikanContext = createContext();

export function MalJikanContextProvider({ children }) {
    const [data, setData] = useState([]); // search results from MalJikan
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
                setError("Error: Unable to fetch data from MalJikan API.");
            }
        } catch (err) {
            console.error("MalJikan API error:", err);
            setError(`MalJikan API Error: ${err.message || "Unable to fetch data."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MalJikanContext.Provider value={{ data, loading, error, fetchData }}>
            {children}
        </MalJikanContext.Provider>
    );
}

MalJikanContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
