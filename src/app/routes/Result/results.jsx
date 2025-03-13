import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { MalJikanContext } from "../../MalJikanContext.jsx";
import { ExtraAnimeContext } from "../../ExtraAnimeContext.jsx";
import "./results.css";

function Results() {
    const { id } = useParams();

    // Use MalJikan context for search results
    const { data: malData } = useContext(MalJikanContext);

    // Use ExtraAnimeContext for Kitsu data and others.
    // Notice we are not destructuring fetchAnilistData here to avoid redeclaration.
    const extraContext = useContext(ExtraAnimeContext) || {
        anilistData: [],
        kitsuData: [],
        fetchKitsuData: () => {},
        loading: false,
        error: null,
    };
    const {
        anilistData,
        kitsuData,
        fetchKitsuData,
        loading: extraLoading,
        error: extraError,
    } = extraContext;

    // Local state for our MalJikan anime details
    const [anime, setAnime] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [localError, setLocalError] = useState(null);

    // Local function to fetch Anilist data using GraphQL by MAL ID.
    const fetchAnilistDataLocal = useCallback(async (malId) => {
        setLocalLoading(true);
        setLocalError(null);
        try {
            const response = await fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query: `
            query ($idMal: Int) {
              Media(idMal: $idMal, type: ANIME) {
                id
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
          `,
                    variables: { idMal: Number(malId) },
                }),
            });
            const json = await response.json();
            if (json.data && json.data.Media) {
                console.log("Fetched from Anilist:", json.data.Media);
                // Optionally, you could update some state or context for Anilist data here.
            } else {
                console.error("No data found for MAL ID", malId);
            }
        } catch (error) {
            console.error("Error fetching Anilist data:", error);
            setLocalError("Error fetching Anilist data.");
        } finally {
            setLocalLoading(false);
        }
    }, []);

    // Function to fetch full details from MalJikan if needed.
    const fetchAnimeDetails = useCallback(async () => {
        setLocalLoading(true);
        setLocalError(null);
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            if (response.ok) {
                const json = await response.json();
                setAnime(json.data);
                console.log("Fetched from MalJikan:", json.data);

                // Fetch Anilist data using MAL ID
                if (json.data.mal_id) {
                    console.log("Fetching Anilist data for MAL ID:", json.data.mal_id);
                    fetchAnilistDataLocal(json.data.mal_id);
                }
                // For Kitsu, continue using title search.
                if (json.data.title) {
                    fetchKitsuData(json.data.title);
                }
            } else {
                new Error("Failed to fetch anime details from MalJikan API.");
            }
        } catch (err) {
            console.error(err);
            setLocalError(err.message || "An error occurred.");
        } finally {
            setLocalLoading(false);
        }
    }, [id, fetchAnilistDataLocal, fetchKitsuData]);

    useEffect(() => {
        // Avoid refetching if we already have anime data
        if (anime) return;

        // Attempt to find the anime from the MalJikan search results
        const foundAnime = malData.find(
            (item) => item.mal_id && item.mal_id.toString() === id
        );

        if (foundAnime) {
            setAnime(foundAnime);
            console.log("Using MalJikan search result. Fetching Anilist data for MAL ID:", foundAnime.mal_id);
            if (foundAnime.mal_id) {
                fetchAnilistDataLocal(foundAnime.mal_id);
            }
            if (foundAnime.title) {
                fetchKitsuData(foundAnime.title);
            }
            setLocalLoading(false);
        } else {
            // Fallback: fetch details directly from MalJikan
            fetchAnimeDetails();
        }
    }, [id, malData, anime, fetchAnimeDetails, fetchAnilistDataLocal, fetchKitsuData]);

    // Combine loading and error states.
    const isLoading = localLoading || extraLoading;
    const combinedError = localError || extraError;

    if (isLoading) {
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

    if (combinedError || !anime) {
        return (
            <>
                <Nav />
                <div className="results-container">
                    <p style={{ color: "red" }}>
                        {combinedError || `No details found for anime with ID: ${id}`}
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    // Debug logs
    console.log("MalJikan Anime:", anime);
    console.log("Anilist Data:", anilistData);
    console.log("Kitsu Data:", kitsuData);

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
                    {anime.images?.jpg?.image_url && (
                        <img
                            src={anime.images.jpg.image_url}
                            alt={`${anime.title} Poster`}
                            className="result-image"
                        />
                    )}
                </div>

                <div className="extra-results">
                    {anilistData && anilistData.length > 0 ? (
                        <div>
                            <h3>Anilist Results</h3>
                            {anilistData.map((item, index) => (
                                <div key={item.id || `anilist-${index}`} className="extra-result-item">
                                    <p>{item.title.romaji || item.title.english || "No Title"}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found on Anilist.</p>
                    )}

                    {kitsuData && kitsuData.length > 0 ? (
                        <div>
                            <h3>Kitsu Results</h3>
                            {kitsuData.map((item, index) => (
                                <div key={item.id || `kitsu-${index}`} className="extra-result-item">
                                    <p>{item.attributes?.canonicalTitle || "No Title"}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found on Kitsu.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Results;
