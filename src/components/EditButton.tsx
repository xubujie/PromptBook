// components/EditButton.tsx
import React from 'react'

interface EditButtonProps {
  onClick: () => void
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
    >
      Edit
    </button>
  )
}

export default EditButton
