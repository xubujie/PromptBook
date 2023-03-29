import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IMAGE_WIDTH } from '@/config/config'
import ShowMoreText from './ShowMoreText'
import { MAX_TEXT_LENGTH } from '@/config/config'
import ShareButton from './ShareButton'
import LikeButton from './LikeButton'
import CopyText from './CopyText'

const PromptCard: React.FC<Prompt> = (props) => {
  const promptContent = () => {
    if (props.type === 'image' && props.image && props.imageHeight && props.imageWidth) {
      const height = (props.imageHeight / props.imageWidth) * 300
      return (
        <>
          <Image src={props.image} alt={props.id} width={IMAGE_WIDTH} height={height} />
          <div className='card-body w-full pt-2'>
            <div className='flex justify-between'>
              <div className='badge badge-secondary mt-0'>{props.model}</div>
              <div className='flex justify-between space-x-2'>
                <LikeButton
                  promptId={props.id}
                  likesCount={props.likesCount}
                  likedByCurrentUser={props.likedByCurrentUser}
                />
                <ShareButton />
              </div>
            </div>
            <ShowMoreText text={props.prompt} maxLength={MAX_TEXT_LENGTH} />
          </div>
        </>
      )
    } else if (props.type === 'language') {
      return (
        <div className='card-body'>
          <h2 className='card-title'>{props.title}</h2>
          <ShowMoreText text={props.prompt} maxLength={MAX_TEXT_LENGTH} />
          <div className='flex justify-between items-center'>
            <div>
              <CopyText text={`${props.prompt}`} />
            </div>
            <div className='flex space-x-3 items-center justify-center'>
              <LikeButton
                promptId={props.id}
                likesCount={props.likesCount}
                likedByCurrentUser={props.likedByCurrentUser}
              />
              <ShareButton />
            </div>
          </div>
        </div>
      )
    } else {
      return null // Or throw an error, depending on your requirements
    }
  }

  return (
    <Link href={`/prompts/${props.id}`} passHref>
      {promptContent()}
    </Link>
  )
}

export default PromptCard
