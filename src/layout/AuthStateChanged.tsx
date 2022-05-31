import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import useAuth from '../hook/auth'
import AuthService from '../service/AuthService'

export default function AuthStateChanged({ children }: any) {
  const { setUser }: any = useAuth()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    AuthService.waitForUser((userCred: object | undefined | null) => {
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
