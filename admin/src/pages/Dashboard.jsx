import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  FaFileAlt,
  FaEye,
  FaCheckCircle,
  FaBook,
  FaUpload,
} from "react-icons/fa";
import axios from "axios";
import "../style/Dashboard.css";

const Dashboard = () => {
  const [blogData, setBlogData] = useState([]);
  const [activeBlogs, setActiveBlogs] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState([]);
  const [journals, setJournals] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const blogRes = await axios.get("https://api.airfresearch.com/api/latestblogs");
      const blogs = blogRes.data;
      setBlogData(blogs);

      const activeRes = await axios.get(
        "https://api.airfresearch.com/api/latestblogs/active"
      );
      setActiveBlogs(activeRes.data);

      const recent = [...blogs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentPosts(recent);

      const authorCounts = {};
      blogs.forEach((blog) => {
        const author = blog.authors || "Unknown";
        authorCounts[author] = (authorCounts[author] || 0) + 1;
      });

      const top = Object.entries(authorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, count]) => ({ name, count }));
      setTopAuthors(top);

      const counts = new Array(12).fill(0);
      blogs.forEach((blog) => {
        const month = new Date(blog.createdAt).getMonth();
        counts[month]++;
      });
      setMonthlyCounts(counts);

      const journalRes = await axios.get("https://api.airfresearch.com/api/journals/getJournals")
;
      setJournals(journalRes.data);

      const submissionRes = await axios.get(
  "https://api.airfresearch.com/api/submissions/all"
);

      setSubmissions(submissionRes.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const postChart = {
    options: {
      chart: { id: "blog-posts" },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Posts",
        data: monthlyCounts,
      },
    ],
  };

  const viewChart = {
    options: {
      chart: { id: "views" },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.8,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      },
    },
    series: [
      {
        name: "Views",
        data: [300, 500, 400, 600],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Blog Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <FaFileAlt className="stat-icon" />
          <div>
            <h4>Total Blogs</h4>
            <p>{blogData.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCheckCircle className="stat-icon green" />
          <div>
            <h4>Published</h4>
            <p>{activeBlogs.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBook className="stat-icon purple" />
          <div>
            <h4>Total Journals</h4>
            <p>{journals.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUpload className="stat-icon orange" />
          <div>
            <h4>Submissions</h4>
            <p>{submissions.length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-box">
          <h3>Monthly Posts</h3>
          <Chart
            options={postChart.options}
            series={postChart.series}
            type="bar"
            width="100%"
            height={250}
          />
        </div>
        <div className="chart-box">
          <h3>Views & Engagement</h3>
          <Chart
            options={viewChart.options}
            series={viewChart.series}
            type="area"
            width="100%"
            height={250}
          />
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="recent-posts">
          <h3>Recent Posts</h3>
          <ul>
            {recentPosts.map((post) => (
              <li key={post._id}>
                <strong>{post.title}</strong>{" "}
                <span>- {new Date(post.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="top-authors">
          <h3>Top Authors</h3>
          <ul>
            {topAuthors.map((a, i) => (
              <li key={i}>
                {a.name} – {a.count} posts
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
