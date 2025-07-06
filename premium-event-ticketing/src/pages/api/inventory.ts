import type { NextApiRequest, NextApiResponse } from 'next';

const inventory = [
  {
    name: 'General Admission',
    stripe_price_id: 'price_general',
    price: 150,
    remaining: 100,
    perks: ['Entry to event', 'Complimentary drink'],
  },
  {
    name: 'VIP',
    stripe_price_id: 'price_vip',
    price: 300,
    remaining: 50,
    perks: ['All General perks', 'VIP lounge access', 'Expedited entry'],
  },
  {
    name: 'Ultra',
    stripe_price_id: 'price_ultra',
    price: 600,
    remaining: 20,
    perks: ['All VIP perks', 'Table service', 'Meet & Greet'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(inventory);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}