const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const {
  getAllBlogs,
  createBlog,
  getTopResearched,
  uploadImage,
} = require("../Controllers/latestblogController");

router.get("/", getAllBlogs);
router.get("/top", getTopResearched);
router.post("/upload", upload.single("image"), uploadImage);
router.post("/", createBlog);

module.exports = router;
