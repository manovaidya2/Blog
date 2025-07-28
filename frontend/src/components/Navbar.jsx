import React, { useState } from "react";
import "../style/Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="navbar">
      {/* Top row - visible only on mobile */}
      <div className="navbar-mobile-top mobile-only">
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="mobile-logo-text">
          <strong>AIRF</strong>
        </div>
        <div className="mobile-actions">
          <button className="search-btn">
            <FaSearch className="search-icon" />
          </button>
          <button className="login-btn">Sign Up / Login</button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <strong>AIRF</strong>
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <button className="mobile-submit-btn">Submit Manuscript</button>

          <div className="mobile-dropdown">
            <span className="mobile-dropbtn" onClick={() => toggleDropdown("journals")}>
              Journals ▾
            </span>
            {openDropdown === "journals" && (
              <div className="mobile-dropdown-content">
                <a href="#">Journal A</a>
                <a href="#">Journal B</a>
                <a href="#">Journal C</a>
              </div>
            )}
          </div>

          <a className="mobile-link" href="#">
            Latest Articles
          </a>

          <div className="mobile-dropdown">
            <span className="mobile-dropbtn" onClick={() => toggleDropdown("about")}>
              About ▾
            </span>
            {openDropdown === "about" && (
              <div className="mobile-dropdown-content">
                <a href="#">Who We Are</a>
                <a href="#">Our Mission</a>
                <a href="#">Advisory Board</a>
                <a href="#">Contact Us</a>
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <span className="mobile-dropbtn" onClick={() => toggleDropdown("guidelines")}>
              Guidelines ▾
            </span>
            {openDropdown === "guidelines" && (
              <div className="mobile-dropdown-content">
                <Link to="/author-guidelines">Author</Link>
                <a href="#">Reviewers</a>
                <a href="#">Editor</a>
              </div>
            )}
          </div>

          <button className="mobile-login-btn">Sign Up / Login</button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="navbar-left desktop-only">
        <div className="logo-text">
          <strong>AIRF</strong>
          <p>
            Association of International
            <br />
            Research Fellows
          </p>
        </div>
      </div>

      <div className="navbar-middle desktop-only">
        <button className="submit-btn1">Submit Manuscript</button>

        <div className="dropdown">
          <span className="dropbtn">Journals ▾</span>
          <div className="dropdown-content">
            <a href="#">Journal A</a>
            <a href="#">Journal B</a>
            <a href="#">Journal C</a>
          </div>
        </div>

        <a href="#">Latest Articles</a>

        <div className="dropdown">
          <span className="dropbtn">About ▾</span>
          <div className="dropdown-content">
            <a href="#">Who We Are</a>
            <a href="#">Our Mission</a>
            <a href="#">Advisory Board</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="dropdown">
          <span className="dropbtn">Guidelines ▾</span>
          <div className="dropdown-content">
            <Link to="/author-guidelines">Author</Link>
            <a href="#">Reviewers</a>
            <a href="#">Editor</a>
          </div>
        </div>
      </div>

      <div className="navbar-right desktop-only">
        <button className="search-btn">
          <FaSearch className="search-icon" />
        </button>
        <button className="login-btn">Sign Up / Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
