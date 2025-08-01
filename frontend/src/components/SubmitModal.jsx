import React, { useState } from "react";
import axios from "axios";
import "../style/SubmitModal.css";

const SubmitModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    institutionName: "",
    authorName: "",
    coAuthor1: "",
    coAuthor2: "",
    coAuthor3: "",
    researchTopic: "",
   fieldOfStudy: "",
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/submissions/submit", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

      alert("Submission successful!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Please enter the following details</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} />
            <input name="fatherName" placeholder="Father's Name" onChange={handleChange} />
            <input name="institutionName" placeholder="Institution Name" onChange={handleChange} />
            <input name="authorName" placeholder="Name of Author" onChange={handleChange} />
            <input name="coAuthor1" placeholder="Name of Co-author 01" onChange={handleChange} />
            <input name="coAuthor2" placeholder="Name of Co-author 02" onChange={handleChange} />
            <input name="coAuthor3" placeholder="Name of Co-author 03" onChange={handleChange} />
            <input name="researchTopic" placeholder="Topic of Research" onChange={handleChange} />
           <input name="fieldOfStudy" placeholder="Field of Study" onChange={handleChange} /> 
          </div>

          <div className="upload-box">
            <span className="upload-plus">+</span>
            <p>Upload PDF</p>
            <input name="pdf" type="file" accept=".pdf" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitModal;
