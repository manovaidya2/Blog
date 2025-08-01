import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/LatestBlogTable.css";

const LatestBlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/latestblogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/latestblogs/${id}`);
    fetchBlogs();
  };

  const toggleActive = async (id) => {
    await axios.put(`http://localhost:5000/api/latestblogs/toggle/${id}`);
    fetchBlogs();
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for Blog ID: ${id} (You can link to an edit modal or page)`);
  };

  return (
    <div className="admin-table-container">
      <h2>Latest Blogs</h2>
      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Tags</th>
            <th>Homepage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>
                <img src={blog.imageUrl} alt="blog" className="blog-thumb" />
              </td>
              <td>{blog.title}</td>
              <td>{blog.authors}</td>
              <td>{blog.tags.join(", ")}</td>
              <td>
                <span className={`status-badge ${blog.isActive ? "active" : "inactive"}`}>
                  {blog.isActive ? "Yes" : "No"}
                </span>
              </td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(blog._id)}>Edit</button>
                <button className="toggle-btn" onClick={() => toggleActive(blog._id)}>
                  {blog.isActive ? "Unactive " : "Active Homapage"}
                </button>
                <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestBlogTable;
