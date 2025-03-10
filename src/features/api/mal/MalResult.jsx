import{ useState } from 'react';

function MALAnimeSearch () {
    const [query, setQuery] = useState('');
    const [anime, setAnime] = useState(null);
    const CLIENT_ID = '';

    const fetchAnime = async () => {
        if (!query) return;

        const url = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(
            query
        )}&limit=1&fields=id,title,synopsis,mean,main_picture`;

        try {
            const response = await fetch(url, {
                headers: {
                    'X-MAL-CLIENT-ID': CLIENT_ID,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setAnime(data.data[0].node);
            } else {
                setAnime(null);
                alert('No results found.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while fetching data.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter anime title"
            />
            <button onClick={fetchAnime}>Search</button>

            {anime ? (
                <div>
                    <h1>{anime.title}</h1>
                    <img src={anime.main_picture.medium} alt={anime.title} />
                    <p>
                        <strong>Average Score:</strong> {anime.mean}
                    </p>
                    <p>{anime.synopsis}</p>
                </div>
            ) : (
                <p>Type a title and click search.</p>
            )}
        </div>
    );
};

export default MALAnimeSearch;
