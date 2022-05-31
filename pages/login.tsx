import React from 'react'
import { withPublic } from '../src/hook/route'
import Head from 'next/head'
import Image from 'next/image'
import { FaRegEnvelope } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { MdLockOutline } from 'react-icons/md'
import { useState } from 'react'
import { useRouter } from 'next/router'

type AuthType = {
  signUp: (email: string, password: string) => void, 
  login: (email: string, password: string) => void
}

const Login = ({ auth }:any) => {
  const router = useRouter()
  const { signUp, login } = auth
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isMatchPassword, setIsMatchPassword] = useState(
    'flex w-64 items-center rounded-xl bg-gray-100 p-1'
  )
  const [isMatch, setIsMatch] = useState<any>(true)

  const handleSignUp = async (e:any) => {
    e.preventDefault()
    try {
      if (signUpPassword === confirmPassword) {
        await signUp(signUpEmail, signUpPassword)
        router.push('/dashboard')
      } else {
        isMatch(false)
        setIsMatchPassword(
          'flex w-64 items-center rounded-xl border-2 border-red-500 bg-gray-100 p-1'
        )
      }
    } catch (err) {}
  }

  const handleSignIn = async (e:any) => {
    e.preventDefault()
    try {
      // SignIn(signInEmail, signInPassword)
      login(signInEmail, signInPassword)
    } catch (err) {}
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex w-2/3 max-w-4xl rounded-2xl bg-white shadow-2xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-blue-500">kasper</div>
            <div className="py-10">
              <h2 className="mb-2 text-3xl font-bold text-blue-500 ">
                Sign In To Account
              </h2>
              <div className="mb-2 inline-block w-10 border-2 border-blue-500"></div>
            </div>
            <form onClick={handleSignIn}>
              <div className="mb-3 flex flex-col items-center">
                <div className="flex w-64 items-center rounded-xl bg-gray-100 p-1">
                  <FaRegEnvelope className="m-2 text-gray-400" />{' '}
                  <input
                    type="email"
                    name="signIn-email"
                    placeholder="Email"
                    className="flex-1 bg-gray-100 text-sm outline-none"
                    onChange={(e) => setSignInEmail(e.target.value)}
                    value={signInEmail}
                  />
                </div>
              </div>
              <div className="mb-10 flex flex-col items-center">
                <div className="flex w-64 items-center rounded-xl bg-gray-100 p-1">
                  <MdLockOutline className="m-2 text-gray-400" />{' '}
                  <input
                    type="password"
                    name="signIn-password"
                    placeholder="password"
                    className="flex-1 bg-gray-100 text-sm outline-none"
                    onChange={(e) => setSignInPassword(e.target.value)}
                    value={signInPassword}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-block rounded-full border-2 border-blue-500 py-2 px-12 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="w-2/5 rounded-tr-2xl rounded-br-2xl bg-blue-500 py-10 px-12 text-white">
            <h2 className="mb-2 text-3xl font-bold ">Sign Up Here</h2>
            <div className="mb-2 inline-block w-10 border-2 border-white"></div>
            <p className="mb-10">
              Fill up personal information and start journey with us.
            </p>
            <form onSubmit={handleSignUp}>
              <div className="mb-3 flex flex-col items-center">
                <div className="flex w-64 items-center rounded-xl bg-gray-100 p-1">
                  <FaRegEnvelope className="m-2 text-gray-400" />{' '}
                  <input
                    type="email"
                    name="signUp-email"
                    placeholder="Email"
                    className="flex-1 bg-gray-100 text-sm text-black outline-none"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    value={signUpEmail}
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-col items-center">
                <div className="flex w-64 items-center rounded-xl bg-gray-100 p-1">
                  <MdLockOutline className="m-2 text-gray-400" />{' '}
                  <input
                    type="password"
                    name="signUp-password"
                    placeholder="password"
                    className="flex-1 bg-gray-100 text-sm text-black outline-none"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    value={signUpPassword}
                  />
                </div>
              </div>
              <div className="mb-10 flex flex-col items-center">
                <div className={isMatchPassword}>
                  <MdLockOutline className="m-2 text-gray-400" />{' '}
                  <input
                    type="password"
                    name="confirm-password"
                    placeholder="confirm password"
                    className="flex-1 bg-gray-100 text-sm text-black outline-none"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (confirmPassword === signUpPassword) {
                        setIsMatchPassword(
                          'flex w-64 items-center rounded-xl bg-gray-100 p-1'
                        )
                      } else {
                        setIsMatchPassword(
                          'flex w-64 items-center rounded-xl border-2 border-red-500 bg-gray-100 p-1'
                        )
                      }
                    }}
                    value={confirmPassword}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-block rounded-full border-2 border-white py-2 px-12 font-semibold hover:bg-white hover:text-blue-500"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withPublic(Login)
