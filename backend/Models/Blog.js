  // models/Blog.js

  const mongoose = require('mongoose');

  const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    richContent: String,
    journalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Journal'
    },
    authors: Number,
    authorName: String, // ✅ NEW FIELD
    imgUrl: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Blog', blogSchema);
