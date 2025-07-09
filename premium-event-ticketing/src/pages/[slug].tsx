import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import CheckoutModal from '../components/CheckoutModal'
import TicketTiers from '../components/TicketTiers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { firestore } from '../lib/firebaseAdmin'
import { useState } from 'react'

interface TicketTier {
  id: string
  name: string
  price: number
  stripe_price_id: string
  perks: string[]
}

interface EventPageProps {
  event: {
    id: string
    title: string
    location: string
    image: string
    ticketTiers: TicketTier[]
  }
}

export default function EventPage({ event }: EventPageProps) {
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>

  return (
    <div>
      <Header />
      <section className="event-hero">
        <img src={event.image} alt={event.title} />
        <h1>{event.title}</h1>
        <p>{event.location}</p>
      </section>
      <TicketTiers
        onSelect={(tier) => {
          setSelectedTier(tier as TicketTier)
          setOpen(true)
        }}
      />
      {selectedTier && (
        <CheckoutModal
          isOpen={open}
          onClose={() => setOpen(false)}
          ticketTier={selectedTier.name}
          price={selectedTier.price}
          stripePriceId={selectedTier.stripe_price_id}
        />
      )}
      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collection('events').get()
  const paths = snapshot.docs.map((doc) => ({ params: { slug: doc.id } }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const doc = await firestore.collection('events').doc(slug).get()
  const event = doc.data() || null
  if (!event) return { notFound: true }
  return {
    props: {
      event: { id: doc.id, ...event },
    },
    revalidate: 60,
  }
}
