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
import PeerReviewer from './about/PeerReviewer';
import PublicationEthics from './about/PublicationEthics';
import Abstracting from './about/Abstracting';
import ArticleProcessing from './about/ArticleProcessing';
import Login from './components/Login';
import LatestBlog from './pages/LatestBlog';
import Journal from './journals/Journal';
import JournalBlogPage from './pages/JournalBlogPage';


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
          <Route path="/peer-reviewer" element={<PeerReviewer />} />
          <Route path="/publication-ethics" element={<PublicationEthics/>} />
          <Route path='/abstracting' element={<Abstracting/>} />
          <Route path='/article-processing' element={<ArticleProcessing/> } />
          <Route path="/auth" element={<Login />} />
          <Route path="/latest-blog" element={<LatestBlog/>}  />
           {/* <Route path="/journal" element={<Journal/>}  /> */}
           
            <Route path="/journal/:journalId" element={<Journal />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
