import Layout from '@/components/Layout'
import React, { useState, useCallback, useEffect } from 'react'
import { InferGetServerSidePropsType, NextPageContext } from 'next'
import SearchBar from '@/components/SearchBar'
import PromptList from '@/components/PromptList'
import fetcher from '@/lib/fetcher'
import Selecter from '@/components/Selecter'

export const getServerSideProps = async (context: NextPageContext) => {
  const data = await fetch('http://localhost:3000/api/prompts?limit=20', {
    headers: {
      cookie: context.req?.headers.cookie || '',
    },
  }).then((response) => response.json())
  return {
    props: { data },
  }
}

export default function IndexPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [prompts, setPrompts] = useState(props.data)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all' as 'all' | 'image' | 'language')
  const [order, setOrder] = useState('recent' as 'recent' | 'weekly' | 'monthly')
  const apiUrl = '/api/prompts'
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query)
  }, [])

  const handleSelect = useCallback(async (category: string, order: string) => {
    setCategory(category as 'all' | 'image' | 'language')
    setOrder(order as 'recent' | 'weekly' | 'monthly')
  }, [])

  useEffect(() => {
    const fetchPrompts = async () => {
      const data = await fetcher(`${apiUrl}?q=${searchQuery}&t=${category}&limit=20`)
      setPrompts(data)
    }
    fetchPrompts()
  }, [searchQuery, category, order])

  return (
    <Layout>
      <div className='flex flex-col mx-auto w-3/4 md:w-1/3'>
        {/* <div className='tabs tabs-boxed justify-between'>
          <a
            className={`tab w-1/3 ${searchType === 'all' ? 'tab-active' : null}`}
            onClick={() => setSearchType('all')}
          >
            All
          </a>
          <a
            className={`tab w-1/3 ${searchType === 'image' ? 'tab-active' : null}`}
            onClick={() => setSearchType('image')}
          >
            Image
          </a>
          <a
            className={`tab w-1/3 ${searchType === 'language' ? 'tab-active' : null}`}
            onClick={() => setSearchType('language')}
          >
            Language
          </a>
        </div> */}
        <SearchBar onSearch={handleSearch} />
        <Selecter onSelect={handleSelect} />
      </div>
      <PromptList data={prompts} apiUrl={apiUrl} searchQuery={searchQuery} category={category} />
    </Layout>
  )
}
