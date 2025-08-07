import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/BlogTable.css";

const AdminBlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://api.airfresearch.com/api/blogs/getAllBlogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`https://api.airfresearch.com/api/blogs/deleteBlog/${id}`);
      alert("Blog deleted successfully!");
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete blog.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  return (
    <div className="table-container">
      <h2>All Blogs</h2>
      <div className="table-wrapper">
        <table className="blog-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Journal</th>
              <th>Authors</th>
              <th>Author Name</th>

              <th>Date</th>
              <th>Rich Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={`https://api.airfresearch.com${blog.imgUrl}`}
                    alt={blog.title}
                    className="blog-thumb"
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.journalId?.name || "N/A"}</td>
                <td>{blog.authors}</td>
                <td>{blog.authorName}</td>

                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.richContent?.slice(0, 100) + "...",
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(blog._id)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="delete-btn">
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

export default AdminBlogTable;
