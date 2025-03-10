import { useState } from 'react';

const baseUrl = 'https://kitsu.io/api/edge';

async function searchAnime(title) {
    const url = `${baseUrl}/anime?filter[text]=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const searchResults = await response.json();
            return searchResults.data;
        } else {
            console.error('Network response was not ok:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

const AnimeSearch = () => {
    // Default title set to 'Naruto'
    const [title, setTitle] = useState('Naruto');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const animeData = await searchAnime(title);
        if (animeData) {
            setResults(animeData);
        } else {
            setResults([]);
            setError('No anime found with that title');
        }
        setLoading(false);
    };

    return (
        <div style={{ margin: '20px', fontFamily: 'sans-serif' }}>
            <h1>Anime Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter anime title"
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && !loading && <p>{error}</p>}

            {!loading && results.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    {results.map((anime) => (
                        <div
                            key={anime.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '10px',
                                marginBottom: '10px'
                            }}
                        >
                            <h2>
                                {anime.attributes.titles.en || anime.attributes.titles.en_jp}
                            </h2>
                            <p><strong>Synopsis:</strong> {anime.attributes.synopsis}</p>
                            <p><strong>Rating:</strong> {anime.attributes.averageRating}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnimeSearch;
