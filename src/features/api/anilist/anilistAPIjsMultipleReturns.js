// Define the GraphQL query
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
      description
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

// Define the query variables
const variables = {
    search: "Naruto" // Replace with the title you want to search
};

// API request configuration
const url = 'https://graphql.anilist.co';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: variables
    })
};

// Make the HTTP request
fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);

    const mediaArray = data.data.Page.media;

    if (mediaArray.length > 0) {
        mediaArray.forEach((media) => {
            console.log("ID:", media.id);
            console.log("Title (English):", media.title.english);
            console.log("Title (Romaji):", media.title.romaji);
            console.log("Description:", media.description);
            console.log("Episodes:", media.episodes);
            console.log("Average Score:", media.averageScore);
            console.log("Cover Image:", media.coverImage.medium);
            console.log("-----------------------------");
        });
    } else {
        console.log("No results found.");
    }
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
