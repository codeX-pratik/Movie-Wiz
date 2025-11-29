import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }
    window.location.reload(); 
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">MovieWiz</Link>
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        <button onClick={handleAuth} className="auth-button">
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
