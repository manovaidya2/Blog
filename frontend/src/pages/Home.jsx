import React, { useRef } from "react";
import "../style/Home.css";
import BlogPage from './BlogPage';

const Home = () => {
  const blogRef = useRef(null); // Create ref

  const handleScrollToBlogs = () => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay">
          <h1>Discover Insights from Global<br />Research Fellows</h1>
          <p>
            Explore thought-provoking articles, summaries, and perspectives from international<br />
            researchers across diverse academic disciplines — all in one curated blog.
          </p>
          <button className="explore-btn" onClick={handleScrollToBlogs}>
            Explore Our Articles
          </button>
        </div>
      </div>

      {/* 🔽 Scroll Target */}
      <div ref={blogRef}>
        <BlogPage />
      </div>
    </div>
  );
};

export default Home;
