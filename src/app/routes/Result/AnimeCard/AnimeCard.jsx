import './AnimeCard.css';

function AnimeCard({ anime }) {
    return (
        <div className="anime-card">
            <h3>{anime.title}</h3>
            <p>{anime.synopsis}</p> {/* Short description of the anime */}
            {anime.images?.jpg?.image_url && (
                <img
                    src={anime.images.jpg.image_url}
                    alt={`${anime.title} Poster`}
                    width="150"
                    style={{ borderRadius: '4px' }}
                />
            )}
        </div>
    );
}

export default AnimeCard;