import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onAddToWatchlist, isAdded }) => {
  return (
    <div className="card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img 
          className="poster" 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
          alt={movie.Title} 
        />
      </Link>
      <div className="card-info">
        <h3 className="card-title">{movie.Title}</h3>
        <div className="card-meta">
          <span>{movie.Year}</span>
          <span>{movie.Type}</span>
        </div>
        <button 
          className="card-button" 
          onClick={() => onAddToWatchlist(movie)} 
          disabled={isAdded}
        >
          {isAdded ? 'Added' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
