// // src/pages/Home.jsx
// import React from "react";
// import "../style/Latest.css";
// import BlogPage from './BlogPage';

// const LatestBlog = () => {
//   return (
//     <div className="home">
//       <div className="hero">
//         <div className="hero-overlay">
//           <h1>Latest Insights from Global <br />Research Fellows</h1>
//           <p>
//            Stay up to date with fresh perspectives, evidence-based analysis, and academic <br />
//            commentary from leading voices in science, medicine, and interdisciplinary <br/>
//            research. Discover what's new, relevant, and reshaping the research landscape.
//           </p>
//           <button className="explore-btn">Explore Our Articles</button>
//         </div>
//       </div>
//       <BlogPage />
//     </div>
//   );
// };

// export default LatestBlog;


import React from "react";
import "../style/Latest.css";
import "../style/BlogPage.css";

import blogImg1 from "../image/blog.jpg";
import blogImg2 from "../image/blog2.jpg";
import blogImg3 from "../image/blog3.jpg";

// BlogCard Component
const BlogCard = ({ img, title, description, authors }) => (
  <div className="blog-card">
    <img src={img} alt="blog" className="blog-img" />
    <div className="blog-content">
      <p className="meta">Latest Blog • 5 min read</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tags">
        <button className="tag">Research Article</button>
        <button className="tag">Written by {authors} Authors</button>
      </div>
    </div>
  </div>
);

// Top Researched Sidebar Component
const TopResearched = () => (
  <div className="top-researched">
    <h3>TOP RESEARCHED</h3>
    {Array(5).fill().map((_, i) => (
      <div key={i} className="top-item">
        <p className="top-title">Top Breakthroughs in Medical Science: A Year in Review</p>
        <p className="top-desc">CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs</p>
        <p className="top-meta">Posted 23 March, 2025 | Written by 4 Authors</p>
      </div>
    ))}
  </div>
);

// Final Combined Page
const LatestBlog = () => {
  return (
    <div className="home1">
      {/* Hero Section */}
      <div className="hero1">
        <div className="hero-overlay1">
          <h1>Latest Insights from Global <br />Research Fellows</h1>
          <p>
            Stay up to date with fresh perspectives, evidence-based analysis, and academic <br />
            commentary from leading voices in science, medicine, and interdisciplinary <br />
            research. Discover what's new, relevant, and reshaping the research landscape.
          </p>
          <button className="explore-btn1">Explore Our Articles</button>
        </div>
      </div>

      {/* Blog Cards + Sidebar */}
      <div className="blog-container">
        <div className="blog-left">
          <BlogCard
            img={blogImg1}
            title="CRISPR and Beyond: The Next Frontier in Gene Editing for Rare Diseases"
            description="CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs in gene editing and how they're offering hope for patients with previously untreatable genetic disorders — from clinical trials to ethical considerations."
            authors={5}
          />
          <BlogCard
            img={blogImg2}
            title="CRISPR and Beyond: The Next Frontier in Gene Editing for Rare Diseases"
            description="CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs in gene editing and how they're offering hope for patients with previously untreatable genetic disorders — from clinical trials to ethical considerations."
            authors={4}
          />
          <BlogCard
            img={blogImg3}
            title="What We Learned from COVID-19: Strengthening Global Public Health Research"
            description="The pandemic highlighted both the strengths and gaps in global health systems. This post analyzes key research-driven lessons from COVID-19 and explores how data sharing, vaccine development, and cross-border collaboration can shape future pandemic preparedness."
            authors={5}
          />
        </div>

        <div className="blog-right">
          <TopResearched />
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
