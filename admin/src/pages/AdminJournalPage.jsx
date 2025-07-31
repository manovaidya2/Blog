import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminJournalPage.css"; // Make sure this file exists

const AdminJournalPage = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [journals, setJournals] = useState([]);
  const [editingJournal, setEditingJournal] = useState(null);

  const fetchJournals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/journals/getJournals");
      setJournals(res.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };


const handleEdit = (journal) => {
  setEditingJournal(journal);
  setName(journal.name);
  setSummary(journal.summaryAboutTitle);
  setImage(null); // only update if new image is selected
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/journals/deleteJournal/${id}`);
    fetchJournals();
  } catch (err) {
    console.error("Failed to delete journal:", err);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("summaryAboutTitle", summary);
    if (image) formData.append("img", image);

    if (editingJournal) {
      await axios.put(`http://localhost:5000/api/journals/updateJournal/${editingJournal._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } else {
      await axios.post("http://localhost:5000/api/journals/addJournal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setName("");
    setSummary("");
    setImage(null);
    setEditingJournal(null);
    fetchJournals();
  } catch (error) {
    console.error("Failed to submit journal:", error);
  }
};


  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Add New Journal</h2>
      <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
        <input
          type="text"
          value={name}
          placeholder="Enter journal name"
          onChange={(e) => setName(e.target.value)}
          className="admin-input"
          required
        />
        <textarea
          value={summary}
          placeholder="Enter summary or about title"
          onChange={(e) => setSummary(e.target.value)}
          className="admin-textarea"
          rows={4}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="admin-input"
          required
        />
       <button type="submit" className="admin-button">
  {editingJournal ? "Update Journal" : "Add Journal"}
</button>

      </form>

      <h3 className="journal-table-heading">Existing Journals</h3>
<table className="journal-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Summary</th>
      <th>Image</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {journals.map((j, index) => (
      <tr key={j._id}>
        <td>{index + 1}</td>
        <td>{j.name}</td>
        <td>{j.summaryAboutTitle}</td>
        <td>
          <img
            src={`http://localhost:5000/uploads/${j.img}`}
            alt={j.name}
            className="journal-table-image"
          />
        </td>
        <td>
          <button className="journal-btn edit-btn" onClick={() => handleEdit(j)}>Edit</button>
          <button className="journal-btn delete-btn" onClick={() => handleDelete(j._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
};

export default AdminJournalPage;
