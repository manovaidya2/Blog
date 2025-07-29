import React from "react";
import Chart from "react-apexcharts";
import { FaFileAlt, FaEye, FaCheckCircle, FaComments } from "react-icons/fa";
import "../style/Dashboard.css";

const Dashboard = () => {
  // Chart Data
  const postChart = {
    options: {
      chart: { id: "blog-posts" },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
      },
    },
    series: [
      {
        name: "Posts",
        data: [5, 10, 6, 12, 8, 14, 11, 9, 15, 10, 13, 17],
      },
    ],
  };

  const viewChart = {
    options: {
      chart: { id: "views" },
      xaxis: {
        categories: [
          "Week 1", "Week 2", "Week 3", "Week 4"
        ],
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

      {/* Stat Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaFileAlt className="stat-icon" />
          <div>
            <h4>Total Blogs</h4>
            <p>142</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCheckCircle className="stat-icon green" />
          <div>
            <h4>Published</h4>
            <p>120</p>
          </div>
        </div>
        <div className="stat-card">
          <FaFileAlt className="stat-icon yellow" />
          <div>
            <h4>Drafts</h4>
            <p>22</p>
          </div>
        </div>
        <div className="stat-card">
          <FaComments className="stat-icon blue" />
          <div>
            <h4>Comments</h4>
            <p>310</p>
          </div>
        </div>
      </div>

      {/* Charts */}
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

      {/* Bottom Sections */}
      <div className="dashboard-bottom">
        <div className="recent-posts">
          <h3>Recent Posts</h3>
          <ul>
            <li>
              <strong>AI in 2025</strong> <span>- Jul 25, 2025</span>
            </li>
            <li>
              <strong>React Server Components</strong> <span>- Jul 23, 2025</span>
            </li>
            <li>
              <strong>Writing SEO Optimized Blogs</strong> <span>- Jul 20, 2025</span>
            </li>
          </ul>
        </div>
        <div className="top-authors">
          <h3>Top Authors</h3>
          <ul>
            <li>Abhishek Kumar – 32 posts</li>
            <li>Priya Mehta – 24 posts</li>
            <li>Rohan Das – 18 posts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
