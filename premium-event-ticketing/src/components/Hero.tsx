import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="hero">
      <div className="hero-bg">
        <video autoPlay loop muted className="background-video">
          <source src="/path/to/your/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-content fade-in">
        <h1 className="hero-title">Night of Elegance</h1>
        <p className="hero-date">December 31, 2024 &bull; The Grand Hall, NYC</p>
        <a href="#tickets" className="btn primary">Buy Tickets</a>
      </div>
    </header>
  );
};

export default Hero;