import { NextApiRequest, NextApiResponse } from 'next';
// Update the import path to the correct location of connectToDatabase
import { connectToDatabase } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, guests } = req.body;

    // Basic validation
    if (!name || !email || !guests) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const db = await connectToDatabase();
      const rsvpCollection = db.collection('rsvps');

      // Insert RSVP into the database
      await rsvpCollection.insertOne({ name, email, guests, createdAt: new Date() });

      return res.status(200).json({ message: 'RSVP submitted successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Error submitting RSVP.', error });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}