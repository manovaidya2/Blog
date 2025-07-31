import mongoose from "mongoose";

const latestBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  authors: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: false }, // Add this
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("LatestBlog", latestBlogSchema);