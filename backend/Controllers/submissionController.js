const Submission = require("../models/Submission");

const submitPaper = async (req, res) => {
  try {
    const {
      fullName,
      fatherName,
      institutionName,
      authorName,
      coAuthor1,
      coAuthor2,
      coAuthor3,
      researchTopic,
      fieldOfStudy,
    } = req.body;

    const pdfFilePath = req.file ? req.file.path : null;

    const submission = new Submission({
      fullName,
      fatherName,
      institutionName,
      authorName,
      coAuthor1,
      coAuthor2,
      coAuthor3,
      researchTopic,
      fieldOfStudy,
      pdfFilePath,
    });

    await submission.save();
    res.status(200).json({ message: "Submission successful", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting data" });
  }
};

module.exports = { submitPaper };
