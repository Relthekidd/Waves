import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Night of Elegance</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link href="#tickets">Tickets</Link>
          </li>
          <li>
            <Link href="#gallery">Gallery</Link>
          </li>
          <li>
            <Link href="#rsvp">RSVP</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;