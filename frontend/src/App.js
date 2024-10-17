import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Timeline from './components/Timeline';
import ArticleBody from './components/ArticleBody';
import CreatePost from './components/CreatePost';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/article/:articleId" element={<ArticleBody />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
