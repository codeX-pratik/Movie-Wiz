# Movie Wiz

Movie Wiz is a modern, responsive React application for browsing movies, viewing details, and managing a personal watchlist. It leverages the OMDB API for real-time movie data.

## Features

- **Movie Search**: Search for any movie using the OMDB API.
- **Hero Carousel**: A dynamic slideshow of featured classic movies on the home page.
- **Latest Releases**: Automatically fetches and displays the latest movies for the current year, sorted by release date.
- **Detailed Views**: View comprehensive information about any movie, including plot, director, actors, and ratings.
- **Watchlist**: Add movies to your personal watchlist, persisted via `localStorage`.
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop and mobile.

## Project Structure & Component Documentation

### Core

- **`src/main.jsx`**: The entry point of the application. It renders the root `App` component and imports the global CSS (`src/styles/global.css`).
- **`src/App.jsx`**: The main application component. It sets up the `react-router-dom` routing, defining routes for Home, Movie Detail, and Watchlist pages. It also includes the `Navbar` which persists across all pages.

### Components (`src/components/`)

- **`Navbar.jsx`**: The top navigation bar. It contains the "MovieWiz" logo, navigation links (Home, Watchlist), and a mock Login/Logout button. It uses standard CSS classes for styling.
- **`MovieCard.jsx`**: A reusable component that displays a single movie's poster, title, year, and type. It includes an "Add to Watchlist" button and handles the click navigation to the movie detail page.
- **`MovieSlider.jsx`**: A horizontal scrolling container used to display lists of movies (e.g., "Movie Suggestions"). It takes a title and a list of movies as props and renders them using `MovieCard` components.

### Pages (`src/pages/`)

- **`Home.jsx`**: The landing page.
    - **Search Bar**: Features a pill-shaped search bar with integrated search and clear icons.
    - **Hero Carousel**: Displays a rotating slideshow of featured movies when no search is active.
    - **Search Results**: Displays a grid of movies matching the user's search query.
    - **Movie Suggestions**: Shows a slider of the latest movies from the current year, sorted by release date.
    - **Caching**: Implements `sessionStorage` for search results and `localStorage` for the "Latest Releases" data to minimize API calls.
- **`MovieDetail.jsx`**: Displays detailed information about a specific movie. It fetches data based on the URL ID parameter and shows the poster, plot, genre tags, and credits. It also allows adding the movie to the watchlist.
- **`Watchlist.jsx`**: Displays the user's saved movies. It retrieves the watchlist from `localStorage` and renders them in a grid. Users can remove movies from this page.

### Utilities & Hooks

- **`src/api.js`**: Contains utility functions for interacting with the OMDB API (`searchMovies`, `getMovieDetail`). It handles API keys and error states.
- **`src/hooks/useWatchlist.js`**: A custom hook that manages the watchlist state. It handles reading from and writing to `localStorage` and provides `addMovie` and `removeMovie` functions.
- **`src/hoc/ProtectedRoute.jsx`**: A Higher-Order Component (HOC) designed to protect specific routes. Currently, it checks a mock `isLoggedIn` status in `localStorage` (though the Watchlist route is currently open for demonstration).

### Styling

- **`src/styles/global.css`**: The centralized stylesheet for the entire application. It contains:
    - CSS Variables for colors (`--primary-color`, `--background-color`, etc.).
    - Global resets and typography.
    - Utility classes for components (`.card`, `.hero-container`, `.search-box`, etc.).

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your OMDB API key:
    ```env
    VITE_OMDB_API_KEY=your_api_key_here
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Build for production**:
    ```bash
    npm run build
    ```

## Technologies Used

- **React**: UI Library
- **Vite**: Build tool
- **React Router**: Navigation
- **CSS3**: Styling (Variables, Flexbox, Grid)
- **OMDB API**: Movie Data

## Technical Requirements Implementation

This project fulfills the following technical requirements:

1.  **React Components**: Used throughout the application (e.g., `App.jsx`, `Home.jsx`, `Navbar.jsx`).
2.  **Props & State**:
    -   **Props**: Passed data between components (e.g., passing `movies` to `MovieSlider`, `movie` to `MovieCard`).
    -   **State**: Managed using `useState` for search queries, movie data, and loading states.
3.  **Hooks**:
    -   `useState`, `useEffect`: Used for state management and side effects (data fetching).
    -   `useContext`: Used in `WatchlistContext` to manage global state.
    -   **Custom Hooks**: `useWatchlist` (wraps the context) for cleaner component logic.
4.  **JSON Data Fetching**: Implemented in `api.js` using `fetch` to get data from the OMDB API.
5.  **React Router**:
    -   `Routes`, `Route`: Defined in `App.jsx` for navigation.
    -   `Link`: Used in `Navbar` and `MovieCard` for declarative navigation.
    -   `useParams`: Used in `MovieDetail` to get the movie ID from the URL.
6.  **Higher-Order Components (HOC)**: `ProtectedRoute.jsx` wraps the `Watchlist` route to simulate authentication protection.
7.  **Styling**: Uses a centralized **Global CSS** approach (`src/styles/global.css`) for consistent and maintainable styling across the app.
8.  **Context API**: Implemented `WatchlistContext` to manage the watchlist state globally, avoiding prop drilling.
9.  **Clean Folder Structure**:
    -   `src/components`: Reusable UI components.
    -   `src/pages`: Page-level components.
    -   `src/context`: Global state providers.
    -   `src/hooks`: Custom hooks.
    -   `src/styles`: CSS files.
    -   `src/hoc`: Higher-Order Components.
