import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './auth'
import Loading from '../../components/loading'

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth()
    const router = useRouter()

    if (auth.user) {
      router.replace('/dashboard')
      return (
        <div>
          <Loading />
        </div>
      )
    }
    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth()
    const router = useRouter()

    if (!auth.user) {
      router.replace('/login')
      return (
        <div>
          <Loading />
        </div>
      )
    }
    return <Component auth={auth} {...props} />
  }
}
