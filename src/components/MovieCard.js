import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Placeholder si no hay datos de película
  const title = movie?.title || "Título de Película";
  const posterUrl = movie?.posterUrl || "https://placehold.co/300x450/1A1A1A/B08D57?text=Poster";
  const genre = movie?.genre || "Género";
  const duration = movie?.duration || "0h 00min";

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={posterUrl} alt={title} className="movie-poster" />
        <div className="poster-overlay">
          <button className="play-trailer-button" aria-label="Ver trailer">▶</button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{genre} • {duration}</p>
      </div>
      <div className="card-bottom-glow"></div>
    </div>
  );
};

export default MovieCard;