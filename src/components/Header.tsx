import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import SwitchTheme from '@/components/SwitchTheme'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className='flex'>
      <div className='navbar bg-base-100 justify-between items-center'>
        <div>
          <Link href='/' className='bg-primary text-white text-2xl font-semibold'>
            PromptBook
          </Link>
        </div>
        <div className='flex-none gap-4 items-center justify-center'>
          <Link href='/new' className='rounded-md hover:text-secondary'>
            + Prompt
          </Link>
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
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40'
              >
                <li>
                  <a href='/favorite' className='justify-between'>
                    My favorite
                  </a>
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
