import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/Journal.css";
import axios from "axios";

const BlogHeader = ({ journal }) => (
  <div className="blog-header">
    <img
      src={`http://localhost:5000/uploads/${journal.img}`}
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
          Posted {blog.month} {blog.year} | Written by {blog.authorName}
        </p>
      </div>
    ))}
  </div>
);

const Journal = () => {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [yearMonthData, setYearMonthData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const journalRes = await axios.get(
          `https://api.airfresearch.com/api/journals/getJournalWithBlogs/${journalId}`
        );
        setJournal(journalRes.data.journal);

        // fetch years/months
        const yearMonthRes = await axios.get(
          `https://api.airfresearch.com/api/blogs/getYearsMonths/${journalId}`
        );
        setYearMonthData(yearMonthRes.data);
      } catch (err) {
        console.error("Failed to fetch journal or blogs", err);
      }
    };
    fetchData();
  }, [journalId]);

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedMonth(""); // reset month
    setBlogs([]);
  };

  const handleMonthChange = async (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    if (month) {
      try {
        const res = await axios.get(
          `https://api.airfresearch.com/api/blogs/getBlogsByJournalYearMonth/${journalId}/${selectedYear}/${month}`
        );
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs by year/month", err);
      }
    }
  };

  if (!journal) return <p>Loading journal...</p>;

  return (
    <div>
      {/* 🟦 Top Banner */}
      <BlogHeader journal={journal} />

      {/* 🔹 Dropdown Filter Section */}
    <div className="year-month-wrapper">
  <section className="filter-section">
    <div className="filter-container">
      <h2>Browse Research by Year & Month</h2>

      {/* Dropdown Row Wrapper */}
      <div className="dropdown-row">
        {/* Year Dropdown */}
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {yearMonthData.map((item) => (
            <option key={item.year} value={item.year}>
              {item.year}
            </option>
          ))}
        </select>

        {/* Month Dropdown (enabled only when year is chosen) */}
        {selectedYear && (
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {yearMonthData
              .find((y) => y.year === selectedYear)
              ?.months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  </section>
</div>

     

      {/* 🟨 Blogs Section */}
      <div className="blog-container">
        <div className="blog-left">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p className="no-blogs">Select a Year & Month to see blogs.</p>
          )}
        </div>
        <div className="blog-right">
          <TopResearched blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Journal;
