import CommentForm from './CommentForm'

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
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <img src={comment.author?.image} />
                  </div>
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
