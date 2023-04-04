import Link from 'next/link'
import Image from 'next/image'
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
          <Link href='/' className='flex items-center space-x-2 w-8 md:w-10'>
            <Image src='/logo.png' width='100' height='100' alt='logo'></Image>
            <span className='text-xl'>PromptBook</span>
          </Link>
        </div>
        <div className='flex-none gap-4 items-center justify-center'>
          {session?.user && (
            <Link href='/new' className='rounded-md hover:text-secondary'>
              + Prompt
            </Link>
          )}
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
                  <Image
                    src={`${session?.user?.image}`}
                    width={100}
                    height={100}
                    alt={`${session?.user?.name}`}
                    className='rounded-full w-8 md:w-10'
                  />
                )}
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40'
              >
                <li>
                  <Link href='/favorite' className='justify-between'>
                    My favorite
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
