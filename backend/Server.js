const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const submissionRoutes = require("./Routes/submissionRoutes");
const journalRoutes = require("./Routes/journalRoutes");
const blogsRoutes = require("./Routes/blogRoutes");
const latestblogRoutes = require("./Routes/latestblogRoutes");

const app = express();

// ✅ CORS Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://api.airfresearch.com/",
  "https://blog-1-rqz1.onrender.com",
  "https://admin.airfresearch.com",
  "https://www.airfresearch.com",
  "https://airfresearch.com"
];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.options("*", cors()); // Handle pre-flight

app.use(express.json());

// 🔥 Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Health Check Route
app.get("/", (req, res) => {
  res.send("blog is live ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/latestblogs", latestblogRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
