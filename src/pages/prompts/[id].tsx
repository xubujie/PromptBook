import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layout'
import CardIcons from '@/components/CardIcons'
import Comment from '@/components/Comment'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import fetcher from '@/lib/fetcher'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Avatar from '@/components/Avatar'

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
  const likedByCurrentUser = !!prompt?.likes?.find(
    (like: any) => like.userEmail === session?.user?.email,
  )

  console.log('prompt', prompt)
  console.log('likedByCurrentUser', likedByCurrentUser)
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
  const promptContent = () => {
    if (prompt.type === 'image' && prompt.image) {
      return (
        <div className='container flex flex-col items-center justify-center mx-auto mb-10 md:space-x-10 md:flex-row md:items-start'>
          <Image
            src={prompt.image}
            alt={prompt.id}
            width={imgWidth}
            height={imgHeight}
            priority={false}
            className='container md:w-1/2 mb-5'
          />
          <div className='card-body container flex flex-col space-y-5 md:w-1/2'>
            <h2 className='card-title link-hover'>{prompt?.title}</h2>
            <div className='flex justify-between items-center w-full mb-2'>
              <Avatar image={prompt.author.image} name={prompt.author.name} />
              <CardIcons
                prompt={prompt.prompt}
                id={prompt.id}
                likesCount={prompt.likesCount}
                likedByCurrentUser={likedByCurrentUser}
              />
            </div>

            <div className='card-text'>
              <div className='badge text-lg'>Prompt:</div>
              {' ' + prompt.prompt}
            </div>
            {prompt.negativePrompt && (
              <div className='card-text'>
                <div className='badge text-lg'>Other Params:</div>
                {' ' + prompt.negativePrompt}
              </div>
            )}
            {isAuthor && (
              <Link
                href={`/edit/${prompt.id}`}
                className='btn btn-secondary text-white font-bold py-2 px-4 rounded w-full md:w-1/3 self-end'
              >
                Edit Prompt
              </Link>
            )}
          </div>
        </div>
      )
    } else if (prompt.type === 'language') {
      return (
        <div className='container card-body'>
          <div className='flex justify-between items-center w-full mb-2'>
            <Avatar image={prompt.author.image} name={prompt.author.name} />
            <CardIcons
              prompt={prompt.prompt}
              id={prompt.id}
              likesCount={prompt.likesCount}
              likedByCurrentUser={likedByCurrentUser}
            />
          </div>
          <h2 className='card-title link-hover text-2xl'>{prompt.title}</h2>
          <div className='card-text mt-2 '>
            <div className='badge text-lg'>Prompt:</div>
            {' ' + prompt.prompt}
          </div>
          {isAuthor && (
            <Link
              href={`/edit/${prompt.id}`}
              className='btn btn-secondary text-white font-bold py-2 px-4 rounded w-full md:w-1/6 self-end'
            >
              Edit Prompt
            </Link>
          )}
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className='container flex-col px-4 mx-auto'>
        {promptContent()}
        <div className='px-8 text-xl font-serif'>Comments:</div>
        <div className='px-8 divider'></div>
        <div className='mt-auto'>
          {session ? (
            <Comment comments={comments} onSubmit={handleSubmitComment} />
          ) : (
            <Link href={'/api/auth/signin'} className='link-secondary px-8'>
              SignIn to Comment
            </Link>
          )}
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
