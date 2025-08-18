const Blog = require("../Models/Blog");
// controllers/blogController.js


exports.addBlog = async (req, res) => {
  try {
    const { title, content, journalId, authors, authorName, richContent, year, month } = req.body;
    const imgFile = req.file;

    if (!title || !content || !journalId || !year || !month) {
      return res.status(400).json({ message: "Title, content, journalId, year, and month are required." });
    }

    const blog = new Blog({
      title,
      content,
      richContent,
      journalId,
      authors: authors || Math.floor(Math.random() * 5) + 1,
      authorName,
      year,
      month,
      imgUrl: imgFile
        ? `/uploads/${imgFile.filename}`
        : `/images/blog${Math.floor(Math.random() * 3) + 1}.jpg`,
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



exports.searchBlogs = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { richContent: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error searching blogs", error });
  }
};



// ✅ Get all years & months for a journal
exports.getYearsAndMonthsByJournal = async (req, res) => {
  try {
    const { journalId } = req.params;
    const blogs = await Blog.find({ journalId });

    const grouped = {};
    blogs.forEach(blog => {
      if (!grouped[blog.year]) grouped[blog.year] = new Set();
      grouped[blog.year].add(blog.month);
    });

    const result = Object.keys(grouped).map(year => ({
      year,
      months: Array.from(grouped[year])
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching years & months", error });
  }
};

// ✅ Get blogs by journal + year + month
exports.getBlogsByJournalYearMonth = async (req, res) => {
  try {
    const { journalId, year, month } = req.params;
    const blogs = await Blog.find({ journalId, year, month }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs by year & month", error });
  }
};

