import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
      <div className="nav-header">
        <Link to="/" className="logo">MovieWiz</Link>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/watchlist" className="nav-link" onClick={() => setIsMenuOpen(false)}>Watchlist</Link>
        <button onClick={handleAuth} className="auth-button">
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
