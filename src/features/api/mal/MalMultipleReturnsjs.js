// HIDE YOUR KEY ONCE YOU LEARN TO DO SO IN BACK-END!!!! //

const CLIENT_ID = "733484f0643c2a1324bd67acc8d28305";

// HIDE YOUR KEY ONCE YOU LEARN TO DO SO IN BACK-END!!!! //








// The title you're searching for
const query = 'Naruto';

// Adjust the limit to fetch multiple results
const url = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(query)}&limit=5&fields=id,title,synopsis,mean,main_picture`;

fetch(url, {
    method: 'GET',
    headers: {
        'X-MAL-CLIENT-ID': CLIENT_ID
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handling multiple anime results
        const animeList = data.data; // This is an array of anime objects.

        animeList.forEach((animeWrapper, index) => {
            const anime = animeWrapper.node;
            console.log(`--- Anime ${index + 1} ---`);
            console.log('Title:', anime.title);
            console.log('Synopsis:', anime.synopsis || 'No synopsis available.');
            console.log('Average Score:', anime.mean || 'N/A');
            console.log('Image URL:', anime.main_picture?.medium || 'No image available.');
            console.log('------------------------\n');
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
