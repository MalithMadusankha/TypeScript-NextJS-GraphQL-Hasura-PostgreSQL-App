import { createContext, useContext, useState } from 'react'
import AuthService from '../service/AuthService'

const authContext = createContext(AuthProvider)

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<object | null>(null)
  const [error, setError] = useState('')
  // Login user using by email and password
  const login = async (email: any, password: any) => {
    const { error, user }: any = await AuthService.SignIn(email, password)
    setUser(user ?? null)
    setError(error ?? '')
  }
  // Create user using by email and password
  const signUp = async (email: any, password: any) => {
    const { error, user }: any = await AuthService.SignUp(email, password)
    setUser(user ?? null)
    setError(error ?? '')
  }
  // Logout
  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const value = { user, error, logout, setUser, login, signUp }

  return <authContext.Provider value={value} {...props} />
}
