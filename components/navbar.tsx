import Link from 'next/link'

export default function Navbar({ auth }: any) {
  const { logout }: any = auth
  return (
    <nav className="flex  items-center bg-blue-500 px-4 py-1 drop-shadow-md filter">
      <div className="flex w-4/12  items-center text-white">
        <Link href="/dashboard">
          <a className="text-2xl font-semibold ">kasper</a>
        </Link>
      </div>
      <div className="flex w-8/12 items-center justify-end">
        <button className="text-sm font-medium text-white" onClick={logout}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}
