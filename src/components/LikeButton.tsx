// src/somponents/LikeButton.tsx

import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

interface LikeButtonProps {
  currentUser: string | undefined
  imagePromptId?: string
  languagePromptId?: string
}

const LikeButton: React.FC<LikeButtonProps> = (props) => {
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const handleClick = async () => {
    setLiked(!liked)
    if (!props.currentUser) {
      router.push('/api/auth/signin')
    }
    if (!liked) {
      try {
        await axios.post('/api/like', {
          userId: props.currentUser,
          imagePromptId: props.imagePromptId,
          languagePromptId: props.languagePromptId,
        })
      } catch (error) {
        console.log('Failed to add like:', error)
        setLiked(false)
      }
    } else {
      try {
        await axios.delete('/api/like', {
          data: {
            userId: props.currentUser,
            imagePromptId: props.imagePromptId,
            languagePromptId: props.languagePromptId,
          },
        })
      } catch (error) {
        console.log('Failed to remove like:', error)
        setLiked(true)
      }
    }
  }

  return (
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
  )
}

const MemoizedLikedButton = React.memo(LikeButton)
MemoizedLikedButton.displayName = 'LikeButton'

export default MemoizedLikedButton
