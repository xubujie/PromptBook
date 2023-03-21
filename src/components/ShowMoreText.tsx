import React, { useState } from 'react'

interface ShowMoreTextProps {
  text: string
  maxLength: number
  showMoreLabel?: string
  showLessLabel?: string
}

const ShowMoreText: React.FC<ShowMoreTextProps> = ({
  text,
  maxLength,
  showMoreLabel = 'Show More',
  showLessLabel = 'Show Less',
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true)

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated)
  }

  const displayText = isTruncated ? text.slice(0, maxLength) : text
  const toggleLabel = isTruncated ? showMoreLabel : showLessLabel

  return (
    <div>
      <p>
        {displayText}{' '}
        {text.length > maxLength && (
          <button className='link link-secondary' onClick={toggleTruncate}>
            {toggleLabel}
          </button>
        )}
      </p>
    </div>
  )
}

export default ShowMoreText
