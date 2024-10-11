import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import ArticleBody from "./components/ArticleBody";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/article/:articleId" element={<ArticleBody />} />
      </Routes>
    </Router>
  );
}

export default App;
