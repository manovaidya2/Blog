// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/BlogPage.css";

import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const q = query.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q) return;
    const fetchResults = async () => {
      try {
      const res = await axios.get(`http://localhost:5000/api/blogs/search?q=${q}`);

        setResults(res.data);
      } catch (err) {
        console.error("Search failed", err);
      }
    };
    fetchResults();
  }, [q]);

  return (
    <div className="search-results">
      <h2>Search Results for "{q}"</h2>
      <div className="blog-container">
        <div className="blog-left">
          {results.length > 0 ? (
            results.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <img src={`http://localhost:5000${blog.imgUrl}`} alt="blog" className="blog-img" />
                <div className="blog-content">
                  <p className="meta">Search Match • {Math.floor(Math.random() * 5 + 3)} min read</p>
                  <h3>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </h3>
                  <p>{blog.content.slice(0, 200)}...</p>
                  <div className="tags">
                    <button className="tag">Research Article</button>
                    <button className="tag">Written by {blog.authors} Authors</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
