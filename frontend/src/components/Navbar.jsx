import React from "react";
import "../style/Navbar.css";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src="/logo.png" alt="AIRF Logo" />
          <div className="logo-text">
            <strong>AIRF</strong>
            <p>
              Association of International
              <br />
              Research Fellows
            </p>
          </div>
        </div>
      </div>

      <div className="navbar-middle">
        <button className="submit-btn1">Submit Manuscript</button>

        {/* Journals with submenu */}
        <div className="dropdown">
          <a href="#" className="dropbtn">Journals ▾</a>
          <div className="dropdown-content">
            <a href="#">Journal A</a>
            <a href="#">Journal B</a>
            <a href="#">Journal C</a>
          </div>
        </div>

        <a href="#">Latest Articles</a>

        {/* About with submenu */}
        <div className="dropdown">
          <a href="#" className="dropbtn">About ▾</a>
          <div className="dropdown-content">
            <a href="#">Who We Are</a>
            <a href="#">Our Mission</a>
            <a href="#">Advisory Board</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        {/* Guidelines with submenu */}
        <div className="dropdown">
          <a href="#" className="dropbtn">Guidelines ▾</a>
          <div className="dropdown-content">
            <a href="#">Author</a>
            <a href="#">Reviewers</a>
            <a href="#">Editor</a>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="search-btn">
          <FaSearch className="search-icon" />
        </button>
        <button className="login-btn">Sign Up / Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
