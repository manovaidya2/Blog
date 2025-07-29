import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminBlogPage.css"; // Optional custom styles

const AdminBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journalId, setJournalId] = useState("");
  const [authors, setAuthors] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [journals, setJournals] = useState([]);

  // Fetch available journals
  const fetchJournals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/journals/getJournals");
      setJournals(res.data);
    } catch (error) {
      console.error("Failed to fetch journals", error);
    }
  };

  // Submit blog post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !journalId) {
      return alert("Please fill in title, content, and journal.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/blogs/add", {
        title,
        content,
        journalId,
        authors: authors ? Number(authors) : undefined, // pass only if user sets
        imgUrl: imgUrl || undefined, // backend will assign fallback
      });

      alert("✅ Blog posted successfully!");
      setTitle("");
      setContent("");
      setJournalId("");
      setAuthors("");
      setImgUrl("");
    } catch (error) {
      console.error("Error submitting blog", error);
      alert("❌ Failed to submit blog.");
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Post a New Blog</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="admin-input"
          required
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="admin-textarea"
          required
        />

        <select
          value={journalId}
          onChange={(e) => setJournalId(e.target.value)}
          className="admin-select"
          required
        >
          <option value="">Select Journal</option>
          {journals.map((journal) => (
            <option key={journal._id} value={journal._id}>
              {journal.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Number of Authors (optional)"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          className="admin-input"
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="admin-input"
        />

        <button type="submit" className="admin-button">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AdminBlogPage;
