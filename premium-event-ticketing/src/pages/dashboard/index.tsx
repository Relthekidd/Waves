import { withAuth } from '../../hooks/withAuth'
import { firestore } from '../../lib/firebaseAdmin'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Dashboard() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    firestore
      .collection('events')
      .get()
      .then((snap) => setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/${event.id}/admin`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withAuth(Dashboard)
