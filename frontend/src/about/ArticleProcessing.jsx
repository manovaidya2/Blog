import React from 'react';
import '../style/AuthorGuidelines.css';
import { FaSearch } from "react-icons/fa";

const ArticleProcessing = () => {
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
          <h1>Article Processing Charges</h1>
          <p>
            The Association of International Research Fellows (AIRF) Blog is a non-profit, open-access publishing platform dedicated to freely sharing high-quality academic writing and research summaries. 
            To maintain open access and cover essential publishing costs, we apply a modest Article Processing Charge (APC) for accepted submissions.
          </p>
        </div>
      </div>

      <div className="author-guidelines-section">
        <div className="author-guidelines-content">

          <h2>What the APC Covers</h2>
          <p>
            The APC helps cover editorial workflows, digital publishing infrastructure, DOI registration, and archiving. 
            It supports professional copyediting, layout formatting, platform maintenance, and the long-term accessibility of articles.
          </p>
          <p>
            AIRF does not charge for submission or peer review. Charges only apply after a manuscript is accepted for publication.
          </p>

          <h2>APC Rates</h2>
          <p>
            The current APC is set at a modest flat rate to ensure affordability while sustaining operations. 
            Specific rates are listed on the submission page and may vary slightly depending on article type and length.
          </p>
          <p>
            All rates are reviewed annually and kept as low as possible to promote accessibility.
          </p>

          <h2>Waivers & Discounts</h2>
          <p>
            We offer APC waivers or discounts for authors from low- and lower-middle-income countries, early-career researchers, and students. 
            Requests are considered on a case-by-case basis and should be submitted at the time of acceptance.
          </p>
          <p>
            AIRF is committed to ensuring that publishing opportunities are not limited by financial barriers.
          </p>

          <h2>Payment Process</h2>
          <p>
            Upon article acceptance, authors receive an invoice with payment instructions. 
            Payments can be made via credit card, bank transfer, or other supported methods.
          </p>
          <p>
            All transactions are processed securely, and receipts are issued for institutional reimbursement if required.
          </p>

          <h2>No Hidden Charges</h2>
          <p>
            AIRF is transparent in all publishing fees. There are no hidden costs for color figures, supplementary materials, or hosting.
          </p>
          <p>
            Everything included in the publishing workflow—from DOI assignment to metadata indexing—is covered by the APC.
          </p>

          <h2>Contact & Inquiries</h2>
          <p>
            For any questions related to APC policies, waiver eligibility, or payment concerns, please contact our editorial office at 
            <a href="mailto:editorial@airf.blog"> editorial@airf.blog</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleProcessing;
