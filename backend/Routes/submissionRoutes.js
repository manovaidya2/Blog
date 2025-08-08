const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { submitPaper, getAllSubmissions, deleteSubmission } = require("../Controllers/submissionController");

// Set up multer for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return cb(new Error("Only PDFs are allowed"), false);
    }
    cb(null, true);
  },
});

router.post("/submit", upload.single("pdf"), submitPaper);
router.get("/all", getAllSubmissions); // ✅ Added GET route
router.delete("/delete/:id", deleteSubmission);

module.exports = router;
