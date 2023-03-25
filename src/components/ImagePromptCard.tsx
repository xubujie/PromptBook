import React from 'react'
import Image from 'next/image'
import { IMAGE_WIDTH } from '@/config/config'
import ShowMoreText from './ShowMoreText'
import { MAX_TEXT_LENGTH } from '@/config/config'
import ShareButton from './ShareButton'
import LikeButton from './LikeButton'

const ImagePromptCard: React.FC<ImagePrompt> = ({
  id,
  userImage,
  promptInput,
  outputImage,
  imageHeight,
  imageWidth,
  model,
  currentUser,
}) => {
  return (
    <>
      <Image
        src={outputImage}
        alt={promptInput}
        width={IMAGE_WIDTH}
        height={(imageHeight / imageWidth) * 300}
      />
      <div className='card-body w-full pt-2'>
        <div className='flex justify-between'>
          <div className='badge badge-secondary mt-0'>{model}</div>
          <div className='flex justify-between space-x-2'>
            <LikeButton currentUser={currentUser} imagePromptId={id} />
            <ShareButton />
          </div>
        </div>
        <ShowMoreText text={promptInput} maxLength={MAX_TEXT_LENGTH} />
      </div>
    </>
  )
}

export default ImagePromptCard
