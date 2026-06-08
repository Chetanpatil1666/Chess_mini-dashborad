import React from 'react';
import './Navbar.css';

const Navbar = ({ onScrollTo }) => {
  return (
    <div className="navbar">
      <div className="navbar-brand" onClick={() => onScrollTo?.('home')} style={{ cursor: 'pointer' }}>DvChess</div>
      <ul className="navbar-links">
        <li><a href="#home" onClick={(e) => { e.preventDefault(); onScrollTo?.('home'); }}>Home</a></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); onScrollTo?.('about'); }}>About</a></li>
        <li><a href="#learn" onClick={(e) => { e.preventDefault(); onScrollTo?.('learn'); }}>Learn</a></li>
        <li><a href="#play" onClick={(e) => { e.preventDefault(); onScrollTo?.('play'); }}>Play</a></li>
      </ul>
      <button className="navbar-button" onClick={() => onScrollTo?.('play')}>Get Started</button>
    </div>
  );
};

export default Navbar;
