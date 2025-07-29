const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogController');

// Create
router.post('/add', blogController.addBlog);

// Read
router.get('/getAllBlogs', blogController.getAllBlogs);
router.get('/getBlogsByJournal/:journalId', blogController.getBlogsByJournal);
router.get('/getBlogById/:id', blogController.getBlogById);

// Update
router.put('/updateblog/:id', blogController.updateBlog);

// Delete
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
