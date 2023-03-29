import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layout'
import LikeButton from '@/components/LikeButton'
import ShareButton from '@/components/ShareButton'
import EditButton from '@/components/EditButton'
import CommentForm from '@/components/CommentForm'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import fetcher from '@/lib/fetcher'
import { useSession } from 'next-auth/react'

interface Props {
  prompt: Prompt
}

const PromptDetail: React.FC<Props> = ({
  prompt,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const isAuthor = session?.user && session?.user?.email === prompt.authorEmail
  const router = useRouter()

  const handleEdit = () => {
    // Add logic to edit the prompt (e.g., navigate to an edit page)
  }
  const handleCommentSubmit = (content: string) => {
    // Add logic to submit the comment (e.g., call API to save the comment)
  }
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const imgWidth = prompt.imageWidth / 2 || 600
  const imgHeight = prompt.imageHeight / 2 || 400

  return (
    <Layout>
      <div className='container mx-auto max-w-6xl my-20 px-4'>
        <h1 className='text-4xl font-bold mb-4'>{prompt.title}</h1>
        <div className='bg-white shadow rounded-lg p-8'>
          {prompt.type === 'image' && prompt.image && (
            <div className='mb-8'>
              <Image
                src={prompt.image}
                alt={prompt.title}
                width={imgWidth}
                height={imgHeight}
                className='rounded'
              />
            </div>
          )}
          <div className='badge'>Prompt:</div>
          <p className='text-gray-600 text-lg mb-8'>{prompt.prompt}</p>
          <div className='flex justify-between'>
            <LikeButton
              promptId={prompt.id}
              likesCount={prompt.likesCount}
              likedByCurrentUser={prompt.likedByCurrentUser}
            />
            <ShareButton />
          </div>
        </div>
        {isAuthor && <EditButton onClick={handleEdit} />}
        <div className='my-8'>
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default PromptDetail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    }
  }
  const prompt = await fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prompts/${id}`)
  const comments = await fetcher(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prompts/${id}/comments`,
  )

  if (!prompt) {
    return {
      notFound: true,
    }
  }
  console.log('prompt', prompt)
  return {
    props: {
      prompt,
      comments,
    },
  }
}
