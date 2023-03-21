import Layout from '@/components/Layout'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import axios from 'axios'
import { InferGetServerSidePropsType } from 'next'
import ImagePromptCard from '@/components/ImagePromptCard'
import { CARD_WIDTH } from '@/config/config'

// get image prompts use serverSideProps
export async function getServerSideProps() {
  try {
    const res = await axios.get('http://localhost:3000/api/imagePrompts')
    const data = res.data
    console.log(res)
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: {
        data: [],
      },
    }
  }
}

export default function IndexPage({
      data,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data)
  return (
    <Layout>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}>
        <Masonry>
          {data.map((item: ImagePrompt) => (
            <div key={item.id} className={`card ${CARD_WIDTH} bg-base-100 shadow-xl items-center`}>
              <ImagePromptCard {...item} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Layout>
  )
}
