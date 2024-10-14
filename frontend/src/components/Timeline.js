import React from "react";
import { Link } from "react-router-dom"; // Import Link to handle navigation
import "./Timeline.css";

function Timeline() {
  const articles = [
    {
      id: 1,
      title: "Article I",
      date: "01/01/24",
      image: "/article.jpeg",
      type: "article",
    },
    {
      id: 2,
      title: "Game Update",
      date: "01/01/24",
      image: "/game.jpg",
      type: "game update",
    },
    {
      id: 3,
      title: "Article II",
      date: "01/01/24",
      image: "/article.jpeg",
      type: "article",
    },
    {
      id: 4,
      title: "Game Update",
      date: "01/01/24",
      image: "/game.jpg",
      type: "game update",
    },
  ];

  return (
    <div className="timeline">
      {articles.map((article) => (
        <div
          className={`timeline-item ${
            article.type === "game update" ? "right" : "left"
          }`}
          key={article.id}
        >
          <div className="timeline-content">
            <h3>{article.title}</h3>
            <Link
              to={`/article/${article.id}`}
              className="timeline-article-link"
            >
              <img src={article.image} alt={article.title} />
            </Link>
            <p>{article.date}</p>
            {/* <Link
              to={`/article/${article.id}`}
              className="timeline-article-link"
            >
              More
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
