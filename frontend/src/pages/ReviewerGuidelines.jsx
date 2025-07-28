import React from 'react';
import '../style/AuthorGuidelines.css';
import { FaSearch } from "react-icons/fa";

const ReviewerGuidelines = () => {
  return (
    <section id="reviewer">
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
          <h1>Reviewer Guidelines</h1>
          <p>
            Welcome to the official reviewer portal of the Association of International
            Research Fellows Blog. This guide outlines the responsibilities, ethics, and
            evaluation criteria expected from our peer reviewers to maintain the highest
            academic standards.
          </p>
        </div>
      </div>

      <div className="author-guidelines-section">
        <div className="author-guidelines-content">
          <h2>Role of Reviewers</h2>
          <p>
            Reviewers play a vital role in maintaining the integrity of the publication process
            by providing constructive feedback, ensuring originality, and upholding scholarly quality.
          </p>
          <p>
            They should assess submissions based on clarity, methodology, significance, and relevance to the field.
          </p>

          <h2>Ethical Responsibilities</h2>
          <p>
            Reviewers must maintain confidentiality, avoid conflicts of interest, and provide objective evaluations.
            They should report any suspected ethical breaches, such as plagiarism or data fabrication.
          </p>

          <h2>Evaluation Criteria</h2>
          <p>
            Articles should be reviewed based on:
            
              Relevance to the journal's scope
              Originality and innovation
              Methodological rigor
              Clarity of writing and organization
              Appropriate referencing and citation
            
          </p>

          <h2>Timeliness and Communication</h2>
          <p>
            Reviewers are requested to complete their evaluations within the stipulated time
            to ensure a prompt publication process. In case of delays, timely communication with the editorial team is appreciated.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Manuscripts under review should be treated as confidential documents. Sharing or discussing the content
            with unauthorized persons is strictly prohibited.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewerGuidelines;
