// HIDE YOUR KEY ONCE YOU LEARN TO DO SO IN BACK-END!!!! //

const CLIENT_ID = "";

// HIDE YOUR KEY ONCE YOU LEARN TO DO SO IN BACK-END!!!! //







// The title you're searching for
const query = 'Naruto';

// Constructing the API URL with query parameters
const url = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(query)}&limit=1&fields=id,title,synopsis,mean,main_picture`;

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
        // Handling the API response data
        const anime = data.data[0].node;
        console.log('Title:', anime.title);
        console.log('Synopsis:', anime.synopsis);
        console.log('Average Score:', anime.mean);
        console.log('Image URL:', anime.main_picture.medium);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
