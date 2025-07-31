const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const {
  getAllBlogs,
  createBlog,
  getTopResearched,
  uploadImage,
  getBlogById,
  getActiveBlogs,
  toggleActiveStatus,
  updateBlog,
  deleteBlog,
} = require("../Controllers/latestblogController");

// Routes
router.get("/", getAllBlogs);
router.get("/top", getTopResearched);
router.get("/active", getActiveBlogs);           // Fetch blogs marked as active on homepage
router.get("/:id", getBlogById);                 // Fetch single blog by ID

router.post("/upload", upload.single("image"), uploadImage); // Upload image
router.post("/", createBlog);                    // Create blog

router.put("/toggle/:id", toggleActiveStatus);   // Toggle active status
router.put("/:id", updateBlog);                  // Update blog

router.delete("/:id", deleteBlog);               // Delete blog

module.exports = router;
