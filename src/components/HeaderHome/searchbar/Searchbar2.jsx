import {useState, useRef} from 'react';
import './SearchBar2.css';
import {Link, Route} from "react-router-dom";

function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const debounceTimeout = useRef(null);
    const lastFetchTime = useRef(0);
    const baseUrl = 'https://api.jikan.moe/v4/anime';

    const fetchData = async (value) => {
        const currentTime = Date.now();
        // Ensure at least 1 second between requests
        if (currentTime - lastFetchTime.current < 1000) {
            console.log("Too soon to fetch, throttling request.");
            return;
        }
        lastFetchTime.current = currentTime;

        try {
            const response = await fetch(`${baseUrl}?q=${encodeURIComponent(value)}`);
            if (response.ok) {
                const json = await response.json();
                if (json.data && Array.isArray(json.data)) {
                    const filteredResults = json.data.filter((anime) =>
                        anime.title.toLowerCase().includes(value.toLowerCase())
                    );
                    console.log(filteredResults);
                    setResults(filteredResults);
                } else {
                    console.error("Unexpected JSON structure:", json);
                    setError("Unexpected JSON structure from API.");
                }
            } else if (response.status === 429) {
                console.warn("Rate limited. Retrying after delay...");
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
                fetchData(value); // Retry fetching
            } else {
                console.error("Error response from server:", response);
                setError("Error response from server.");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error fetching data. Please try again later.");
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setError(null);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (value.trim() !== "") {
            debounceTimeout.current = setTimeout(() => {
                fetchData(value);
            }, 500); // 500ms debounce
        }
    };

    return (
        <div className="search-container">
            {/* Group the input and button together */}
            <div className="search-box">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button className="search-button" onClick={() => fetchData(input)}>
                    Search
                </button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {/* Results list positioned below the search bar */}
            <div className="results-list">
                {results.length > 0 ? (
                    results.map((anime) => (
                        <div key={anime.mal_id} className="result-item">
                            <Link to={`/results/${anime.mal_id}`}>
                            <h6>{anime.title}</h6>
                            {anime.type === "TV" ?
                                <p className="anime-release-date">
                                    Anime aired
                                    from: {anime.aired?.prop?.from?.year || "N/A"} to {anime.aired?.prop?.to?.year || "N/A"}</p>
                            : <p className="anime-release-date">
                                Anime aired
                                from: {anime.aired?.prop?.from?.year || "N/A"}</p>
                            }
                            {anime.images?.jpg?.image_url && (
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={`${anime.title} Poster`}
                                    width="150"
                                    style={{borderRadius: '4px'}}
                                />

                            )}
                            </Link>
                        </div>
                    ))
                ) : (
                    input && <p>Loading...</p>
                )}
            </div>
        </div>
    );
}


export default SearchBar;
