// src/components/ShareButton.tsx
import React, { useState, useRef } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share'
import useOnClickOutside from '../hooks/useOnClickOutside'

const ShareButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip)
  }

  useOnClickOutside(ref, () => setShowTooltip(false))

  const urlToShare = process.env.NEXT_PUBLIC_API_BASE_URL || '' // Replace with the URL you want to share

  return (
    <div className='flex relative' ref={ref}>
      {showTooltip && (
        <div className='absolute -left-20 -mt-8 p-2 bg-base-100 shadow rounded flex space-x-3'>
          <FacebookShareButton url={urlToShare}>
            <FacebookIcon size={25} round />
          </FacebookShareButton>
          <TwitterShareButton url={urlToShare}>
            <TwitterIcon size={25} round />
          </TwitterShareButton>
          <LinkedinShareButton url={urlToShare}>
            <LinkedinIcon size={25} round />
          </LinkedinShareButton>
          {/* Add more share buttons from react-share here if needed */}
        </div>
      )}
      <button onClick={toggleTooltip}>
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
            d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
          />
        </svg>
      </button>
    </div>
  )
}

export default ShareButton
