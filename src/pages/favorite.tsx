import Layout from '@/components/Layout'
import React, { useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { CARD_WIDTH } from '@/config/config'
import PromptCard from '@/components/PromptCard'
import fetcher from '@/lib/fetcher'
import InfiniteScroll from 'react-infinite-scroll-component'
import { InferGetServerSidePropsType, NextPageContext } from 'next'

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

export default function IndexPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [prompt, setPrompt] = useState(props.data)
  const [hasMore, setHasMore] = useState(true)

  const getMorePrompt = async () => {
    const newPrompt = await fetcher(`/api/like?start=${prompt.length}&limit=20`)
    if (newPrompt.length === 0) {
      setHasMore(false)
    }
    setPrompt((prompt) => [...prompt, ...newPrompt])
  }

  return (
    <Layout>
      <InfiniteScroll
        dataLength={prompt.length}
        next={getMorePrompt}
        hasMore={hasMore}
        loader={
          <div className='flex justify-center mt-10'>
            <p className='text-white text-xl'> Loading more...</p>
          </div>
        }
        endMessage={
          <div className='flex justify-center mt-10'>
            <p className='text-white text-xl'> Nothing more to show...</p>
          </div>
        }
      >
        <div className='container my-20 mx-auto max-x-6xl'>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}>
            <Masonry gutter='15px'>
              {prompt &&
                prompt.map((item) => (
                  <div
                    key={item.id}
                    className={`card ${CARD_WIDTH} bg-netural shadow-xl items-center`}
                  >
                    <PromptCard {...item} />
                  </div>
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </InfiniteScroll>
    </Layout>
  )
}
