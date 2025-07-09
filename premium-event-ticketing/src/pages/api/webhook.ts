import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'
import { firestore } from '../../lib/firebaseAdmin'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const buf = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })

  const sig = req.headers['stripe-signature'] as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    await firestore.collection('orders').add({
      eventId: session.metadata?.eventId,
      email: session.customer_details?.email,
      quantity: session.amount_total / 100,
    })
  }

  res.json({ received: true })
}
