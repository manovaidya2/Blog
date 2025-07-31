import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/BlogTable.css"; // Custom CSS for table

const AdminBlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/getAllBlogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/deleteBlog/${id}`);
      alert("Blog deleted successfully!");
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete blog.");
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit page or open modal
    window.location.href = `/admin/edit-blog/${id}`;
  };

  return (
    <div className="table-container">
      <h2>All Blogs</h2>
      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Journal</th>
            <th>Authors</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>
                <img
                  src={`http://localhost:5000${blog.imgUrl}`}
                  alt={blog.title}
                  className="blog-thumb"
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.journalId?.name || "N/A"}</td>
              <td>{blog.authors}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(blog._id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogTable;
