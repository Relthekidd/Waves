import React, { useState } from 'react';
import CheckoutButton from './CheckoutButton';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketTier: string;
  price: number;
  stripePriceId: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, ticketTier, price, stripePriceId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
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
          
          <CheckoutButton
            ticketData={{ stripe_price_id: stripePriceId, email: formData.email }}
          >
            Pay Now
          </CheckoutButton>
          <p className="note">Secure payment processing placeholder</p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;