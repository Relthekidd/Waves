import React, { useState } from 'react';

const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Please fill in all fields.');
      return;
    }

    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, guests }),
    });

    if (response.ok) {
      alert('RSVP submitted successfully!');
      setName('');
      setEmail('');
      setGuests(1);
    } else {
      setError('Failed to submit RSVP. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      <h2>RSVP</h2>
      {error && <p className="error">{error}</p>}
      <label htmlFor="rsvp-name">Full Name</label>
      <input
        type="text"
        id="rsvp-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="rsvp-email">Email</label>
      <input
        type="email"
        id="rsvp-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="rsvp-guests">Guests</label>
      <input
        type="number"
        id="rsvp-guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      />
      <button type="submit" className="btn primary">Submit RSVP</button>
      <p className="note">Confirmation email will be sent automatically.</p>
    </form>
  );
};

export default RSVPForm;