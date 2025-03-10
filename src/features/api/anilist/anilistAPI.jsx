import { useState } from 'react';

function AnilistAPI () {
    const [searchTerm, setSearchTerm] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError('');
        setAnimeList([]);

        const query = `
      query ($search: String) {
        Page (perPage: 5) {
          media (search: $search, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            description(asHtml: false)
            episodes
            coverImage {
              large
              medium
            }
            averageScore
          }
        }
      }
    `;

        const variables = { search: searchTerm };

        try {
            const response = await fetch('https://graphql.anilist.co', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                const media = result.data.Page.media;
                if (media.length > 0) {
                    setAnimeList(media);
                } else {
                    setError('No results found.');
                }
            } else {
                new Error(result.errors[0]?.message || 'Error fetching data.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Anime Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter anime title"
                    style={{ padding: '8px', width: '300px', marginRight: '10px' }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                {animeList.map((anime) => (
                    <div key={anime.id} style={{ borderBottom: '1px solid #ccc', marginTop: '20px' }}>
                        <h2>{anime.title.english || anime.title.romaji}</h2>
                        <img src={anime.coverImage.medium} alt={anime.title.romaji} />
                        <p><strong>Episodes:</strong> {anime.episodes || 'N/A'}</p>
                        <p><strong>Average Score:</strong> {anime.averageScore || 'N/A'}</p>
                        <p dangerouslySetInnerHTML={{ __html: anime.description || 'No description available.' }}></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnilistAPI;
