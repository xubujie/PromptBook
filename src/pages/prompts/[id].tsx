import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layout'
import LikeButton from '@/components/LikeButton'
import ShareButton from '@/components/ShareButton'
import CommentForm from '@/components/CommentForm'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import fetcher from '@/lib/fetcher'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Props {
  prompt: Prompt
  initialComments: Comment[]
}

const PromptDetail: React.FC<Props> = ({
  prompt,
  comments: initialComments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const isAuthor = session?.user && session?.user?.email === prompt.authorEmail
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>(initialComments)

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  const handleSubmitComment = async (comment: string) => {
    if (!session) {
      router.push('/api/auth/signin')
    }
    try {
      const response = await axios.post(`/api/prompts/${prompt.id}/comments`, {
        content: comment,
        authorEmail: session?.user?.email,
      })
      const newComment = response.data
      setComments((prevComments) => [...prevComments, newComment])
    } catch (error) {
      console.error(error)
    }
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
                alt={prompt.id}
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
        {isAuthor && (
          <Link
            href={`/edit/${prompt.id}`}
            className='btn btn-secondary text-white font-bold py-2 px-4 rounded'
          >
            Edit Prompt
          </Link>
        )}
        <div>
          {comments.length > 0 &&
            comments.map((comment: Comment) => (
              <div key={comment.id}>
                <div className='chat chat-start'>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img src={comment.author?.image} />
                    </div>
                  </div>
                  <div className='chat-header'>
                    {comment.author?.name}
                    <time className='text-xs opacity-50 ml-2'>
                      {new Date(comment.createdAt).toLocaleString()}
                    </time>
                  </div>
                  <div className='chat-bubble'>{comment.content}</div>
                </div>
              </div>
            ))}
        </div>
        <div className='my-8'>
          <CommentForm onSubmit={handleSubmitComment} />
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
  return {
    props: {
      prompt,
      comments,
    },
  }
}
