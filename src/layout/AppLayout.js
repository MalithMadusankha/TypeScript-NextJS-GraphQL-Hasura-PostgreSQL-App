import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Navbar from '../../components/navbar'
import useAuth from '../hook/auth'

export default function AppLayout({ children }) {
  const auth = useAuth()

  const router = useRouter()

  if (router.pathname !== '/login') {
    return (
      <main>
        <Navbar auth={auth} />
        {children}
      </main>
    )
  } else {
    return children
  }
}
