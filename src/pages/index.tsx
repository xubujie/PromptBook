import Layout from '@/components/Layout'
import React, { useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import axios from 'axios'
import { InferGetServerSidePropsType, NextPageContext } from 'next'
import ImagePromptCard from '@/components/ImagePromptCard'
import { CARD_WIDTH } from '@/config/config'
import { getSession } from 'next-auth/react'
import useSWR from 'swr'
import serverAxios from '@/lib/serverAxios'
import { useSession } from 'next-auth/react'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  let data = []
  let likedImagePrompts = []

  try {
    const res = await serverAxios.get('api/imagePrompts?page=1')
    data = res.data

    if (session) {
      const liked = await serverAxios.get(`api/like?userId=${session.userId}`)
      likedImagePrompts = liked.data.map((item: any) => item.imagePromptId)
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error?.message)
  }

  return {
    props: {
      data,
      likedImagePrompts,
    },
  }
}

export default function IndexPage({
      data,
      likedImagePrompts,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession()

  const [page, setPage] = useState(2)
  const { data: newData, error } = useSWR(
    `http://localhost:3000/api/imagePrompts?page=${page}`,
    fetcher,
  )

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event?.currentTarget

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const unlikedPrompts = [...(newData || []), ...data].filter(
    (item: ImagePrompt) => !likedImagePrompts.includes(item?.id),
  )

  return (
    <Layout>
      <div onScroll={handleScroll} style={{ overflowY: 'scroll', height: '100vh' }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}>
          <Masonry>
            {unlikedPrompts.map((item: ImagePrompt) => (
              <div
                key={item.id}
                className={`card ${CARD_WIDTH} bg-base-100 shadow-xl items-center`}
              >
                <ImagePromptCard
                  {...item}
                  {...(session?.userId ? { currentUser: session.userId } : {})}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </Layout>
  )
}
