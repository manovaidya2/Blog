import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import AdminJournalPage from './pages/AdminJournalPage';
import AdminBlogPage from './pages/AdminBlogPage';
import LatestBlog from './pages/LatestBlog';
import AllSubmissions from './pages/AllSubmissions';
import EditBlog from './pages/EditBlog';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin/journals" element={<AdminJournalPage />} />
                  <Route path="/admin/blogs" element={<AdminBlogPage />} />
                  <Route path="/latest/blogs" element={<LatestBlog />} />
                  <Route path="/submissions" element={<AllSubmissions />} />
                  <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
