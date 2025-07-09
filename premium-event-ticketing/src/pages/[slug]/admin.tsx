import { withAuth } from '../../hooks/withAuth'
import { firestore } from '../../lib/firebaseAdmin'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function AdminPage() {
  const router = useRouter()
  const { slug } = router.query
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (!slug) return
    firestore
      .collection('orders')
      .where('eventId', '==', slug)
      .get()
      .then((snap) => setOrders(snap.docs.map((d) => d.data())))
  }, [slug])

  return (
    <div>
      <h1>Event Admin</h1>
      <ul>
        {orders.map((o, i) => (
          <li key={i}>{o.email} - {o.quantity}</li>
        ))}
      </ul>
    </div>
  )
}

export default withAuth(AdminPage)
