import React from 'react'
import Image from 'next/image'
import { IMAGE_WIDTH } from '@/config/config'
import ShowMoreText from './ShowMoreText'
import { MAX_TEXT_LENGTH } from '@/config/config'
const ImagePromptCard: React.FC<ImagePrompt> = ({
  id,
  promptInput,
  outputImage,
  imageHeight,
  imageWidth,
  model,
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
        </div>
        <ShowMoreText text={promptInput} maxLength={MAX_TEXT_LENGTH} />
      </div>
    </>
  )
}

export default ImagePromptCard
