import React, { useEffect, useState } from 'react';

interface TicketTier {
  name: string;
  price: number;
  perks: string[];
  remaining: number;
}

interface TicketTiersProps {
  onSelect: (tier: TicketTier) => void;
}

const TicketTiers: React.FC<TicketTiersProps> = ({ onSelect }) => {
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);

  useEffect(() => {
    const fetchTicketTiers = async () => {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setTicketTiers(data);
    };

    fetchTicketTiers();
  }, []);

  const handleSelect = (tier: TicketTier) => {
    onSelect(tier);
  };

  return (
    <section id="tickets" className="tickets fade-in">
      <h2>Tickets</h2>
      {ticketTiers.map((tier) => (
        <div key={tier.name} className="ticket-tier">
          <h3>{tier.name}</h3>
          <p className="price">${tier.price}</p>
          <ul>
            {tier.perks.map((perk, index) => (
              <li key={index}>{perk}</li>
            ))}
          </ul>
          <span className="remaining">{tier.remaining} left</span>
          <button className="btn select" onClick={() => handleSelect(tier)}>
            Select
          </button>
        </div>
      ))}
    </section>
  );
};

export default TicketTiers;