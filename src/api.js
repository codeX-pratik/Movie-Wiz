const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// Mock data for fallback
const MOCK_MOVIES = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0816692',
    Title: 'Interstellar',
    Year: '2014',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
  }
];

export const searchMovies = async (query) => {
  if (!API_KEY) {
    console.warn('No API Key found. Using mock data.');
    return MOCK_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'True') {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetail = async (id) => {
  if (!API_KEY) {
    return MOCK_MOVIES.find(m => m.imdbID === id) || null;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'True') {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    return null;
  }
};
