import type { NextApiRequest, NextApiResponse } from 'next';

const inventory = [
  { tier: 'General Admission', price: 150, remaining: 100 },
  { tier: 'VIP', price: 300, remaining: 50 },
  { tier: 'Ultra', price: 600, remaining: 20 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(inventory);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}