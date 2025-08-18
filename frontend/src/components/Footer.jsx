import React, { useEffect, useState } from 'react';
import '../style/Footer.css';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import logo from "../image/logo1.png";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.airfresearch.com/api/journals/getJournals")
      .then(res => setJournals(res.data))
      .catch(err => console.error("Failed to load journals in footer", err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About section */}
        <div className="footer-column about">
          <h2>
            <span className="emoji">
              <img src={logo} alt="AIRF Logo" className="inline-logo" />
            </span>
          
          </h2>
          <p className="desc">
            Association of International Research Fellows promoting global knowledge sharing.
          </p>
          <p className="follow">Follow Us On :</p>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
        </div>

        {/* Journals */}
        <div className="footer-column">
          <h3>Journals</h3>
          <ul>
            {journals.map(journal => (
              <li key={journal._id}>
                <Link to={`/journal/${journal._id}`}>{journal.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Links */}
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li><Link to="/about-this">About This Journal</Link></li>
            <li><Link to="/editorial-board">Editorial Board</Link></li>
            <li><Link to="/peer-reviewer">Peer Review Process</Link></li>
            <li><Link to="/publication-ethics">Publication Ethics</Link></li>
            <li><Link to="/abstracting">Abstracting and Indexing</Link></li>
            <li><Link to="/article-processing">Article Processing Charges</Link></li>
          </ul>
        </div>

        {/* Guidelines Links */}
        <div className="footer-column">
          <h3>Guidelines</h3>
          <ul>
            <li><Link to="/author-guidelines">Authors</Link></li>
            <li><Link to="/reviewer-guidelines">Reviewers</Link></li>
            <li><Link to="/editor-guidelines">Editors</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AIRF. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
