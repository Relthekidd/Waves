import { useAuth } from './useAuth'
import { useRouter } from 'next/router'
import React from 'react'

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) return null
    if (!user) {
      router.push('/')
      return null
    }
    return <Component {...props} />
  }
}
