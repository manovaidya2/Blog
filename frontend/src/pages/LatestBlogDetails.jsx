import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/LatestBlogDetail.css";

const LatestBlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://api.airfresearch.com/api/latestblogs/${blogId}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching latest blog details", err);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="latest-blog-detail">
      <div className="latest-blog-banner">
        <img src={blog.imageUrl} alt={blog.title} />
      </div>

      <div className="latest-blog-meta">
        <p>Written by {blog.tags}</p>
        <p className="pub">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
        {/* <div className="latest-blog-tags">
          {blog.tags.map((tag, i) => (
            <span key={i} className="latest-blog-tag">{tag}</span>
          ))}
        </div> */}
      </div>

      <h1 className="latest-blog-title">{blog.title}</h1>
      <p className="latest-blog-description">{blog.description}</p>

      <div
        className="latest-blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default LatestBlogDetails;
