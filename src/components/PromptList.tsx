import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import fetcher from '@/lib/fetcher'
import PromptCard from './PromptCard'
import { log } from '@/lib/logger'
import useSWRInfinite from 'swr/infinite'

interface Props {
  apiUrl: string
  data: any
}

export default function PromptList({ apiUrl, data }: Props) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null
    return `${apiUrl}?&start=${pageIndex * 20}&limit=20`
  }
  const { data: fetchedData, error, size, setSize } = useSWRInfinite(getKey, fetcher)
  const prompts = fetchedData ? [].concat(...fetchedData) : []
  const isLoadingInitialData = !fetchedData && !error
  const isEmpty = fetchedData?.length === 0
  const isReachingEnd = isEmpty || (fetchedData && fetchedData[fetchedData.length - 1]?.length < 20)

  const fetchMorePrompts = () => {
    setSize(size + 1)
  }

  useEffect(() => {
    setSize(1)
  }, [apiUrl, setSize])

  if (isLoadingInitialData) {
    return (
      <div className='flex justify-center mt-10'>
        <p className='text-xl'> Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center mt-10'>
        <p className='text-xl'> Error while fetching data</p>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className='flex justify-center mt-10'>
        <p className='text-xl'> No data to show</p>
      </div>
    )
  }
  log('promts', prompts)
  return (
    <InfiniteScroll
      dataLength={prompts.length}
      next={fetchMorePrompts}
      hasMore={!isReachingEnd}
      loader={
        <div className='flex justify-center mt-10'>
          <p className='text-xl'> Loading more...</p>
        </div>
      }
      endMessage={
        <div className='flex justify-center mt-10'>
          <p className='text-xl'> Nothing more to show...</p>
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
