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
        {/* <a href="https://greenish-shadow-5ceb.vercel.app">
          <img className="socials-logo" src="/logo.jpg" alt="logo" />
        </a> */}
        <span className="hero-text">
          <div className="hero-large-text">
            <span>Romain</span>
            <span>Vernier</span>
          </div>

          <ul className="social-links">
            <li className="menu_option">
              <div className="cube"></div>
              <ul>Journal</ul>
            </li>

            <li className="menu_option">
              <div className="cube"></div>
              <ul>Motion Design</ul>
            </li>
            <li className="menu_option">
              <div className="cube"></div>
              <ul>Motion Design</ul>
            </li>
          </ul>
        </span>
      </section>

      {/* <section className="subscription">
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
      </section> */}
    </div>
  );
}

export default Header;
