import "./characters.css";

export default function Character({ char }) {
  return (
    <li className="character">
      <div className="character-image">
        <img src={char.imageUrl} alt="character" />
      </div>
      <div className="character-details">
        <h2>
          <a href={char.url}>{char.name}</a>({char._id})
        </h2>

        <div className="movie-list">
          {[
            ...char.tvShows,
            ...char.films,
            ...char.shortFilms,
            ...char.videoGames
          ].map((movie) => (
            <div key={movie}>{movie}</div>
          ))}
        </div>
      </div>
    </li>
  );
}
