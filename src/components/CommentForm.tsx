// components/CommentForm.tsx
import React, { useState } from 'react'

interface CommentFormProps {
  onSubmit: (content: string) => void
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className='w-full h-24 p-2 rounded border border-gray-300'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
        type='submit'
      >
        Post Comment
      </button>
    </form>
  )
}

export default CommentForm
