import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IMAGE_WIDTH, MAX_TEXT_LENGTH, CARD_WIDTH } from '@/config/config'
import ShowMoreText from './ShowMoreText'
import CardIcons from './CardIcons'

const PromptCard: React.FC<Prompt> = (props) => {
  const promptContent = () => {
    if (props.type === 'image' && props.image && props.imageHeight && props.imageWidth) {
      const height = (props.imageHeight / props.imageWidth) * 300
      return (
        <>
          <Link href={`/prompts/${props.id}`} passHref>
            <div className='relative block w-full group'>
              <Image
                src={props.image}
                alt={props.id}
                width={IMAGE_WIDTH}
                height={height}
                priority={false}
              />
              <div className='absolute inset-0 object-cover w-full h-full group-hover:opacity-50 group-hover:bg-gray-900 p-5'>
                <div className='absolute bottom-0 left-0 right-0 p-5 transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'>
                  <div className='w-64 whitespace-normal break-words'>
                    <p className='text-white text-sm line-clamp-4'>{props.prompt}</p>
                  </div>
                  <div className='badge badge-secondary'>{props.model}</div>
                </div>
              </div>
            </div>
          </Link>
          <div className='flex justify-between items-center w-full px-2 py-4'>
            <div className='text-sm'></div>
            <CardIcons
              prompt={props.prompt}
              id={props.id}
              likesCount={props.likesCount}
              likedByCurrentUser={props.likedByCurrentUser}
            />
          </div>
        </>
      )
    } else if (props.type === 'language') {
      return (
        <div className='card-body'>
          <Link href={`/prompts/${props.id}`} passHref>
            <h2 className='card-title link-hover'>{props.title}</h2>
          </Link>
          <ShowMoreText text={props.prompt} maxLength={MAX_TEXT_LENGTH} />
          <div className='flex justify-between items-center w-full -mb-2'>
            <div className='text-sm'></div>
            <CardIcons
              prompt={props.prompt}
              id={props.id}
              likesCount={props.likesCount}
              likedByCurrentUser={props.likedByCurrentUser}
            />
          </div>
        </div>
      )
    } else {
      return null // Or throw an error, depending on your requirements
    }
  }

  return (
    <div
      className={`card ${CARD_WIDTH} bg-netural shadow-xl flex flex-col justify-between items-center`}
    >
      {promptContent()}
    </div>
  )
}

export default PromptCard
