import React from 'react';
import MovieCard from './MovieCard';

const MovieSlider = ({ title, movies, onAddToWatchlist, watchlist }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="slider-container">
      <h2 className="slider-title">{title}</h2>
      <div className="slider">
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ minWidth: '200px' }}>
            <MovieCard 
              movie={movie} 
              onAddToWatchlist={onAddToWatchlist}
              isAdded={watchlist.some(m => m.imdbID === movie.imdbID)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
