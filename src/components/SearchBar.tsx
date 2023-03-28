// components/SearchBar.tsx
import { useState, useCallback } from 'react'

interface Props {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSearch(searchTerm)
    },
    [onSearch, searchTerm],
  )

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='flex items-center my-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          placeholder='Search...'
          className='input input-secondary w-full'
        />
        <button type='submit' className='btn btn-secondary btn-square hover:bg-pink-800'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
