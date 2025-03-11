import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../app/UserContext.jsx';
import './SearchBar2.css';
import { Link } from 'react-router-dom';

function SearchBar() {
    const { data, loading, error, fetchData } = useContext(UserContext);
    const [input, setInput] = useState("");
    const debounceTimeout = useRef(null);

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
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="results-list">
                {data.length > 0 ? (
                    data.map((anime) => (
                        <div key={anime.mal_id} className="result-item">
                            <Link to={`/results/${anime.mal_id}`}>
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
                                {anime.images?.jpg?.image_url && (
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={`${anime.title} Poster`}
                                        width="150"
                                        style={{ borderRadius: '4px' }}
                                    />
                                )}
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
