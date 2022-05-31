import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './auth'
import Loading from '../../components/loading'
import {NextComponentType, GetStaticProps} from 'next'
import { AppProps } from 'next/app'

export function withPublic(Component: any) {
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

export function withProtected(Component:any) {
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
