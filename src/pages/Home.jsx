import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieSlider from '../components/MovieSlider';
import { searchMovies, getMovieDetail } from '../api';
import { useWatchlist } from '../hooks/useWatchlist';
import { Link } from 'react-router-dom';

const FEATURED_IDS = [
  'tt1375666', // Inception
  'tt0816692', // Interstellar
  'tt0468569', // Dark Knight
  'tt0133093', // Matrix
  'tt0110912', // Pulp Fiction
  'tt0137523', // Fight Club
  'tt0109830', // Forrest Gump
  'tt0111161', // Shawshank
];

const Home = () => {
  const [query, setQuery] = useState(() => sessionStorage.getItem('searchQuery') || '');
  const [searchResults, setSearchResults] = useState(() => JSON.parse(sessionStorage.getItem('searchResults')) || []);
  
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestMovies, setLatestMovies] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { watchlist, addMovie } = useWatchlist();

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      sessionStorage.removeItem('searchQuery');
      sessionStorage.removeItem('searchResults');
      return;
    }

    setLoading(true);
    setError('');
    const results = await searchMovies(query);
    if (results && results.length > 0) {
      setSearchResults(results);
      sessionStorage.setItem('searchQuery', query);
      sessionStorage.setItem('searchResults', JSON.stringify(results));
    } else {
      setSearchResults([]);
      setError('No movies found.');
    }
    setLoading(false);
  };

  // Auto-slide effect
  useEffect(() => {
    if (featuredMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 5000); // Slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [featuredMovies]);

  // Fetch Cached Data or API
  useEffect(() => {
    const loadData = async () => {
      // 1. Featured Movies (Fetch 5 random ones)
      if (featuredMovies.length === 0) {
        const shuffled = [...FEATURED_IDS].sort(() => 0.5 - Math.random());
        const selectedIds = shuffled.slice(0, 5);
        const promises = selectedIds.map(id => getMovieDetail(id));
        const movies = await Promise.all(promises);
        setFeaturedMovies(movies);
      }

      // 2. Latest Movies (Current Year)
      const currentYear = new Date().getFullYear();
      const cacheKey = `cache_latest_${currentYear}_sorted`;
      const cachedLatest = localStorage.getItem(cacheKey);
      
      if (cachedLatest) {
        setLatestMovies(JSON.parse(cachedLatest));
      } else {
        const results = await searchMovies(currentYear.toString());
        if (results && results.length > 0) {
          // Fetch details for each movie to get the release date
          const detailPromises = results.map(movie => getMovieDetail(movie.imdbID));
          const detailedMovies = await Promise.all(detailPromises);
          
          // Filter out nulls and sort by Released date descending
          const sortedMovies = detailedMovies
            .filter(m => m && m.Released !== 'N/A')
            .sort((a, b) => new Date(b.Released) - new Date(a.Released));

          setLatestMovies(sortedMovies);
          localStorage.setItem(cacheKey, JSON.stringify(sortedMovies));
        }
      }
    };

    loadData();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <form onSubmit={handleSearch} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="search-box">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              className="search-input"
              type="text" 
              placeholder="Search for movies..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
            {query && (
              <svg 
                className="clear-icon" 
                onClick={() => {
                  setQuery('');
                  setSearchResults([]);
                  sessionStorage.removeItem('searchQuery');
                  sessionStorage.removeItem('searchResults');
                }}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
            <button className="search-button" type="submit">Search</button>
          </div>
        </form>
      </div>

      {loading && <p className="message">Loading...</p>}
      {error && <p className="message">{error}</p>}

      {/* Show Search Results if Query Exists */}
      {query && searchResults.length > 0 ? (
        <div className="grid">
          {searchResults.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onAddToWatchlist={addMovie}
              isAdded={watchlist.some(m => m.imdbID === movie.imdbID)}
            />
          ))}
        </div>
      ) : (
        /* Show Home Content if No Search */
        <>
          {featuredMovies.length > 0 && (
            <div className="hero-container">
              {featuredMovies.map((movie, index) => (
                <div 
                  key={movie.imdbID}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${movie.Poster !== 'N/A' ? movie.Poster : ''})` }}
                >
                  <div className="hero-content">
                    <h1 className="hero-title">{movie.Title}</h1>
                    <p className="hero-plot">{movie.Plot}</p>
                    <Link className="hero-button" to={`/movie/${movie.imdbID}`}>View Details</Link>
                  </div>
                </div>
              ))}
              
              <div className="hero-dots">
                {featuredMovies.map((_, index) => (
                  <div 
                    key={index} 
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          )}

          <MovieSlider 
            title="Movie Suggestions" 
            movies={latestMovies} 
            onAddToWatchlist={addMovie} 
            watchlist={watchlist} 
          />
        </>
      )}
    </div>
  );
};

export default Home;
