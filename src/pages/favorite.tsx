import Layout from '@/components/Layout'
import React from 'react'
import { InferGetServerSidePropsType, NextPageContext } from 'next'
import PromptList from '@/components/PromptList'

export const getServerSideProps = async (context: NextPageContext) => {
  const data = await fetch('http://localhost:3000/api/like?limit=20', {
    headers: {
      cookie: context.req?.headers.cookie || '',
    },
  }).then((response) => response.json())
  return {
    props: { data },
  }
}

export default function FavoritePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Layout>
      <PromptList data={props.data} apiUrl={'/api/like'} />
    </Layout>
  )
}