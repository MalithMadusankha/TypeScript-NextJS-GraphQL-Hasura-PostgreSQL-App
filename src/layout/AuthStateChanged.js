import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import useAuth from '../hook/auth'
import AuthService from '../service/AuthService'

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthService.waitForUser((userCred) => {
      setUser(userCred)
      setLoading(false)
    })
    //eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return children
}
