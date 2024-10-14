import React from "react";
import { useParams } from "react-router-dom";
import "./ArticleBody.css";

function ArticleBody() {
  const { articleId } = useParams(); // Get the dynamic article ID from the URL

  // Simulated article data (in a real app, you might fetch this from an API)
  const articles = {
    1: {
      title: "Lorem Ipsum",
      tag: "ARTICLE",
      content: `
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
        There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat condimentum enim at feugiat.
        Vestibulum nec elementum nunc, non placerat nisi. Vestibulum dignissim diam non erat ullamcorper, vel
        interdum erat pellentesque. Maecenas pellentesque fermentum erat, sed facilisis magna facilisis eget."
      `,
    },
    2: {
      title: "Another Article",
      tag: "GAME",
      content: `
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Nec dapibus eros proin ante arcu condimentum.
        Sem vestibulum tempus orci vivamus curae neque at! Magna malesuada conubia rhoncus maximus lacinia aptent tellus.
        Ridiculus enim arcu; urna quis consequat cursus. Efficitur eu eget lectus ornare augue suspendisse.
        Luctus sed vel curabitur eros vitae eget ridiculus viverra. Euismod parturient aliquet in quam; at mus.
        Sollicitudin congue purus nostra lectus euismod tempor laoreet. 
        Eros blandit condimentum dictumst fusce sit accumsan. Nulla duis laoreet efficitur odio diam."
      `,
    },
  };

  // Get the article based on the articleId (or show a not found message if the ID is invalid)
  const article = articles[articleId];

  if (!article) {
    return <div>Article not found!</div>;
  }

  // Dynamic class for the tag value based on the article tag
  const tagClass = article.tag === "ARTICLE" ? "article" : "game";

  return (
    <div className="article">
      <div className="article-tag">
        <span className="tag-label">TAGS: </span>
        <span className={`tag-value ${tagClass}`}>{article.tag}</span>{" "}
        {/* Dynamically adds 'article' or 'update' class */}
      </div>

      <div className="article-content">
        <h2>{article.title}</h2>
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default ArticleBody;
