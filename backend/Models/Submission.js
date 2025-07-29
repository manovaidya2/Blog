const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  institutionName: String,
  authorName: String,
  coAuthor1: String,
  coAuthor2: String,
  coAuthor3: String,
  researchTopic: String,
  fieldOfStudy: String,
  pdfFilePath: String,
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
