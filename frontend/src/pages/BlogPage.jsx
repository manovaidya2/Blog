import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/BlogPage.css';


const BlogCard = ({ img, title, description, authors, id }) => (
  <div className="blog-card">
    <img src={img} alt="blog" className="blog-img" />
    <div className="blog-content">
      <p className="meta">Latest Blog • 5 min read</p>
      <h3>
        <Link to={`/latest-blog/${id}`} className="blog-title-link">
          {title}
        </Link>
      </h3>
      <p>{description}</p>
      <div className="tags">
        <button className="tag">Research Article</button>
        <button className="tag">Written by {authors} Authors</button>
      </div>
    </div>
  </div>
);

const TopResearched = ({ topBlogs }) => (
  <div className="top-researched">
    <h3>TOP RESEARCHED</h3>
    {topBlogs.map((blog) => (
      <div key={blog._id} className="top-item">
        {/* ✅ Wrap title with Link */}
        <Link to={`/latest-blog/${blog._id}`} className="top-title-link">
          <p className="top-title">{blog.title}</p>
        </Link>
        <p className="top-desc">{blog.description}</p>
        <p className="top-meta">
          Posted {new Date(blog.createdAt).toLocaleDateString()} | Written by {blog.authors} Authors
        </p>
      </div>
    ))}
  </div>
);


const BlogPage = () => {
  const [activeBlogs, setActiveBlogs] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/latestblogs/active")
      .then((res) => setActiveBlogs(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/latestblogs/top")
      .then((res) => setTopBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-left">
        {activeBlogs.map(blog => (
   <BlogCard
  key={blog._id}
  id={blog._id} // ✅ Add this line!
  img={blog.imageUrl}
  title={blog.title}
  description={blog.description}
  authors={blog.authors}
/>

        ))}
      </div>
      <div className="blog-right">
        <TopResearched topBlogs={topBlogs} />
      </div>
    </div>
  );
};

export default BlogPage;


export { BlogCard };