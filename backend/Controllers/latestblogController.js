import LatestBlog from "../Models/LatestBlog.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await LatestBlog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopResearched = async (req, res) => {
  try {
    const blogs = await LatestBlog.find().sort({ createdAt: -1 }).limit(5);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    console.log("Received Blog Data:", req.body);
    const blog = new LatestBlog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation failed:", err);
    res.status(400).json({ error: err.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};