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
  authorName: String,
  imgUrl: String,

  // ✅ New fields
  year: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
