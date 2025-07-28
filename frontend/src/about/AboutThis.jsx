import React from 'react';
import '../style/AuthorGuidelines.css';
import { FaSearch } from "react-icons/fa";

const AboutThis = () => {
  return (
    <section id="author">
      <div className="author-top-strip">
        <div className="top-left">
          <span className="issue-label">ISSUES</span>
        </div>
        <div className="top-right">
          <button className="search-journal-button">
            <FaSearch style={{ marginRight: "6px" }} />
            Search for Journal
          </button>
        </div>
      </div>

      <div className="author-hero">
        <div className="hero-content">
          <h1>About This Journal</h1>
          <p>
            Welcome to the submission hub for contributors to the Association of International
            Research Fellows Blog. We invite thought leaders, researchers, and fellows to share
            high-quality, evidence-based content that contributes to scholarly discussions and
            promotes global academic engagement.
          </p>
        </div>
      </div>

      <div className="author-guidelines-section">
        <div className="author-guidelines-content">

          <h2>Mission Statement</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>Scope of the Journal Blog</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

          <h2>Contributors</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

          <h2>Editorial Oversight</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

          <h2>Open Access & Licensing</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

          <h2>Contact & Inquiries</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutThis;
