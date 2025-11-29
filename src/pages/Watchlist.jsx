import React from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { watchlist, removeMovie } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="container">
        <h1 className="watchlist-header">My Watchlist</h1>
        <div className="empty-state">
          <h2>Your watchlist is empty</h2>
          <p>Go back to <Link to="/" style={{ color: 'var(--primary-color)' }}>Home</Link> to add some movies!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="watchlist-header">My Watchlist</h1>
      <div className="grid">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="card">
            <Link to={`/movie/${movie.imdbID}`}>
              <img 
                className="poster" 
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
                alt={movie.Title} 
              />
            </Link>
            <div className="card-info">
              <h3 className="card-title">{movie.Title}</h3>
              <button 
                className="remove-button" 
                onClick={() => removeMovie(movie.imdbID)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
