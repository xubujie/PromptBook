import Header from './Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-full'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
