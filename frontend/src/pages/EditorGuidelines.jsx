import React from 'react';
import '../style/AuthorGuidelines.css'; // Reusing styles for now

const EditorialBoard = () => {
  return (
    <section id="editorial-board">
      <div className="author-top-strip">
        <div className="top-left">
          <span className="issue-label">ISSUES</span>
        </div>
        <div className="top-right">
          <button className="search-journal-button">
            Search for Journal
          </button>
        </div>
      </div>

      <div className="author-hero">
        <div className="hero-content">
          <h1>Editorial Board</h1>
          <p>
            The Association of International Research Fellows Blog (AIRF) is guided by a diverse and dedicated editorial board composed of senior researchers, early-career scholars, and domain experts from around the world. Our editors ensure that every article aligns with AIRF’s academic standards, editorial ethics, and multidisciplinary vision.
          </p>
        </div>
      </div>

      <div className="author-guidelines-section">
        <div className="author-guidelines-content">
          <h2>Editor-in-Chief Section</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...</p>

          <h2>Associate Editors</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...</p>

          <h2>International Advisors</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...</p>

          <h2>Editorial Responsibilities Summary</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>

          <h2>Interested in Joining Our Editorial Team</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>

          <h2>Contact & Inquiries</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</p>
        </div>
      </div>
    </section>
  );
};

export default EditorialBoard;
