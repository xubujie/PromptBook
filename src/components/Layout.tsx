import Header from './Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import Head from 'next/head'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>PromptBook</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
