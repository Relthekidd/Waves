import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import TicketTiers from '../components/TicketTiers';
import CheckoutModal from '../components/CheckoutModal';
import RSVPForm from '../components/RSVPForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Gallery />
      <TicketTiers />
      <CheckoutModal
        isOpen={false}
        onClose={() => {}}
        ticketTier=""
        price={0}
      />
      <RSVPForm />
      <Footer />
    </div>
  );
};

export default HomePage;