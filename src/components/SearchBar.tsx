// components/SearchBar.tsx
import React, { useState } from 'react'

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Search term:', searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className='w-full flex justify-center my-4'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder='Search...'
        className='input input-secondary w-full md:w-1/2'
      />
      <button className='btn btn-secondary ml-4'>Search</button>
    </form>
  )
}

export default SearchBar
