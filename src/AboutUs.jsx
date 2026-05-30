import React from 'react';
import './AboutUs.css';

function AboutUs() {
  const scrollToAbout = () => {
    document.getElementById('about-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      {/* SECTION 1: Welcome Header */}
      <header className="welcome-hero">
        <div className="hero-box">
          <h1 className="hero-title">Welcome To<br /><span>Ziad's Plants</span></h1>
          <div className="line"></div>
          <p>Where Green Meets Serenity</p>
          <button className="btn-start" onClick={scrollToAbout}>Get Started</button>
        </div>
      </header>

      {/* SECTION 2: Detailed Info */}
      <main id="about-content" className="details-container">
        <div className="header-text">
          <span className="pill">Eco-Friendly Living</span>
          <h2 className="title">Breathe <span>Life</span> Into Your Space.</h2>
          <p className="subtitle">We bridge the gap between urban living and the natural world.</p>
        </div>

        <div className="bento-grid">
          <div className="card mission">
            <h3>Our Green Mission</h3>
            <p>At Ziad's Plants, we believe every leaf tells a story...</p>
          </div>
          <div className="card stat">
            <h4>98%</h4>
            <p>Customer Love</p>
          </div>
          <div className="card stat">
            <h4>500+</h4>
            <p>Plant Deliveries</p>
          </div>
          <div className="card expert">
            <h3>Expert Guidance</h3>
            <p>Our team ensures each plant meets strict standards...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;