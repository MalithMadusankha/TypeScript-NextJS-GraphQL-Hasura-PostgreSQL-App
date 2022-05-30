import { createContext, useContext, useState } from 'react'
import AuthService from '../service/AuthService'

const authContext = createContext()

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    const { error, user } = await AuthService.SignIn(email, password)
    setUser(user ?? null)
    setError(error ?? '')
  }

  const signUp = async (email, password) => {
    const { error, user } = await AuthService.SignUp(email, password)
    setUser(user ?? null)
    setError(error ?? '')
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const value = { user, error, logout, setUser, login, signUp }

  return <authContext.Provider value={value} {...props} />
}
