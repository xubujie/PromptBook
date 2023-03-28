// src/somponents/LikeButton.tsx

import axios from 'axios'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface LikeButtonProps {
  promptId: string
  likesCount: number
  likedByCurrentUser: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ promptId, likesCount, likedByCurrentUser }) => {
  const [liked, setLiked] = useState(likedByCurrentUser)
  // get current user from session
  const { data: session } = useSession()
  const router = useRouter()
  const handleClick = async () => {
    setLiked(!liked)
    if (!session) {
      router.push('/api/auth/signin')
    }
    if (!liked) {
      try {
        await axios.post('/api/like', {
          userEmail: session?.user?.email,
          promptId: promptId,
        })
      } catch (error) {
        console.log('Failed to add like:', error)
        setLiked(false)
      }
    } else {
      try {
        await axios.delete('/api/like', {
          data: {
            userEmail: session?.user?.email,
            promptId: promptId,
          },
        })
      } catch (error) {
        console.log('Failed to remove like:', error)
        setLiked(true)
      }
    }
  }
  return (
    <div className='flex items-center justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className={`w-6 h-6 cursor-pointer focus:outline-none transition duration-300 ${
          liked ? 'text-red-500' : 'text-gray-400'
        }`}
        onClick={handleClick}
      >
        <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
      </svg>
      <span className='text-gray-400'>{likesCount === 0 ? null : likesCount}</span>
    </div>
  )
}

export default LikeButton
