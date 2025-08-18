import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../style/AdminBlogPage.css"; // Optional custom styles
import AdminBlogTable from "../pages/AdminBlogTable";

const AdminBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journalId, setJournalId] = useState("");
  const [authors, setAuthors] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [journals, setJournals] = useState([]);
  const [richContent, setRichContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [year, setYear] = useState("");
const [month, setMonth] = useState("");



  // Fetch available journals
  const fetchJournals = async () => {
    try {
      const res = await axios.get("https://api.airfresearch.com/api/journals/getJournals");

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

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content); // Plain text (optional)
  formData.append("richContent", richContent); // CKEditor HTML
  formData.append("journalId", journalId);
  formData.append("year", year);
formData.append("month", month);


  if (authors) formData.append("authors", authors);
  if (authorName) formData.append("authorName", authorName);

  if (imgUrl) formData.append("img", imgUrl); // File from input[type="file"]

  try {
    const res = await axios.post("https://api.airfresearch.com/api/blogs/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("✅ Blog posted successfully!");
    setTitle("");
    setContent("");
    setRichContent("");
    setJournalId("");
    setAuthors("");
    setAuthorName("");

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
          rows={4}
          className="admin-textarea"
          required
        />
      <div className="admin-editor">
  <CKEditor
    editor={ClassicEditor}
    data={richContent}
    onChange={(event, editor) => {
      const data = editor.getData();
      setRichContent(data);
    }}
  />
</div>


       
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
  placeholder="Author Name"
  value={authorName}
  onChange={(e) => setAuthorName(e.target.value)}
  className="admin-input"
/>


        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImgUrl(e.target.files[0])}
  className="admin-input"
/>
<input
  type="number"
  placeholder="Year"
  value={year}
  onChange={(e) => setYear(e.target.value)}
  className="admin-input"
  required
/>

<select
  value={month}
  onChange={(e) => setMonth(e.target.value)}
  className="admin-select"
  required
>
  <option value="">Select Month</option>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>



        <button type="submit" className="admin-button">
          Submit Blog
        </button>
      </form>
        <AdminBlogTable />
    </div>
  );
};

export default AdminBlogPage;
