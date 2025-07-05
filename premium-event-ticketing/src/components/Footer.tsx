import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer fade-in">
      <p>&copy; {new Date().getFullYear()} Night of Elegance</p>
      <p>
        <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
      </p>
    </footer>
  );
};

export default Footer;