import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface CheckoutButtonProps {
  ticketData: { stripe_price_id: string; email: string };
  children?: React.ReactNode;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ ticketData, children }) => {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ price: ticketData.stripe_price_id, quantity: 1 }],
        email: ticketData.email,
      }),
    });

    const { id } = await res.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <button className="btn primary" onClick={handleCheckout}>
      {children || 'Buy Ticket'}
    </button>
  );
};

export default CheckoutButton;
