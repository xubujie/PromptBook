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
    <form onSubmit={handleSubmit} className='flex items-center justify-center space-x-4'>
      <textarea
        className='textarea w-full h-12 rounded border border-gray-300'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className='btn btn-primary text-white font-bold py-2 px-4 rounded' type='submit'>
        Post Comment
      </button>
    </form>
  )
}

export default CommentForm
