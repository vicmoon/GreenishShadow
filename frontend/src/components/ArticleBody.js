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
      content: [
        `"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."`,
        `"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."`,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat condimentum enim at feugiat...",
      ],
    },
    2: {
      title: "Another Article",
      tag: "UPDATE",
      content: [
        `"Lorem ipsum odor amet, consectetuer adipiscing elit. Nec dapibus eros proin ante arcu condimentum. Sem vestibulum tempus orci vivamus curae neque at! Magna malesuada conubia rhoncus maximus lacinia aptent tellus. Ridiculus enim arcu; urna quis consequat cursus. Efficitur eu eget lectus ornare augue suspendisse. Luctus sed vel curabitur eros vitae eget ridiculus viverra. Euismod parturient aliquet in quam; at mus. Sollicitudin congue purus nostra lectus euismod tempor laoreet.

Eros blandit condimentum dictumst fusce sit accumsan. Nulla duis laoreet efficitur odio diam. Dis dui ipsum nascetur consectetur aenean elit curae. Nisl consequat cursus; magnis cubilia nunc habitant urna. Aliquam luctus semper porttitor; ac hendrerit neque. Adipiscing vitae dignissim nibh viverra montes.

Potenti integer dolor a eleifend dignissim. Facilisi feugiat sem fringilla maecenas venenatis dolor sed morbi. Scelerisque primis aliquam sociosqu sodales nulla vestibulum sed. Pharetra id scelerisque luctus; morbi mattis ex. Elit pretium aliquam magna vehicula ante. Elementum augue varius dis nibh blandit morbi vulputate curabitur quisque. Venenatis turpis aenean; venenatis pharetra lacus molestie potenti. Inceptos rutrum potenti porta facilisi phasellus.

Varius eleifend fames adipiscing ex facilisis molestie. Imperdiet et suscipit egestas cubilia scelerisque. Massa rutrum at mus mus bibendum tristique lacus condimentum. Parturient venenatis ex in hac adipiscing tellus augue tempus luctus. Maximus class felis tempor efficitur facilisi blandit imperdiet. Nascetur cras luctus sodales amet velit. Bibendum arcu tempor sapien dolor nascetur aliquet nullam potenti. Rhoncus pulvinar cras habitasse, malesuada taciti non lobortis pellentesque.

Mattis inceptos mollis varius aliquam eleifend suspendisse dignissim curae. Erat lacus montes ipsum tristique litora mauris. Ultricies accumsan laoreet urna finibus diam platea mattis dolor. Sociosqu nec eleifend purus in nibh. Cras ligula arcu rutrum imperdiet nullam. Sociosqu fusce convallis id non vel auctor quis ex. Viverra viverra aliquet proin orci eros."`,
        `"Exploring the depths of the ocean, many mysteries remain unsolved."`,
        "The world continues to fascinate with its wonders, and more exploration reveals new perspectives...",
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

        {/* <h3>{article.subheading}</h3>
        {article.subContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))} */}
      </div>
    </div>
  );
}

export default ArticleBody;
