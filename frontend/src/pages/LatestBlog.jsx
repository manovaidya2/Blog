import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../style/Latest.css";
import "../style/BlogPage.css";
import { Link } from "react-router-dom";

// BlogCard Component
const BlogCard = ({ blog }) => (
  <div className="blog-card">
    <img src={blog.imageUrl} alt="blog" className="blog-img" />
    <div className="blog-content">
      <p className="meta">Research Paper • 5 min read</p>
      <h3>
        <Link to={`/latest-blog/${blog._id}`} className="blog-title-link">
          {blog.title}
        </Link>
      </h3>
      <p>{blog.description}</p>
      <div className="tags">
        <button className="tag">Research Article</button>
        <button className="tag">Written by {blog.tags} </button>
      </div>
    </div>
  </div>
);

// Top Researched Sidebar
const TopResearched = ({ topBlogs }) => (
  <div className="top-researched">
    <h3>TOP RESEARCHED</h3>
    {topBlogs.map((blog, i) => (
      <div key={i} className="top-item">
        <Link to={`/latest-blog/${blog._id}`} className="top-title-link">
          <p className="top-title">{blog.title}</p>
        </Link>
        <p className="top-desc">{blog.description.slice(0, 100)}...</p>
        <p className="top-meta">
          Posted {new Date(blog.createdAt).toLocaleDateString()} | Written by {blog.tags} 
        </p>
      </div>
    ))}
  </div>
);

// Main Page
const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);
  const blogSectionRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.airfresearch.com/api/latestblogs");
        setBlogs(res.data);

        const topRes = await axios.get("https://api.airfresearch.com/api/latestblogs/top");
        setTopBlogs(topRes.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchData();
  }, []);

  const scrollToBlogs = () => {
    blogSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home1">
      {/* Hero Section */}
      <div className="hero1">
        <div className="hero-overlay1">
          <h1>
            Latest Insights from Global <br /> Research Fellows
          </h1>
          <p>
            Stay up to date with fresh perspectives, evidence-based analysis, and academic <br />
            commentary from leading voices in science, medicine, and interdisciplinary <br />
            research. Discover what's new, relevant, and reshaping the research landscape.
          </p>
          <button className="explore-btn1" onClick={scrollToBlogs}>
            Explore Our Articles
          </button>
        </div>
      </div>

      {/* Blog Cards + Sidebar */}
      <div className="blog-container" ref={blogSectionRef}>
        <div className="blog-left">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
        <div className="blog-right">
          <TopResearched topBlogs={topBlogs} />
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
