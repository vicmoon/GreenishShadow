import React from "react";
import { useParams } from "react-router-dom"; // Import to get URL params
import "./ArticleBody.css";

function ArticleBody() {
  const { articleId } = useParams(); // Get the dynamic article ID from the URL

  // Simulated article data (in a real app, you might fetch this from an API)
  const articles = {
    1: {
      title: "Lorem Ipsum",
      tag: "ARTICLE",
      content: [
        `"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."`,
        `"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."`,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat condimentum enim at feugiat...",
      ],
      subheading: "Subheading Example",
      subContent: [
        "Maecenas pellentesque fermentum erat, sed facilisis magna facilisis eget.",
        "Nam pellentesque nisl porta hendrerit elementum.",
      ],
    },
    2: {
      title: "Another Article",
      tag: "UPDATE",
      content: [
        `"This is another article content starting with something different."`,
        `"Exploring the depths of the ocean, many mysteries remain unsolved."`,
        "The world continues to fascinate with its wonders, and more exploration reveals new perspectives...",
      ],
      subheading: "New Discoveries",
      subContent: [
        "Scientists have recently found new marine species that were previously unknown.",
        "The research continues, and discoveries show potential for more unknown entities in the ocean.",
      ],
    },
  };

  // Get the article based on the articleId (or show a not found message if the ID is invalid)
  const article = articles[articleId];

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div className="article">
      <div className="article-tag">
        <span className="tag-label">TAGS: </span>
        <span className="tag-value">{article.tag}</span>
      </div>

      <div className="article-content">
        <h2>{article.title}</h2>
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h3>{article.subheading}</h3>
        {article.subContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default ArticleBody;
