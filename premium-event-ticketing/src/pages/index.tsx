import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import TicketTiers from '../components/TicketTiers';
import CheckoutModal from '../components/CheckoutModal';
import RSVPForm from '../components/RSVPForm';
import Footer from '../components/Footer';

const HomePage = () => {
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: number; stripe_price_id: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (tier: { name: string; price: number; stripe_price_id: string }) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <TicketTiers onSelect={handleSelect} />
      {selectedTier && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ticketTier={selectedTier.name}
          price={selectedTier.price}
          stripePriceId={selectedTier.stripe_price_id}
        />
      )}
      <RSVPForm />
      <Footer />
    </div>
  );
};

export default HomePage;