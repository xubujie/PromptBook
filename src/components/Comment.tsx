import CommentForm from './CommentForm'
import Image from 'next/image'

interface Props {
  comments: Comment[]
  onSubmit: (comment: string) => void
}

const Comment: React.FC<Props> = ({ comments, onSubmit }) => {
  return (
    <div id='comment' className='px-8 mt-10'>
      <div>
        {comments.length > 0 &&
          comments.map((comment: Comment) => (
            <div key={comment.id}>
              <div className='chat chat-start'>
                <div className='chat-image avatar w-10'>
                  <Image
                    src={comment.author?.image}
                    alt={comment.author?.name}
                    width={100}
                    height={100}
                    className='rounded-full'
                  />
                </div>
                <div className='chat-header'>
                  {comment.author?.name}
                  <time className='text-xs opacity-50 ml-2'>
                    {new Date(comment.createdAt).toLocaleString()}
                  </time>
                </div>
                <div className='chat-bubble'>{comment.content}</div>
              </div>
            </div>
          ))}
      </div>
      <div className='my-8'>
        <CommentForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default Comment
