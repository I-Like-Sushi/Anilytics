import { useState } from 'react';

function AnimeSearch () {
    const baseUrl = 'https://api.jikan.moe/v4/anime';

    const [query, setQuery] = useState(''); // Name of anime. //
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generic fetch function with a retry mechanism and exponential backoff
    async function fetchWithRetry(url, retries = 5, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.json();
                } else if (response.status === 429) {
                    // Rate limit error, wait and then retry
                    console.log(`Rate limit hit, retrying in ${delay}ms...`);
                    await new Promise((res) => setTimeout(res, delay));
                    delay *= 2;
                } else {
                    new Error(`Fetch error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2;
            }
        }
        throw new Error('Max retries reached');
    }

    // Function to fetch staff information for a given anime ID
    async function fetchStaffForAnime(animeId) {
        const staffUrl = `${baseUrl}/${animeId}/staff`;
        try {
            const data = await fetchWithRetry(staffUrl);
            const staffList = data.data;
            return staffList ? staffList : [];
        } catch (error) {
            console.error('Error fetching staff information:', error);
            return [];
        }
    }

    // Function to fetch voice actor information for a given anime ID
    async function fetchVoiceActorsForAnime(animeId) {
        const voiceActorsUrl = `${baseUrl}/${animeId}/characters`;
        try {
            const data = await fetchWithRetry(voiceActorsUrl);
            const characterList = data.data;
            return characterList ? characterList : [];
        } catch (error) {
            console.error('Error fetching voice actor information:', error);
            return [];
        }
    }

    // Function to search for anime by title and fetch staff plus voice actor info
    async function searchAnimeAndStaff() {
        setLoading(true);
        setError(null);
        setResults([]);

        const searchUrl = `${baseUrl}?q=${encodeURIComponent(query)}&limit=3`;
        try {
            const data = await fetchWithRetry(searchUrl);
            const animeList = data.data;

            if (!animeList || animeList.length === 0) {
                console.log(`No anime found with the title: ${query}`);
                setError(`No anime found with the title: ${query}`);
                setLoading(false);
                return;
            }

            // For each anime, call the staff and voice actor endpoints and attach the data to the anime object.
            const updatedAnimeList = [];
            for (const anime of animeList) {
                console.log('--- Anime ---');
                console.log('Title:', anime.title);

                const staff = await fetchStaffForAnime(anime.mal_id);
                const voiceActors = await fetchVoiceActorsForAnime(anime.mal_id);
                updatedAnimeList.push({ ...anime, staff, voiceActors });
            }
            setResults(updatedAnimeList);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while searching for anime.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>Anime Search</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="query">Anime Title: </label>
                <input
                    id="query"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={searchAnimeAndStaff} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.map((anime) => (
                <div
                    key={anime.mal_id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '20px'
                    }}
                >
                    <h2>{anime.title}</h2>
                    <p>
                        <strong>ID:</strong> {anime.mal_id}
                    </p>
                    <p>
                        <strong>Synopsis:</strong>{' '}
                        {anime.synopsis || 'No synopsis available.'}
                    </p>
                    <p>
                        <strong>Average Score:</strong> {anime.score || 'N/A'}
                    </p>
                    {anime.images &&
                        anime.images.jpg &&
                        anime.images.jpg.image_url && (
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                width="150"
                                style={{ borderRadius: '4px' }}
                            />
                        )}

                    <h3>Staff Members</h3>
                    {anime.staff && anime.staff.length > 0 ? (
                        anime.staff.map((staff, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <p>
                                    <strong>Name:</strong> {staff.person.name}
                                </p>
                                <p>
                                    <strong>Role:</strong> {staff.positions.join(', ')}
                                </p>
                                {staff.person.images &&
                                    staff.person.images.jpg &&
                                    staff.person.images.jpg.image_url && (
                                        <img
                                            src={staff.person.images.jpg.image_url}
                                            alt={staff.person.name}
                                            width="100"
                                            style={{ borderRadius: '4px' }}
                                        />
                                    )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No staff information available.</p>
                    )}

                    <h3>Voice Actors</h3>
                    {anime.voiceActors && anime.voiceActors.length > 0 ? (
                        anime.voiceActors.map((character, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <p>
                                    <strong>Character Name:</strong>{' '}
                                    {character.character.name}
                                </p>
                                {character.voice_actors &&
                                character.voice_actors.length > 0 ? (
                                    character.voice_actors.map((voiceActor, vaIndex) => (
                                        <div
                                            key={vaIndex}
                                            style={{
                                                marginLeft: '20px',
                                                marginBottom: '5px'
                                            }}
                                        >
                                            <p>
                                                <strong>Voice Actor Name:</strong>{' '}
                                                {voiceActor.person.name}
                                            </p>
                                            <p>
                                                <strong>Language:</strong>{' '}
                                                {voiceActor.language}
                                            </p>
                                            {voiceActor.person.images &&
                                                voiceActor.person.images.jpg &&
                                                voiceActor.person.images.jpg.image_url && (
                                                    <img
                                                        src={voiceActor.person.images.jpg.image_url}
                                                        alt={voiceActor.person.name}
                                                        width="100"
                                                        style={{ borderRadius: '4px' }}
                                                    />
                                                )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No voice actor info available.</p>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No voice actor information available.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AnimeSearch;
