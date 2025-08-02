import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../style/EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    richContent: "",
    authors: "",
    journalId: "",
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/getBlogById/${id}`);
      const { title, content, richContent, authors, journalId } = res.data;
      setFormData({
        title,
        content,
        richContent,
        authors,
        journalId: journalId?._id || "",
      });
    } catch (err) {
      console.error("Failed to fetch blog", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/updateblog/${id}`, formData);
      alert("Blog updated successfully!");
    } catch (err) {
      console.error("Failed to update blog", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          placeholder="Authors"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Short Description"
        />
        <label>Rich Content:</label>
        <CKEditor
          editor={ClassicEditor}
          data={formData.richContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setFormData((prev) => ({ ...prev, richContent: data }));
          }}
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
