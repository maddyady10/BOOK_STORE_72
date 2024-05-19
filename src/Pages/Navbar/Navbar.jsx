import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/src\Assets\Images\booklogo1.jpg"
            // alt="Logo"
            className="logo-img"
          />
          Legends Market Place
        </Link>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for books..."
            className="navbar-search-input"
          />
          <button className="navbar-search-button">Search</button>
        </div>
        <div className="navbar-links">
          <Link to="/pages" className="navbar-link">
            Pages
          </Link>
          <Link to="/shop" className="navbar-link">
            Shop
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
