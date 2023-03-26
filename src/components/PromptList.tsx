import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import fetcher from '@/lib/fetcher'
import { CARD_WIDTH } from '@/config/config'
import PromptCard from './PromptCard'

interface Props {
  apiUrl: string
  data: any
}

export default function PromptList({ apiUrl, data }: Props) {
  const [prompt, setPrompt] = useState(data)
  const [hasMore, setHasMore] = useState(true)
  const getMorePrompt = async () => {
    const newPrompt = await fetcher(`${apiUrl}?start=${prompt.length}&limit=20`)
    if (newPrompt.length === 0) {
      setHasMore(false)
    }
    setPrompt((prompt: any) => [...prompt, ...newPrompt])
  }
  return (
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
              prompt.map((item: any) => (
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
  )
}
