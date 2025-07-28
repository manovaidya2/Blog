// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import AuthorGuidelines from './pages/AuthorGuidelines';
import ReviewerGuidelines from './pages/ReviewerGuidelines';
import EditorGuidelines from './pages/EditorGuidelines';
import AboutThis from './about/AboutThis'; 
import EditorialBoard from './about/EditorialBoard';


import './App.css';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/author-guidelines" element={<AuthorGuidelines />} />
          <Route path="/reviewer-guidelines" element={<ReviewerGuidelines />} />
          <Route path="/editor-guidelines" element={<EditorGuidelines />} />
          <Route path="/about-this" element={<AboutThis />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
