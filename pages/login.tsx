import React from 'react'
import { withPublic } from '../src/hook/route'
import Head from 'next/head'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { VscLoading } from 'react-icons/vsc'

const Login = ({ auth }: any) => {
  const router = useRouter()
  const { signUp, login } = auth
  const [signInEmail, setSignInEmail] = useState<string>('')
  const [signInPassword, setSignInPassword] = useState<string>('')
  const [signUpEmail, setSignUpEmail] = useState<string>('')
  const [signUpPassword, setSignUpPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMatch, setIsMatch] = useState<boolean>(true)

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    try {
      if (signUpPassword === confirmPassword) {
        setIsLoading(true)
        setIsMatch(true)
        await signUp(signUpEmail, signUpPassword)
        setIsLoading(false)
        router.push('/dashboard')
      } else {
        setIsMatch(false)
        setIsLoading(false)
      }
    } catch (err) {}
  }

  const handleSignIn = async (e: any) => {
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
                <div className="flex w-64 items-center rounded-xl bg-gray-100 p-1">
                  <MdLockOutline className="m-2 text-gray-400" />{' '}
                  <input
                    type="password"
                    name="confirm-password"
                    placeholder="confirm password"
                    className="flex-1 bg-gray-100 text-sm text-black outline-none"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
                    value={confirmPassword}
                  />
                </div>
                {!isMatch && (
                  <div
                    id="alert-2"
                    className="mt-3 flex rounded-lg bg-blue-100 p-2 dark:bg-blue-200"
                    role="alert"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-red-700 dark:text-red-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                      Password is not match
                    </div>
                    <button
                      type="button"
                      className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-blue-100 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
                      data-dismiss-target="#alert-2"
                      aria-label="Close"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {isLoading ? (
                <div className="inline-block rounded-full border-2 border-white py-2 px-12 font-semibold text-white hover:bg-white hover:text-blue-500">
                  <VscLoading className="mr-3 animate-spin text-2xl" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="inline-block rounded-full border-2 border-white py-2 px-12 font-semibold hover:bg-white hover:text-blue-500"
                >
                  Sign Up
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withPublic(Login)
