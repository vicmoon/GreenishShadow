import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Timeline.css";

function Timeline() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched: ", data); // Debug the response here
        // Adjust this based on the actual structure of the data you're receiving
        if (data.posts) {
          setArticles(data.posts); // if the response contains { posts: [...] }
        } else {
          setArticles(data); // if the response is just an array
        }
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="timeline">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div
            className={`timeline-item ${
              article.tag === "Game" ? "right" : "left"
            }`}
            key={article._id}
          >
            <div className="timeline-content">
              <h3>{article.title}</h3>
              <Link
                to={`/article/${article._id}`}
                className="timeline-article-link"
              >
                <img src={article.image || "/game.jpg"} alt={article.title} />
              </Link>
              <p>{article.createdAt}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
}

export default Timeline;
