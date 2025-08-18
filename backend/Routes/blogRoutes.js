const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogController');
const upload = require("../Middleware/upload");

// Create
router.post("/add", upload.single("img"), blogController.addBlog);

// Read
router.get('/getAllBlogs', blogController.getAllBlogs);
router.get('/getBlogsByJournal/:journalId', blogController.getBlogsByJournal);
router.get('/getBlogById/:id', blogController.getBlogById);

// ✅ Extra routes for Year & Month filter
router.get("/getYearsMonths/:journalId", blogController.getYearsAndMonthsByJournal);
router.get("/getBlogsByJournalYearMonth/:journalId/:year/:month", blogController.getBlogsByJournalYearMonth);

// ✅ Search
router.get("/search", blogController.searchBlogs);

// Update
router.put('/updateblog/:id', blogController.updateBlog);

// Delete
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
