import React from 'react';
import './Landing.css';

function Landing({ setView }) {
  return (
    <div className="landing-page">
      {/* Animated background rings */}
      <div className="ring ring-1"></div>
      <div className="ring ring-2"></div>
      <div className="ring ring-3"></div>

      {/* Floating particles */}
      <div className="particle-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 10}`}></div>
        ))}
      </div>

      {/* Main content */}
      <div className="landing-content">
        <div className="logo-wrapper fade-in-up">
          <h1 className="landing-logo">CINEVERSE</h1>
          <div className="logo-underline"></div>
        </div>

        <p className="landing-tagline fade-in-up delay-1">
          The Ultimate Cinematic Experience
        </p>

        <p className="landing-sub fade-in-up delay-2">
          Discover thousands of movies · Trending · Top Rated · Your Watchlist
        </p>

        <button className="enter-btn fade-in-up delay-3" onClick={() => setView('home')}>
          <span className="btn-text">ENTER CINEVERSE</span>
          <span className="btn-arrow">→</span>
        </button>

        {/* <div className="tech-badges fade-in-up delay-4">
          <span className="tech-badge">React</span>
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">Express</span>
          <span className="tech-badge">Bootstrap</span>
          <span className="tech-badge">ES6</span>
          <span className="tech-badge">Regex</span>
        </div> */}
      </div>
    </div>
  );
}

export default Landing;
