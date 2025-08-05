import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import BlogCard from "./BlogCard"; // reuse your component

const JournalBlogPage = () => {
  const { journalId } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`https://api.airfresearch.com/api/blogs/journal/${journalId}`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Error fetching blogs", err));
  }, [journalId]);

  return (
    <div className="blog-container">
      <div className="blog-left">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            img={blog.image || "/default-blog.jpg"}
            title={blog.title}
            description={blog.content.slice(0, 150) + "..."}
            authors={blog.authors}
          />
        ))}
      </div>
      <div className="blog-right">
        {/* You can reuse <TopResearched /> or add a journal-specific sidebar */}
      </div>
    </div>
  );
};

export default JournalBlogPage;
