import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/LatestBlogTable.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const LatestBlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    authors: "",
    imageUrl: "",
    tags: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get("https://api.airfresearch.com/api/latestblogs");
    setBlogs(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://api.airfresearch.com/api/latestblogs/${id}`);
    fetchBlogs();
  };

  const toggleActive = async (id) => {
    await axios.put(`https://api.airfresearch.com/api/latestblogs/toggle/${id}`);
    fetchBlogs();
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`https://api.airfresearch.com/api/latestblogs/${id}`);
      const blog = res.data;
      setFormData({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        authors: blog.authors,
        imageUrl: blog.imageUrl,
        tags: blog.tags.join(", "),
      });
      setEditingBlogId(id);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      await axios.put(`https://api.airfresearch.com/api/latestblogs/${editingBlogId}`, updatedData);
      setEditingBlogId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const imageData = new FormData();
  imageData.append("image", file);

  try {
    const res = await axios.post("https://api.airfresearch.com/api/upload", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Assuming response has { imageUrl: "https://..." }
    setFormData((prev) => ({
      ...prev,
      imageUrl: res.data.imageUrl,
    }));
  } catch (err) {
    console.error("Image upload failed:", err);
  }
};


  return (
    <div className="admin-table-container">
      <h2>Latest Blogs</h2>

      <div className="table-scroll-wrapper">
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
                    {blog.isActive ? "Unactive" : "Active Homepage"}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBlogId && (
        <div className="modal-backdrop">
          <div className="edit-modal">
            <h3>Edit Blog</h3>

            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleInputChange} />

            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} />

            <label>Content</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(event, editor) =>
                setFormData((prev) => ({ ...prev, content: editor.getData() }))
              }
            />

            <label>Authors</label>
            <input name="authors" value={formData.authors} onChange={handleInputChange} />

           <label>Upload Image</label>
<input type="file" accept="image/*" onChange={handleImageUpload} />

{formData.imageUrl && (
  <img src={formData.imageUrl} alt="Uploaded" className="preview-img" />
)}


            <label>Tags (comma separated)</label>
            <input name="tags" value={formData.tags} onChange={handleInputChange} />

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleUpdate}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingBlogId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestBlogTable;
