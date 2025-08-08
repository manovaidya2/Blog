import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/AllSubmissions.css";

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.airfresearch.com/api/submissions/all")
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://api.airfresearch.com/api/submissions/delete/${id}`);
    setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
  } catch (err) {
    console.error("Error deleting submission:", err);
    alert("Failed to delete submission");
  }
};

  return (
    <div className="submission-container">
  <h2>All Menu Script Data</h2>
  
  {/* FIX: Wrap the table inside this div */}
  <div className="table-wrapper">
    <table className="submission-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Father's Name</th>
          <th>Institution</th>
          <th>Author</th>
          <th>Co-Author 1</th>
          <th>Co-Author 2</th>
          <th>Co-Author 3</th>
          <th>Research Topic</th>
          <th>Field of Study</th>
          <th>PDF</th>
          <th>Submitted On</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {submissions.map((sub) => (
          <tr key={sub._id}>
            <td>{sub.fullName}</td>
            <td>{sub.fatherName}</td>
            <td>{sub.institutionName}</td>
            <td>{sub.authorName}</td>
            <td>{sub.coAuthor1 || "-"}</td>
            <td>{sub.coAuthor2 || "-"}</td>
            <td>{sub.coAuthor3 || "-"}</td>
            <td>{sub.researchTopic}</td>
            <td>{sub.fieldOfStudy}</td>
            <td>
              {sub.pdfFilePath ? (
                <a
                  href={`https://api.airfresearch.com/${sub.pdfFilePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </a>
              ) : (
                "N/A"
              )}
            </td>
            <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
            <td>
  <button
    className="delete-btn"
    onClick={() => handleDelete(sub._id)}
  >
    Delete
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AllSubmissions;
