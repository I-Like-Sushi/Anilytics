import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import "./results.css";
import error from "eslint-plugin-react/lib/util/error.js";


function Results2() {
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
    }, [id]);

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
    }, [maljikanData]);

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
    const anilistDataYearRelease = `${anilistData.Media.startDate.year}-${String(anilistData.Media.startDate.month).padStart(2, '0')}-${String(anilistData.Media.startDate.day).padStart(2, '0')}`
    console.log("Anilist advanced scores", anilistData.advancedScores);
    console.log("Anilist score",anilistData.score);


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

                        {anilistData ? (
                            <div className="anilistWrapper">
                                <h3>Anilist Results</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td>{anilistData.Media.title.romaji}</td>
                                        </tr>
                                        <tr>
                                            <td>Rating</td>
                                            <td>{anilistData.Media.averageScore}/100</td>
                                        </tr>
                                        <tr>
                                            <td>MAL ID</td>
                                            <td>{anilistData.Media.idMal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No results found on Anilist.</p>
                        )}

                        {kitsuData.length > 0 ? (
                            <div className="kitsuWrapper">
                                <h3>Kitsu Results</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Anime obj</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {kitsuData
                                        .filter((item) => maljikanDataYearRelease === item.attributes?.startDate)
                                        .map((item, index) => (
                                            <tr key={item.id || `kitsu-${index}`} className="extra-result-item">
                                                <td>{index}</td>
                                                <td>
                                                    <p>Title: {item.attributes?.titles?.ja_jp || "No Title"}</p>
                                                    <p>Rating: {item.attributes?.averageRating || "No rating"}</p>
                                                    <p>Test: {item.attributes?.startDate}</p>
                                                    <p>Test2: {maljikanDataYearRelease}</p>
                                                    <p>Test3: {anilistDataYearRelease}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No results found on Kitsu.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No results found.</p>
            )}
            <Footer />
        </>
    );

}

export default Results2;