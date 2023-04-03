import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import fetcher from '@/lib/fetcher'
import PromptCard from './PromptCard'

interface Props {
  apiUrl: string
  data: any
}

export default function PromptList({ apiUrl, data }: Props) {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPrompts(data)
    setHasMore(true)
  }, [data])

  const fetchMorePrompts = async () => {
    const start = prompts.length
    const data = await fetcher(`${apiUrl}?&start=${start}&limit=20`)
    if (data.length === 0) {
      setHasMore(false)
    }
    setPrompts((prompts) => [...prompts, ...data])
  }
  return (
    <InfiniteScroll
      dataLength={prompts.length}
      next={fetchMorePrompts}
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
      <div className='container my-10 mx-auto max-x-6xl'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}>
          <Masonry gutter='15px'>
            {prompts &&
              prompts.map((item: any) => (
                <div key={item.id}>
                  <PromptCard {...item} />
                </div>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </InfiniteScroll>
  )
}
