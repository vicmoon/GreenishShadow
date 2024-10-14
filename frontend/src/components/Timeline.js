import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Timeline.css";

function Timeline() {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the backend when the component mounts
  useEffect(() => {
    // Fetch the articles from the backend
    fetch("http://localhost:3000/api/posts") // Adjust URL as needed
      .then((response) => response.json())
      .then((data) => setArticles(data)) // Set fetched data to the articles state
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="timeline">
      {articles.map((article) => (
        <div
          className={`timeline-item ${
            article.tag === "game update" ? "right" : "left"
          }`}
          key={article._id} // MongoDB document ID is `_id`
        >
          <div className="timeline-content">
            <h3>{article.title}</h3>
            <Link
              to={`/article/${article._id}`} // Use _id to navigate to the article detail page
              className="timeline-article-link"
            >
              <img
                src={article.image || "/default-image.jpg"}
                alt={article.title}
              />
            </Link>
            <p>{article.createdAt}</p>{" "}
            {/* Assuming you have a createdAt field */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
