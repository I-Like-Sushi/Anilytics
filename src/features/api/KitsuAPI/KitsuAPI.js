const fetchKitsuData = async (query) => {
    try {
        const response = await fetch(
            `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`
        );
        if (response.ok) {
            const json = await response.json();
            console.log("Kitsu API Response:", json); // Logs the full response
            return json.data; // Return only the 'data' array
        } else {
            console.error("Error: Unable to fetch data from Kitsu API.");
        }
    } catch (err) {
        console.error("Kitsu API error:", err);
    }
};


fetchKitsuData("kimetsu no yaiba")
    .then(data => {
        if (data) {
            data.map(anime => {
                // Safely access the ja_jp title using optional chaining
                const japaneseTitle = anime?.attributes?.titles?.en_jp;
                if (japaneseTitle) {
                    console.log("Japanese Title:", japaneseTitle);
                } else {
                    console.log("ja_jp title not available for this entry.");
                }
            });
        }
    })
    .catch(err => {
        console.error("Error processing Kitsu API data:", err);
    });
