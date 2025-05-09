import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-placeholder">
            {/* Logo placeholder - you'll add this later */}
            <div className="logo-icon"></div>
          </div>
          <div className="brand-name">ReflexAI</div>
        </div>
        
        <nav className="header-nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/demo" className={location.pathname === '/demo' ? 'nav-link active' : 'nav-link'}>
            Demo
          </Link>
        </nav>
        
        <div className="header-right">
          <button className="account-button">Try Now!</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 