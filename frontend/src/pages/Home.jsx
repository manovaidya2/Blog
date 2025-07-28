// src/pages/Home.jsx
import React from "react";
import "../style/Home.css";
import BlogPage from './BlogPage';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay">
          <h1>Discover Insights from Global<br />Research Fellows</h1>
          <p>
            Explore thought-provoking articles, summaries, and perspectives from international<br />
            researchers across diverse academic disciplines — all in one curated blog.
          </p>
          <button className="explore-btn">Explore Our Articles</button>
        </div>
      </div>
      <BlogPage />
    </div>
  );
};

export default Home;
