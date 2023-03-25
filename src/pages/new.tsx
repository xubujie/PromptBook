import Layout from '@/components/Layout'
import { useState } from 'react'
import ImagePromptForm from '@/components/ImagePromptForm'
import LanguagePromptForm from '@/components/LanguagePromptForm'
import { NextPageContext, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

const Prompts: React.FC = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedModel, setSelectedModel] = useState<string | null>('image')
  const [bgColor, setBgColor] = useState(false)

  const selectModel = (model: 'image' | 'language') => {
    setSelectedModel(model)
    if (model === 'image') {
      setBgColor(false)
    } else {
      setBgColor(true)
    }
  }

  return (
    <Layout>
      <div className='flex flex-col w-full lg:flex-row px-20'>
        <div
          className={`grid flex-grow h-20 card ${
            bgColor ? 'bg-base-300' : 'bg-primary'
          } rounded-box place-items-center cursor-pointer hover:bg-primary hover:text-white`}
          onClick={() => selectModel('image')}
        >
          Image Model
        </div>
        <div className='divider lg:divider-horizontal'>OR</div>
        <div
          className={`grid flex-grow h-20 card ${
            !bgColor ? 'bg-base-300' : 'bg-primary'
          } rounded-box place-items-center cursor-pointer hover:bg-primary hover:text-white`}
          onClick={() => selectModel('language')}
        >
          Language Model
        </div>
      </div>
      <div className='divider'></div>
      {selectedModel === 'image' && <ImagePromptForm />}
      {selectedModel === 'language' && <LanguagePromptForm />}
    </Layout>
  )
}

export default Prompts
