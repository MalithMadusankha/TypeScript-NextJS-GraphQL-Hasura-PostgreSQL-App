import '../src/config/firebase.config'
import '../styles/globals.css'
import React from 'react'
import { AuthProvider } from '../src/hook/auth'
import AuthStateChanged from '../src/layout/AuthStateChanged'
import AppLayout from '../src/layout/AppLayout'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <AppLayout>
          <AuthStateChanged>
            <Component {...pageProps} />
          </AuthStateChanged>
        </AppLayout>
      </AuthProvider>
    </>
  )
}

// export default MyApp
