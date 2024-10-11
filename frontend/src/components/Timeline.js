import React from "react";
import { Link } from "react-router-dom"; // Import Link to handle navigation
import "./Timeline.css";

function Timeline() {
  const articles = [
    { id: 1, title: "Article I", date: "01/01/24", image: "/game.jpg" },
    { id: 2, title: "Article II", date: "01/01/24", image: "/game.jpg" },
  ];

  return (
    <div className="timeline">
      {articles.map((article, index) => (
        <div
          className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          key={article.id}
        >
          <div className="timeline-content">
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} />
            <p>{article.date}</p>
            <Link to={`/article/${article.id}`}>Read More</Link>{" "}
            {/* Dynamic link */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
