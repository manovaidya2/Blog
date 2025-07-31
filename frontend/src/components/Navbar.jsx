  import React, { useState, useEffect } from "react";
  import "../style/Navbar.css";
  import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import SubmitModal from "./SubmitModal";
import axios from "axios";

  const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
const [journals, setJournals] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/journals/getJournals")
    .then(res => setJournals(res.data))
    .catch(err => console.error("Failed to load journals", err));
}, []);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const handleLogin = () => {
        const newUser = localStorage.getItem("user");
        if (newUser) setUser(JSON.parse(newUser));
      };

      const handleLogout = () => setUser(null);

      window.addEventListener("user-login", handleLogin);
      window.addEventListener("user-logout", handleLogout);

      return () => {
        window.removeEventListener("user-login", handleLogin);
        window.removeEventListener("user-logout", handleLogout);
      };
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("user");
      setUser(null);
      setOpenDropdown(null);
      window.dispatchEvent(new Event("user-logout"));
    };

    const toggleDropdown = (name) => {
      setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
      <nav className="navbar">
        {/* Mobile Top Bar */}
        <div className="navbar-mobile-top mobile-only">
          <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className="mobile-logo-text"><strong>AIRF</strong></div>
          <div className="mobile-actions">
            <button className="search-btn"><FaSearch className="search-icon" /></button>
            {user ? (
              <span className="mobile-user-name">Hi, {user.name}</span>
            ) : (
              <Link to="/auth" className="login-btn">Sign Up / Login</Link>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-sidebar-content">
            <div className="mobile-sidebar-header">
              <strong>AIRF</strong>
              <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <button className="mobile-submit-btn" onClick={openModal}>Submit Manuscript</button>

            <div className="mobile-dropdown">
              <span className="mobile-dropbtn" onClick={() => toggleDropdown("journals")}>Journals ▾</span>
              {openDropdown === "journals" && (
                <div className="mobile-dropdown-content">
                  <a href="#">Journal A</a>
                  <a href="#">Journal B</a>
                  <a href="#">Journal C</a>
                </div>
              )}
            </div>

            <a className="mobile-link" href="/latest-blog">Latest Articles</a>
            <a className="mobile-link" href="/">Home</a>

            <div className="mobile-dropdown">
              <span className="mobile-dropbtn" onClick={() => toggleDropdown("about")}>About ▾</span>
              {openDropdown === "about" && (
                <div className="mobile-dropdown-content">
                  <a href="/about-this">About This Journal</a>
                  <a href="/editorial-board">Editorial Board</a>
                  <a href="/peer-reviewer">Peer Review Process</a>
                </div>
              )}
            </div>

            <div className="mobile-dropdown">
              <span className="mobile-dropbtn" onClick={() => toggleDropdown("guidelines")}>Guidelines ▾</span>
              {openDropdown === "guidelines" && (
                <div className="mobile-dropdown-content">
                  <Link to="/author-guidelines">Author</Link>
                  <Link to="/reviewer-guidelines">Reviewers</Link>
                  <a href="/editor-guidelines">Editor</a>
                  <a href="/abstracting">Abstracting And Indexing</a>
                </div>
              )}
            </div>

            {user ? (
              <div className="mobile-user-logout">
                <span className="mobile-user-name">Hi, {user.name}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/auth" className="mobile-login-btn">Sign Up / Login</Link>
            )}
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="navbar-left desktop-only">
          <div className="logo-text">
            <strong>AIRF</strong>
            <p>Association of International<br />Research Fellows</p>
          </div>
        </div>

        <div className="navbar-middle desktop-only">
          <button className="submit-btn1" onClick={openModal}>Submit Manuscript</button>
          <a className="mobile-link" href="/">Home</a>

   <div className="journal-dropdown">
  <span className="journal-dropbtn">Journals ▾</span>
  <div className="journal-dropdown-content">
    {journals.map(j => (
      <Link key={j._id} to={`/journal/${j._id}`}>{j.name}</Link>
    ))}
  </div>
</div>


          <a href="/latest-blog">Latest Articles</a>

          <div className="dropdown-wide">
            <span className="dropbtn">About ▾</span>
            <div className="dropdown-content-wide">
              <a href="/about-this">About This Journal</a>
              <a href="/editorial-board">Editorial Board</a>
              <a href="/peer-reviewer">Peer Review Process</a>
              <a href="/publication-ethics">Publication Ethics</a>
              <a href="/abstracting">Abstracting & Indexing</a>
              <a href="/article-processing">Article Processing Charges</a>
            </div>
          </div>

          <div className="dropdown">
            <span className="dropbtn">Guidelines ▾</span>
            <div className="dropdown-content">
              <Link to="/author-guidelines">Author</Link>
              <Link to="/reviewer-guidelines">Reviewers</Link>
              <a href="/editor-guidelines">Editor</a>
            </div>
          </div>
        </div>

        <div className="navbar-right desktop-only">
          <button className="search-btn"><FaSearch className="search-icon" /></button>
          {user ? (
            <div
              className="user-dropdown"
              onMouseEnter={() => setOpenDropdown("user")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="user-name">Hi, {user.name}▾</span>
              {openDropdown === "user" && (
                <div className="dropdown-logout">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <button className="login-btn">Sign Up / Login</button>
            </Link>
          )}
        </div>

        <SubmitModal isOpen={isModalOpen} onClose={closeModal} />
      </nav>
    );
  };

  export default Navbar;
