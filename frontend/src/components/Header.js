import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <section className="socials">
        <img className="socials-logo" src="/logo.jpg" alt="logo" />
        <span className="socials-text">
          <p className="socials-large-text">Shadow Greenish</p>
          <h5>Find me on Social Media</h5>
          <ul>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
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
            <a href="https://www.threads.net" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.telegram.org" target="_blank" rel="noreferrer">
              <i className="fab fa-telegram"></i>
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-pinterest"></i>
            </a>
          </ul>
        </span>
      </section>

      <section className="subscription">
        <h5>Subscription</h5>
        <input type="email" placeholder="name@email.com" />
        <label>
          <input type="checkbox" /> Weekly Letter
        </label>
        <label>
          <input type="checkbox" /> Game Updates
        </label>
      </section>
    </div>
  );
}

export default Header;
