import CopyText from './CopyText'
import LikeButton from './LikeButton'
import ShareButton from './ShareButton'

interface Props {
  prompt: string
  id: string
  likesCount: number
  likedByCurrentUser: boolean
}

export default function CardIcons({ prompt, id, likesCount, likedByCurrentUser }: Props) {
  return (
    <div className='flex space-x-3 items-center justify-center self-end'>
      <CopyText text={prompt} />
      <LikeButton promptId={id} likesCount={likesCount} likedByCurrentUser={likedByCurrentUser} />
      <ShareButton />
    </div>
  )
}
