const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summaryAboutTitle: { type: String, required: true },
  img :{ type: String, required: true },
});

// journalSchema.index()
module.exports = mongoose.model("Journal", journalSchema);
