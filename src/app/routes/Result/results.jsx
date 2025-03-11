import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";
import "./results.css";
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

function Results() {
    const { id } = useParams();
    const { data } = useContext(UserContext); // UserContext holds the search results list
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Try to find the anime in the context first.
        const foundAnime = data.find((item) => item.mal_id.toString() === id);
        if (foundAnime) {
            setAnime(foundAnime);
            setLoading(false);
        } else {
            // If not found, fetch the details for this anime by using its ID.
            const fetchAnime = async () => {
                try {
                    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                    if (response.ok) {
                        const json = await response.json();
                        setAnime(json.data);
                    } else {
                        new Error("Failed to fetch anime details.");
                    }
                } catch (err) {
                    setError(err.message || "An error occurred.");
                } finally {
                    setLoading(false);
                }
            };

            fetchAnime();
        }
    }, [id, data]);

    // Debug logs
    console.log("Route ID:", id);
    console.log("Context data:", data);
    console.log("Anime to display:", anime);

    if (loading) {
        return (
            <>
                <Nav />
                <div className="results-container">
                    <p>Loading...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !anime) {
        return (
            <>
                <Nav />
                <div className="results-container">
                    <p style={{ color: "red" }}>
                        {error ? error : `No details found for anime with ID: ${id}`}
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="results-container">
                <div className="result-card">
                    <h2>{anime.title}</h2>
                    <h3>{anime.title_english}</h3>
                    <h4>{anime.title_japanese}</h4>
                    <p>
                        <strong>Type:</strong> {anime.type}{" "}
                        {anime.episodes ? `| Episodes: ${anime.episodes}` : ""}
                    </p>





                    {anime.type === "TV" ? (
                        <p>
                        <strong>Aired:</strong><br/>From: {anime.aired?.prop?.from?.year || "N/A"}-{anime.aired?.prop?.from?.month || "N/A"}-{anime.aired?.prop?.from?.day || "N/A"}<br/>
                        {anime.aired?.prop?.to &&
                            `To: ${anime.aired?.prop?.to?.year || "N/A"}-${anime.aired?.prop?.to?.month || "N/A"}-${anime.aired?.prop?.to?.day || "N/A"}`}
                        </p>) :
                        (<p>
                            <strong>Released:</strong> {anime.aired?.prop?.from?.year || "N/A"}-{anime.aired?.prop?.from?.month || "N/A"}-{anime.aired?.prop?.from?.day || "N/A"}
                        </p>)
                    }



                    {anime.images?.jpg?.image_url && (
                        <img
                            src={anime.images.jpg.image_url}
                            alt={`${anime.title} Poster`}
                            className="result-image"
                        />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Results;
