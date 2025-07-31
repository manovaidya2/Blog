const Journal = require("../Models/Journal");
const Blog = require("../Models/Blog");

// Add a new journal
exports.addJournal = async (req, res) => {
  try {
    const { name, summaryAboutTitle } = req.body;
    const img = req.file.filename;

    const newJournal = new Journal({ name, summaryAboutTitle, img });
    await newJournal.save();
    res.status(201).json({ message: "Journal added successfully", journal: newJournal });
  } catch (error) {
    res.status(500).json({ message: "Failed to add journal", error });
  }
};

// Get all journals
exports.getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ name: 1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch journals", error });
  }
};

// Get single journal with its blogs
exports.getJournalWithBlogs = async (req, res) => {
  try {
    const journalId = req.params.id;

    const journal = await Journal.findById(journalId);
    if (!journal) return res.status(404).json({ message: "Journal not found" });

    const blogs = await Blog.find({ journalId }).sort({ createdAt: -1 });
    const topBlogs = await Blog.find({ journalId }).sort({ createdAt: -1 })

    res.status(200).json({ journal, blogs, topBlogs });
  } catch (error) {
    res.status(500).json({ message: "Failed to get journal details", error });
  }
};

// Update journal
exports.updateJournal = async (req, res) => {
  try {
    const { name, summaryAboutTitle } = req.body;
    const updateData = { name, summaryAboutTitle };

    if (req.file) {
      updateData.img = req.file.filename;
    }

    const updated = await Journal.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ message: "Journal updated", journal: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update journal", error: err });
  }
};

// Delete journal
exports.deleteJournal = async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete journal", error: err });
  }
};
