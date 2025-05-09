import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import AnimatedLogo from './AnimatedLogo';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <AnimatedLogo />
            </div>
            <div className="brand-name">ReflexAI</div>
          </Link>
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