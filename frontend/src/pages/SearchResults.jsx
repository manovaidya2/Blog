// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BlogCard } from "./BlogPage"; // ✅ Import BlogCard as named export
import "../style/BlogPage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const q = query.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q) return;
    axios
      .get(`https://api.airfresearch.com/api/latestblogs/search?q=${q}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Search failed", err));
  }, [q]);

  return (
    <div className="blog-container">
      <div className="blog-left">
        <h2>Search Results for "{q}"</h2>
        {results.length > 0 ? (
          results.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              img={blog.imageUrl}
              title={blog.title}
              description={blog.description}
              authors={blog.authors}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
