import { useContext, useRef, useState } from 'react';
import { MalJikanContext } from '../../../context/MalJikanContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Searchbar.css';

function SearchBar() {
    const { data, loading, error, fetchData } = useContext(MalJikanContext);
    const [input, setInput] = useState("");
    const debounceTimeout = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (value.trim() !== "") {
            debounceTimeout.current = setTimeout(() => {
                fetchData(value);
            }, 500); // 500ms debounce
        }
    };

    const handleRandom = async () => {
        try {
            // Step 1: Fetch the maximum anime ID
            const response = await fetch(
                "https://api.jikan.moe/v4/anime?order_by=mal_id&sort=desc&limit=1"
            );
            if (!response.ok) {
                new Error("Failed to fetch maximum anime id from MalJikan API");
            }
            const json = await response.json();
            const maxId = json.data[0]?.mal_id;

            if (!maxId) {
                new Error("Maximum ID not found in the response");
            }

            let randomId;
            let valid = false;

            // Step 2: Loop to find a valid ID
            while (!valid) {
                randomId = Math.floor(Math.random() * maxId) + 1;
                console.log("Trying random ID:", randomId);

                // Step 3: Check if the random ID exists
                const checkResponse = await fetch(`https://api.jikan.moe/v4/anime/${randomId}`);
                if (checkResponse.ok) {
                    valid = true;
                    console.log("Valid random ID found:", randomId);
                }
            }

            navigate (`/details/${randomId}`);
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Random valid anime fetch completed");
        }
    };

    return (
        <div className="search-container">
            <div className="search-box">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button
                    className="search-button"
                    onClick={() => fetchData(input)}
                >
                    Search
                </button>
                <button className="random-button" onClick={handleRandom}>
                    Random Anime
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="results-list">
                {data.length > 0 ? (
                    data.map((anime) => (
                        <div key={anime.mal_id} className="result-item">
                            <Link to={`/details/${anime.mal_id}`}>
                                {anime.images?.jpg?.image_url && (
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={`${anime.title} Poster`}
                                    />
                                )}
                                <div className="animeDetail">
                                    <h6>{anime.title}</h6>
                                    {anime.type === "TV" ? (
                                        <p className="anime-release-date">
                                            Anime aired from: {anime.aired?.prop?.from?.year || "N/A"} to {anime.aired?.prop?.to?.year || "N/A"}
                                        </p>
                                    ) : (
                                        <p className="anime-release-date">
                                            Anime aired from: {anime.aired?.prop?.from?.year || "N/A"}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    input && !loading && <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
