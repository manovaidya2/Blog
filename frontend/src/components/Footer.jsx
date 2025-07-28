import React from 'react';
import '../style/Footer.css';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column about">
          <h2><span className="emoji">📄</span> AIRF</h2>
          <p className="subtext">Association of International<br />Research Fellows</p>
          <p className="desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="follow">Follow Us On :</p>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Journals</h3>
          <ul>
            <li>Journal for commerce....</li>
            <li>Journal for applied Science...</li>
            <li>Journal for engineering.....</li>
            <li>Journal for engineering.....</li>
            <li>Journal for Legal Research</li>
            <li>Journal for Humanities & Edu...</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>Editorial Board</li>
            <li>Peer Review Process</li>
            <li>Publication Ethics</li>
            <li>Abstracting and Indexing</li>
            <li>Article Processing Charges</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Guidelines</h3>
          <ul>
            <li>Authors</li>
            <li>Reviewers</li>
            <li>Editors</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>@All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
