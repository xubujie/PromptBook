import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import SwitchTheme from '@/components/SwitchTheme'
import Image from 'next/image'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className='flex'>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <Link href='/'>
            <Image src='/logo-color.svg' alt='logo' width={60} height={60} />
          </Link>
        </div>
        <div className='flex-none gap-4 items-center justify-center'>
          <Link href='/prompts'>Add Prompt</Link>
          <SwitchTheme />
          {!session && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
                className='btn btn-primary'
              >
                Login
              </button>
            </>
          )}
          {session?.user && (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                {session.user.image && (
                  <img src={`${session?.user?.image}`} className='w-10 rounded-full' />
                )}
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <a className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
