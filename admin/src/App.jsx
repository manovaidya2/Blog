import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import AdminJournalPage from './pages/AdminJournalPage';
import AdminBlogPage from './pages/AdminBlogPage'

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/journals" element={<AdminJournalPage />} />
          <Route path="/admin/blogs" element={<AdminBlogPage />} />

        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
