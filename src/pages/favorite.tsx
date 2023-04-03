import Layout from '@/components/Layout'
import React from 'react'
import { InferGetServerSidePropsType, NextPageContext } from 'next'
import PromptList from '@/components/PromptList'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import fetcher from '@/lib/fetcher'

export const getServerSideProps = async (context: NextPageContext) => {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/like?limit=20`)
  return {
    props: { data },
  }
}

export default function FavoritePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // get user session, if not logged in, redirect to login page
  const { data: session } = useSession()
  const apiUrl = '/api/like'

  if (!session) {
    return (
      <Layout>
        <div className='container my-10 mx-auto max-x-6xl'>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-2xl'>
              Please{' '}
              <Link href='/api/auth/signin' className='link-secondary'>
                Sign In
              </Link>{' '}
              to view your favorite prompts.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <PromptList data={props.data} apiUrl={apiUrl} />
    </Layout>
  )
}
