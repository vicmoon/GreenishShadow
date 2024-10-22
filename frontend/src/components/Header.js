import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [email, setEmail] = useState('');
  const [weeklyLetter, setWeeklyLetter] = useState(false);
  const [gameUpdates, setGameUpdates] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Send the form data to the backend
    fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        weeklyLetter,
        gameUpdates,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // If response status is not OK, throw an error with the response message
          return response.json().then((data) => {
            throw new Error(data.message || 'Error registering the user');
          });
        }
        return response.json();
      })
      .then((data) => {
        // If user was created successfully
        console.log('User created', data);
        setConfirmationMessage(data.message || 'Subscribed successfully!');

        // Clear the form fields
        setEmail('');
        setWeeklyLetter(false); // Reset checkboxes to false (uncheck)
        setGameUpdates(false); // Reset checkboxes to false (uncheck)

        // Clear the confirmation message after 3 seconds
        setTimeout(() => {
          setConfirmationMessage(''); // Clear the message
          // navigate('/');
        }, 2000);
      })
      .catch((error) => {
        setConfirmationMessage('Error subscribing. Please try again.');
      });
  };

  return (
    <div className="header">
      <section className="socials">
        <a href={`${process.env.REACT_APP_BACKEND_BASEURL}/api/posts`}>
          <img className="socials-logo" src="/logo.jpg" alt="logo" />
        </a>
        <span className="socials-text">
          <p className="socials-large-text">
            Shadow <br /> Greenish
          </p>
          <h5>Find me on Social Media</h5>
          <ul className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.telegram.org" target="_blank" rel="noreferrer">
              <i className="fab fa-telegram"></i>
            </a>
          </ul>
        </span>
      </section>

      <section className="subscription">
        <h5>Subscription</h5>
        {confirmationMessage && <p>{confirmationMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={weeklyLetter}
              onChange={(e) => setWeeklyLetter(e.target.checked)}
            />
            Weekly Letter
          </label>
          <label>
            <input
              type="checkbox"
              checked={gameUpdates}
              onChange={(e) => setGameUpdates(e.target.checked)}
            />
            Game Updates
          </label>
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default Header;
