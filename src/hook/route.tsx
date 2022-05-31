import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './auth'
import Loading from '../../components/loading'
import {NextComponentType} from 'next'

export function withPublic(Component: NextComponentType) {
  return function WithPublic(props:any) {
    const auth: any = useAuth()
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

export function withProtected(Component:NextComponentType) {
  return function WithProtected(props:any) {
    const auth: any = useAuth()
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
