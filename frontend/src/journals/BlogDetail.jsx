// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/BlogDetail.css"; // Create and style this file

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
      const res = await axios.get(`http://localhost:5000/api/blogs/getBlogById/${blogId}`);

        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog details", err);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <div className="blog-banner">
        <img src={`http://localhost:5000${blog.imgUrl}`} alt={blog.title} />
      </div>
      <div className="blog-meta">
        <p>Research Article / Written by {blog.authors} Authors</p>
        <p>Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
      <h1 className="blog-title">{blog.title}</h1>

     <div className="blog-section">
 
  <div
    className="rich-content"
    dangerouslySetInnerHTML={{ __html: blog.richContent || "<p>No rich content available.</p>" }}
  />
</div>


     
    </div>
  );
};

export default BlogDetail;
