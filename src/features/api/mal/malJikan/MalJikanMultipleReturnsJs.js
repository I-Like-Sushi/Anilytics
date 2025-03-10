const baseUrl = 'https://api.jikan.moe/v4/anime';

async function fetchWithRetry(url, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else if (response.status === 429) {
                // Rate limit error, wait and retry
                console.log(`Rate limit hit, retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff
            } else {
                throw new Error(`Fetch error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            await new Promise(res => setTimeout(res, delay));
            delay *= 2; // Exponential backoff
        }
    }
    throw new Error('Max retries reached');
}

// Function to search for anime by title and fetch staff and voice actor information
async function searchAnimeAndStaff(title, limit = 5) {
    const searchUrl = `${baseUrl}?q=${encodeURIComponent(title)}&limit=${limit}`;

    try {
        const data = await fetchWithRetry(searchUrl);
        const animeList = data.data; // Array of anime results

        if (animeList.length === 0) {
            console.log('No anime found with the title:', title);
            return;
        }

        for (const anime of animeList) {
            console.log('--- Anime ---');
            console.log('Title:', anime.title);
            console.log('ID:', anime.mal_id);
            console.log('Synopsis:', anime.synopsis || 'No synopsis available.');
            console.log('Average Score:', anime.score || 'N/A');
            console.log('Image URL:', anime.images.jpg.image_url || 'No image available.');

            await fetchStaffForAnime(anime.mal_id);
            await fetchVoiceActorsForAnime(anime.mal_id);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch staff information for a given anime ID
async function fetchStaffForAnime(animeId) {
    const staffUrl = `${baseUrl}/${animeId}/staff`;

    try {
        const data = await fetchWithRetry(staffUrl);
        const staffList = data.data; // Array of staff members

        if (staffList.length === 0) {
            console.log('No staff information available for Anime ID:', animeId);
        } else {
            console.log('\nStaff Members for Anime ID ' + animeId + ':');
            staffList.forEach((staff, index) => {
                console.log('Staff Member ' + (index + 1) + ':');
                console.log('Name:', staff.person.name);
                console.log('Role:', staff.positions.join(', '));
                console.log('Image URL:', staff.person.images.jpg.image_url);
                console.log('-----------------------');
            });
        }
        console.log('------------------------\n');
    } catch (error) {
        console.error('Error fetching staff information:', error);
    }
}

// Function to fetch voice actor information for a given anime ID
async function fetchVoiceActorsForAnime(animeId) {
    const voiceActorsUrl = `${baseUrl}/${animeId}/characters`;

    try {
        const data = await fetchWithRetry(voiceActorsUrl);
        const characterList = data.data; // Array of characters

        if (characterList.length === 0) {
            console.log('No voice actor information available for Anime ID:', animeId);
        } else {
            console.log('\nVoice Actors for Anime ID ' + animeId + ':');
            characterList.forEach((character, index) => {
                console.log('Character ' + (index + 1) + ':');
                console.log('Character Name:', character.character.name);
                character.voice_actors.forEach((voiceActor, vaIndex) => {
                    console.log('Voice Actor ' + (vaIndex + 1) + ':');
                    console.log('Name:', voiceActor.person.name);
                    console.log('Language:', voiceActor.language);
                    console.log('Image URL:', voiceActor.person.images.jpg.image_url);
                });
                console.log('-----------------------');
            });
        }
        console.log('------------------------\n');
    } catch (error) {
        console.error('Error fetching voice actor information:', error);
    }
}

// Example usage:
const animeTitle = 'Naruto'; // Replace with any anime title
searchAnimeAndStaff(animeTitle, 3); // Search for 3 anime results
