import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail } from '../api';
import { useWatchlist } from '../hooks/useWatchlist';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { watchlist, addMovie } = useWatchlist();

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getMovieDetail(id);
      setMovie(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="detail-container">Loading...</div>;
  if (!movie) return <div className="detail-container">Movie not found.</div>;

  const isAdded = watchlist.some(m => m.imdbID === movie.imdbID);

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to Search</Link>
      <div className="detail-content">
        <img 
          className="detail-poster" 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
          alt={movie.Title} 
        />
        <div className="detail-info">
          <h1 className="detail-title">{movie.Title}</h1>
          <div className="detail-meta">
            <span>{movie.Year}</span>
            <span>{movie.Rated}</span>
            <span>{movie.Runtime}</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            {movie.Genre && movie.Genre.split(', ').map(g => (
              <span key={g} className="tag" style={{ marginRight: '8px' }}>{g}</span>
            ))}
          </div>
          <p className="detail-plot">{movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <br />
          <button 
            className="detail-button" 
            onClick={() => addMovie(movie)} 
            disabled={isAdded}
          >
            {isAdded ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
