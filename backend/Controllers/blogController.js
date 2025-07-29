const Blog = require("../Models/Blog");

exports.addBlog = async (req, res) => {
  try {
    const { title, content, journalId, authors, imgUrl } = req.body;

    // Validation check
    if (!title || !content || !journalId) {
      return res.status(400).json({ message: "Title, content, and journalId are required." });
    }

    const blog = new Blog({
      title,
      content,
      journalId,
      authors: authors || Math.floor(Math.random() * 5) + 1,
      imgUrl: imgUrl || `/images/blog${Math.floor(Math.random() * 3) + 1}.jpg`
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error adding blog", error });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('journalId').sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

exports.getBlogsByJournal = async (req, res) => {
  try {
    const { journalId } = req.params;
    const blogs = await Blog.find({ journalId }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs for journal", error });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('journalId');
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog updated successfully", blog: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
