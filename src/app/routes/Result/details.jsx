import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import "./details.css";

function Details() {
    const { id } = useParams();
    const [maljikanData, setMaljikanData] = useState(null);
    const [anilistData, setAnilistData] = useState(null);
    const [kitsuData, setKitsuData] = useState(null);
    const [loading, setLoading] = useState(true);

    // New states to track when individual fetches are complete
    const [isMaljikanLoaded, setIsMaljikanLoaded] = useState(false);
    const [isAnilistLoaded, setIsAnilistLoaded] = useState(false);
    const [isKitsuLoaded, setIsKitsuLoaded] = useState(false);

    // Helper to format release year for Kitsu checks
    const maljikanDataYearRelease = maljikanData
        ? `${maljikanData.aired?.prop?.from?.year}-${String(maljikanData.aired?.prop?.from?.month).padStart(2, '0')}-${String(maljikanData.aired?.prop?.from?.day).padStart(2, '0')}`
        : null;

    const fetchMaljikanById = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            if (response.ok) {
                const json = await response.json();
                setMaljikanData(json.data);
            } else {
                console.error("Failed to fetch anime details from MalJikan API.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Done loading fetchMaljikanById");
            setIsMaljikanLoaded(true);
        }
    };

    const fetchAnilistById = async () => {
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
                idMal
                siteUrl
                averageScore
                title {
                    romaji
                    english
                    native
                }
                startDate {
                    day
                    month
                    year
                }
                description
                episodes
                meanScore
                coverImage {
                  large
                }
                stats {
                    scoreDistribution {
                        amount
                        score
                        }
                    statusDistribution {
                        amount
                        status
                        }
                }
              }
            }`,
                    variables: { idMal: Number(id) },
                }),
            });

            if (response.ok) {
                const json = await response.json();
                setAnilistData(json.data);
            } else {
                console.error("Failed to fetch anime details from Anilist API.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Done loading fetchAnilistById");
            setIsAnilistLoaded(true);
        }
    };

    const fetchKitsuData = async () => {
        try {
            if (!maljikanData) return;
            const response = await fetch(
                `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(maljikanData.title_japanese)}`
            );
            if (response.ok) {
                const json = await response.json();
                setKitsuData(json.data);
            } else {
                console.error("Failed to fetch anime details from Kitsu API.");
            }
        } catch (err) {
            console.error("Kitsu API error:", err);
        } finally {
            console.log("Done loading fetchKitsuData");
            setIsKitsuLoaded(true);
        }
    };

    useEffect(() => {
        async function fetchAllData() {
            setLoading(true);
            await Promise.all([fetchMaljikanById(), fetchAnilistById()]);
        }
        fetchAllData();
    }, [id]); // Don't remove or add. Will break code.

    useEffect(() => {
        console.log("Maljikan data changed", maljikanData);
        if (maljikanData) {
            fetchKitsuData();
        }
    }, [maljikanData]); // Don't remove or add. Will break code.

    // Check if all fetches are complete
    useEffect(() => {
        if (isMaljikanLoaded && isAnilistLoaded && isKitsuLoaded) {
            console.log("All fetches complete");
            setLoading(false); // Stop loading when everything is done
        }
    }, [isMaljikanLoaded, isAnilistLoaded, isKitsuLoaded]);


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

    return (
        <>
            <Nav />
            {maljikanData ? (
                <div className="results-container">
                    <div className="result-card">
                        <div className="maljikanWrapper">
                            <h2>{maljikanData.title}</h2>
                            <h3>{maljikanData.title_english}</h3>
                            <h4>{maljikanData.title_japanese}</h4>
                            <p>
                                <strong>Type:</strong> {maljikanData.type}{" "}
                                {maljikanData.episodes ? `| Episodes: ${maljikanData.episodes}` : ""}
                            </p>
                            {maljikanData.images?.jpg?.image_url && (
                                <img
                                    src={maljikanData.images.jpg.image_url}
                                    alt={`${maljikanData.title} Poster`}
                                    className="result-image"
                                />
                            )}
                        </div>
                        <div className="maljikanWrapperbottom">
                            <h3>Rating results:</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Rating</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <a
                                            className="source-links"
                                            href={maljikanData.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            MyAnimeList
                                        </a>
                                    </td>
                                    <td>{maljikanData.score ? `${maljikanData.score}/10` : "No data"}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a
                                            className="source-links"
                                            href={anilistData?.Media?.siteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Anilist
                                        </a>
                                    </td>
                                    <td>{anilistData?.Media?.averageScore ? `${anilistData.Media.averageScore}/100` : "No data"}</td>
                                </tr>
                                <tr>
                                    {/* Please note that the Kitsu API needs to be updated. item.links?.self still contains it's old domain name of .io instead of .app*/}
                                    <td>
                                        {(() => {
                                            const matchingKitsu = kitsuData?.filter(
                                                (item) => item.attributes?.startDate === maljikanDataYearRelease
                                            );
                                            if (matchingKitsu && matchingKitsu.length > 0) {
                                                return matchingKitsu.map((item, index) => (
                                                    <span key={item.id || `kitsu-${index}`}>
                                                            <a
                                                                className="source-links"
                                                                href={item.links?.self}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Kitsu
                                                            </a>
                                                        </span>
                                                ));
                                            } else {
                                                return <span>Kitsu</span>;
                                            }
                                        })()}
                                    </td>
                                    <td>
                                        {(() => {
                                            const matchingKitsu = kitsuData?.filter(
                                                (item) => item.attributes?.startDate === maljikanDataYearRelease
                                            );
                                            if (matchingKitsu && matchingKitsu.length > 0) {
                                                return matchingKitsu.map((item, index) => (
                                                    <span key={item.id || `kitsu-${index}`}>
                                                            {item.attributes?.averageRating
                                                                ? `${item.attributes.averageRating}/100`
                                                                : "No data"}
                                                        </span>
                                                ));
                                            } else {
                                                return "No data";
                                            }
                                        })()}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No results found.</p>
            )}
            <Footer />
        </>
    );
}

export default Details;
