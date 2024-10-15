import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArticleBody.css';

function ArticleBody() {
  const { articleId } = useParams(); // Get the dynamic article ID from the URL
  const [article, setArticle] = useState(null); // State to store the article data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store error messages

  // Fetch the article from the backend when the component mounts
  useEffect(() => {
    // Replace with the correct backend API URL
    fetch(`http://localhost:9000/api/posts/${articleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching article: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data); // Set the article data
        setLoading(false); // Mark loading as complete
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch the article.');
        setLoading(false); // Mark loading as complete even in case of error
      });
  }, [articleId]);

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading article...</div>;
  }

  // If there was an error fetching the article, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If the article is not found, show a not found message
  if (!article) {
    return <div>Article not found!</div>;
  }

  // Dynamic class for the tag value based on the article tag
  const tagClass = article.tag === 'Article' ? 'article' : 'game';

  return (
    <div className="article">
      <div className="article-tag">
        <span className="tag-label">TAGS: </span>
        <span className={`tag-value ${tagClass}`}>{article.tag}</span>{' '}
        {/* Dynamically adds 'article' or 'game' class */}
      </div>

      <div className="article-content">
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="article-image"
          />
        )}
      </div>
    </div>
  );
}

export default ArticleBody;
