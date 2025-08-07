// import React from 'react';
// import '../style/Journal.css';
// import blogImg1 from '../image/blog.jpg';
// import blogImg2 from '../image/blog2.jpg';
// import blogImg3 from '../image/blog3.jpg';
// import bannerImage from '../image/journals.jpg'; // Rename your uploaded image to this

// const BlogHeader = () => (
//   <div className="blog-header">
//     <img src={bannerImage} alt="Banner" className="banner-img" />
//     <div className="banner-overlay">
//       <h1>Journal For Humanities & Education</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//     </div>
//   </div>
// );

// const BlogCard = ({ img, title, description, authors }) => (
//   <div className="blog-card">
//     <img src={img} alt="blog" className="blog-img" />
//     <div className="blog-content">
//       <p className="meta">Latest Blog • 5 min read</p>
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <div className="tags">
//         <button className="tag">Research Article</button>
//         <button className="tag">Written by {authors} Authors</button>
//       </div>
//     </div>
//   </div>
// );

// const TopResearched = () => (
//   <div className="top-researched">
//     <h3>TOP RESEARCHED</h3>
//     {Array(5).fill().map((_, i) => (
//       <div key={i} className="top-item">
//         <p className="top-title">Top Breakthroughs in Medical Science: A Year in Review</p>
//         <p className="top-desc">CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs</p>
//         <p className="top-meta">Posted 23 March, 2025 | Written by 4 Authors</p>
//       </div>
//     ))}
//   </div>
// );

// const Journal = () => {
//   return (
//     <div>
//       <BlogHeader />
//       <div className="blog-container">
//         <div className="blog-left">
//           <BlogCard
//             img={blogImg1}
//             title="CRISPR and Beyond: The Next Frontier in Gene Editing for Rare Diseases"
//             description="CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs in gene editing and how they're offering hope for patients with previously untreatable genetic disorders — from clinical trials to ethical considerations."
//             authors={5}
//           />
//           <BlogCard
//             img={blogImg2}
//             title="CRISPR and Beyond: The Next Frontier in Gene Editing for Rare Diseases"
//             description="CRISPR technology is no longer science fiction. This article outlines the latest breakthroughs in gene editing and how they're offering hope for patients with previously untreatable genetic disorders — from clinical trials to ethical considerations."
//             authors={4}
//           />
//           <BlogCard
//             img={blogImg3}
//             title="What We Learned from COVID-19: Strengthening Global Public Health Research"
//             description="The pandemic highlighted both the strengths and gaps in global health systems. This post analyzes key research-driven lessons from COVID-19 and explores how data sharing, vaccine development, and cross-border collaboration can shape future pandemic preparedness."
//             authors={5}
//           />
//         </div>
//         <div className="blog-right">
//           <TopResearched />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Journal;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/Journal.css";
import axios from "axios";
import { Link } from "react-router-dom";
const BlogHeader = ({ journal }) => (
  <div className="blog-header">
    <img
      src={`https://api.airfresearch.com/uploads/${journal.img}`}
      alt={journal.name}
      className="banner-img"
    />
    <div className="banner-overlay">
      <h1>{journal.name}</h1>
      <p>{journal.summaryAboutTitle || "No summary available"}</p>
    </div>
  </div>
);

const BlogCard = ({ blog }) => (
  <div className="blog-card">
  <img src={`https://api.airfresearch.com${blog.imgUrl}`} alt="blog" className="blog-img" />

    <div className="blog-content">
      <p className="meta">Research Paper • {Math.floor(Math.random() * 5 + 3)} min read</p>
   {blog._id && (
  <h3>
    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
  </h3>
)}


      <p>{blog.content.slice(0, 200)}...</p>
      <div className="tags">
        <button className="tag">Research Article</button>
        <button className="tag">Written by {blog.authorName} Authors</button>
      </div>
    </div>
  </div>
);

const TopResearched = ({ blogs }) => (
  <div className="top-researched">
    <h3>TOP RESEARCHED</h3>
    {blogs.slice(0, 5).map((blog, i) => (
      <div key={i} className="top-item">
       {blog._id && (
  <Link to={`/blogs/${blog._id}`}>
    <p className="top-title">{blog.title}</p>
  </Link>
)}

        <p className="top-desc">{blog.content.slice(0, 100)}...</p>
        <p className="top-meta">
          Posted {new Date(blog.createdAt).toLocaleDateString()} | Written by {blog.authorName} 
        </p>
      </div>
    ))}
  </div>
);

const Journal = () => {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.airfresearch.com/api/journals/getJournalWithBlogs/${journalId}`);
        
        // Fix: Access journal and blogs properly from API response
        setJournal(res.data.journal);
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch journal or blogs", err);
      }
    };

    fetchData();
  }, [journalId]);

  if (!journal) return <p>Loading journal...</p>;

  return (
    <div>
      <BlogHeader journal={journal} />
      <div className="blog-container">
        <div className="blog-left">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
        <div className="blog-right">
          <TopResearched blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Journal;
