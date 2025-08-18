import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Archive.css"; // make new css file

const Archive = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://api.airfresearch.com/api/blogs/getAllBlogs");
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  // Group blogs by year → month
  const grouped = blogs.reduce((acc, blog) => {
    if (!acc[blog.year]) acc[blog.year] = {};
    if (!acc[blog.year][blog.month]) acc[blog.year][blog.month] = [];
    acc[blog.year][blog.month].push(blog);
    return acc;
  }, {});

  return (
    <div className="archive-page">
      <h1 className="archive-title">Research Archive</h1>

      {/* Show years */}
      <div className="year-list">
        {Object.keys(grouped).sort((a, b) => b - a).map((year) => (
          <div key={year}>
            <h2
              className={`year-item ${selectedYear === year ? "active" : ""}`}
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
            >
              {year}
            </h2>

            {/* If year clicked, show months */}
            {selectedYear === year && (
              <div className="month-list">
                {Object.keys(grouped[year]).map((month) => (
                  <div key={month}>
                    <h3
                      className={`month-item ${
                        selectedMonth === month ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedMonth(selectedMonth === month ? null : month)
                      }
                    >
                      {month}
                    </h3>

                    {/* If month clicked, show blogs */}
                    {selectedMonth === month && (
                      <div className="blog-list">
                        {grouped[year][month].map((blog) => (
                          <div key={blog._id} className="blog-card">
                            <img
                              src={`https://api.airfresearch.com${blog.imgUrl}`}
                              alt={blog.title}
                              className="blog-img"
                            />
                            <div className="blog-content">
                              <h4>
                                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                              </h4>
                              <p>{blog.content.slice(0, 150)}...</p>
                              <p className="meta">
                                Written by {blog.authorName} |{" "}
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
