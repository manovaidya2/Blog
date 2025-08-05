const LatestBlog = require("../Models/LatestBlog");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await LatestBlog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTopResearched = async (req, res) => {
  try {
    const blogs = await LatestBlog.find().sort({ createdAt: -1 }).limit(5);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBlog = async (req, res) => {
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

const uploadImage = async (req, res) => {
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

const getBlogById = async (req, res) => {
  try {
    const blog = await LatestBlog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleActiveStatus = async (req, res) => {
  try {
    const blog = await LatestBlog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.isActive = !blog.isActive;
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await LatestBlog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updated = await LatestBlog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getActiveBlogs = async (req, res) => {
  try {
    const activeBlogs = await LatestBlog.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(activeBlogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBlogs,
  getTopResearched,
  createBlog,
  uploadImage,
  getBlogById,
  toggleActiveStatus,
  deleteBlog,
  updateBlog,
  getActiveBlogs,
};
