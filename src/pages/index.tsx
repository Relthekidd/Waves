import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Hero from '../components/layout/Hero'
import EventCard from '../components/events/EventCard'
import TicketTierCard from '../components/events/TicketTierCard'
import CheckoutModal from '../components/checkout/CheckoutModal'
import { useStore } from '../store/useStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl: string
  ticketTiers: Array<{
    id: string
    name: string
    price: number
    stripePriceId: string
    perks: string[]
    remaining: number
    isPopular?: boolean
  }>
  isActive: boolean
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const {
    isCheckoutModalOpen,
    selectedTicketTier,
    setCheckoutModalOpen,
    setSelectedTicketTier,
  } = useStore()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const eventsQuery = query(
        collection(db, 'events'),
        where('isActive', '==', true)
      )
      const snapshot = await getDocs(eventsQuery)
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[]
      
      setEvents(eventsData)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewTickets = (event: Event) => {
    setSelectedEvent(event)
    // Scroll to tickets section
    const ticketsSection = document.getElementById('tickets')
    ticketsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectTicket = (tier: any) => {
    setSelectedTicketTier(tier)
    setCheckoutModalOpen(true)
  }

  const handleCloseCheckout = () => {
    setCheckoutModalOpen(false)
    setSelectedTicketTier(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Events Section */}
      <section id="events" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of premium events, 
              each designed to provide an unforgettable experience.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-4" />
                  <div className="bg-muted rounded h-4 mb-2" />
                  <div className="bg-muted rounded h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewTickets={handleViewTickets}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No events available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tickets Section */}
      {selectedEvent && (
        <section id="tickets" className="py-20 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Choose Your Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                Select the perfect ticket tier for {selectedEvent.title}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedEvent.ticketTiers.map((tier, index) => (
                <TicketTierCard
                  key={tier.id}
                  tier={tier}
                  onSelect={handleSelectTicket}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckout}
        ticketTier={selectedTicketTier}
      />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Night of Elegance. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/terms" className="text-muted-foreground hover:text-gold transition-colors">
              Terms
            </a>
            <a href="/privacy" className="text-muted-foreground hover:text-gold transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage