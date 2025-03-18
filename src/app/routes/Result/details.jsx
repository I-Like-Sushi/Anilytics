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
                console.log("MAL ID: ", id);
            } else {
                console.error("Failed to fetch anime details from Anilist API.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Done loading fetchAnilistById");
        }
    };

    const fetchKitsuData = async () => {
        try {
            const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(maljikanData.title_japanese)}`);
            if (response.ok) {

                const json = await response.json();


                setKitsuData(json.data);
            } else {
                console.error("Failed to fetch anime details from MalJikan API.");
            }
        } catch (err) {
            console.error("Kitsu API error:", err);
        } finally {
            console.log("Done loading fetchKitsuData");
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
        console.log("XXX Maljikan data:", maljikanData);
        console.log("XXX Anilist data:", anilistData);
        console.log("XXX Kitsu data:", kitsuData);

        if (anilistData && maljikanData && kitsuData){
            console.log("Done loading all data...");
            setLoading(false);
        }
    }, [anilistData, maljikanData, kitsuData]);

    useEffect(() => {
        console.log("Maljikan data changed", maljikanData);
        if (maljikanData){
            fetchKitsuData();
        }
    }, [maljikanData]); // Don't remove or add. Will break code.

    // Render a loading message until data is ready
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

    const maljikanDataYearRelease = `${maljikanData.aired?.prop?.from?.year}-${String(maljikanData.aired?.prop?.from?.month).padStart(2, '0')}-${String(maljikanData.aired?.prop?.from?.day).padStart(2, '0')}`
    // const anilistDataYearRelease = `${anilistData.Media.startDate.year}-${String(anilistData.Media.startDate.month).padStart(2, '0')}-${String(anilistData.Media.startDate.day).padStart(2, '0')}`

    return (
        <>
            <Nav />
            {maljikanData ? (
                <div className="results-container">
                    <div className="result-card">
                        {maljikanData ? (
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
                        ) : (
                            <p>No results found on Anilist.</p>
                        )}

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
                                    <td><a className="source-links" href={maljikanData.url} target="_blank">MyAnimeList</a></td>
                                    <td>{maljikanData.score}/10</td>
                                </tr>
                                <tr>
                                    <td><a className="source-links" href={anilistData.Media.siteUrl} target="_blank">Anilist</a></td>
                                    <td>{anilistData.Media.averageScore}/100</td>
                                </tr>
                                <tr>
                                    {kitsuData.length > 0 ? (
                                        <td>
                                            {kitsuData
                                                .filter((item) => maljikanDataYearRelease === item.attributes?.startDate)
                                                .map((item, index) => (
                                                    <span key={item.id || `kitsu-${index}`}>
                                                <a className="source-links" href={item.links?.self} target="_blank">Kitsu</a>
                                                        {/* Their website is not up to date in their API. Shows .io domain while the updated website is .app */}
                                                    </span>
                                                ))}
                                        </td>
                                    ) : (
                                        <td>No Data Available</td>
                                    )}
                                    {kitsuData.length > 0 ? (
                                        <td>
                                            {kitsuData
                                                .filter((item) => maljikanDataYearRelease === item.attributes?.startDate)
                                                .map((item, index) => (
                                                    <span key={item.id || `kitsu-${index}`}>
                                                {item.attributes?.averageRating || "No rating"}/100
                                                    </span>
                                                ))}
                                        </td>
                                    ) : (
                                        <td>No Data Available</td>
                                    )}
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