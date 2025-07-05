import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketTier: string;
  price: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, ticketTier, price }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the checkout API with formData and ticketTier
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, ticketTier, price }),
    });

    if (response.ok) {
      alert('Payment processed successfully!');
      onClose();
    } else {
      alert('There was an error processing your payment.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h2>Checkout - {ticketTier} (${price})</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          
          <button type="submit" className="btn primary">Pay Now</button>
          <p className="note">Secure payment processing placeholder</p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;