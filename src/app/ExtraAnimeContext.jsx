import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ExtraAnimeContext = createContext();

export function ExtraAnimeContextProvider({ children }) {
    const [anilistData, setAnilistData] = useState([]);
    const [kitsuData, setKitsuData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch data from the Anilist API (search results)
// In ExtraAnimeContext.jsx, update fetchAnilistData to something like:
    const fetchAnilistData = async (idMal) => {
        setLoading(true);
        const graphqlQuery = `
        query ($idMal: Int) {
            Media(idMal: $idMal, type: ANIME) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                }
                description
                episodes
                coverImage {
                    large
                }
            }
        }
    `;
        const variables = { idMal: Number(idMal) };
        try {
            const response = await fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ query: graphqlQuery, variables }),
            });
            const result = await response.json();
            if (response.ok) {
                if (!result?.data?.Media) console.warn("No results returned from Anilist.");
                setAnilistData(result.data.Media ? [result.data.Media] : []);
            } else {
                console.error("Anilist API returned an error:", result.errors);
                setError("Error: Unable to fetch data from Anilist API.");
            }
        } catch (err) {
            console.error("An error occurred while fetching Anilist data:", err);
            setError(`Anilist API Error: ${err.message || "Unable to fetch data."}`);
        } finally {
            setLoading(false);
        }
    };



    // Function to fetch data from the Kitsu API (search results)
    const fetchKitsuData = async (query) => {
        console.log('CHECKING 22222222222');
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`
            );
            if (response.ok) {
                const json = await response.json();
                setKitsuData(json.data || []);
            } else {
                setError("Error: Unable to fetch data from Kitsu API.");
            }
        } catch (err) {
            console.error("Kitsu API error:", err);
            setError(`Kitsu API Error: ${err.message || "Unable to fetch data."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ExtraAnimeContext.Provider
            value={{
                anilistData,
                kitsuData,
                fetchAnilistData,
                fetchKitsuData,
                loading,
                error,
            }}
        >
            {children}
        </ExtraAnimeContext.Provider>
    );
}

ExtraAnimeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
