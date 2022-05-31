import { createContext, useContext, useState } from 'react'
import AuthService from '../service/AuthService'

type Result = {
  error: any,
  user: any
}
const authContext = createContext(AuthProvider)

export default function useAuth() {
  return useContext(authContext)
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const login = async (email: any, password: any) => {
    console.log(email, password)
    const { error:any, user }: any = await AuthService.SignIn(email, password)
    setUser(user ?? null)
    setError(error ?? '')
  }

  const signUp = async (email: any, password: any) => {
    const { error, user }: any = await AuthService.SignUp(email, password)
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
