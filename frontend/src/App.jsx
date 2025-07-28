// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import AuthorGuidelines from './pages/AuthorGuidelines';
import './App.css';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
