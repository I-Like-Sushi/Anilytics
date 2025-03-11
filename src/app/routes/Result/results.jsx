import { useContext } from "react";
import { UserContext } from "../../UserContext.jsx"; // Adjust the path as needed
import "./results.css";
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

function Results() {
    const { data, loading, error } = useContext(UserContext); // Access context values

    return (
        <>
            <Nav />
            <div className="results-container">
                {/* Handle loading state */}
                {loading && <p>Loading...</p>}

                {/* Handle error state */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Display data */}
                {data && data.length > 0 ? (
                    data.map((anime) => (
                        <div key={anime.mal_id} className="result-card">
                            <h3>{anime.title}</h3>
                            <p>
                                Type: {anime.type} | Episodes: {anime.episodes || "N/A"}
                            </p>
                            <p>
                                Aired: {anime.aired?.prop?.from?.year || "N/A"} - {anime.aired?.prop?.to?.year || "N/A"}
                            </p>
                            {anime.images?.jpg?.image_url && (
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={`${anime.title} Poster`}
                                    className="result-image"
                                />
                            )}
                        </div>
                    ))
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Results;
