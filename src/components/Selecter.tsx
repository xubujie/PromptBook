// components/Selecter.tsx

import { useState } from 'react'
interface Props {
  onSelect: (category: string, order: string) => void
}
const Selecter: React.FC<Props> = ({ onSelect }) => {
  const [category, setCategory] = useState('all')
  const [order, setOrder] = useState('recent')

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value
    setCategory(selectedCategory)
    onSelect(selectedCategory, order)
  }

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value
    setOrder(selectedOrder)
    onSelect(category, selectedOrder)
  }

  return (
    <div className='flex space-x-4'>
      <select
        className='select select-bordered w-1/3'
        value={category}
        onChange={handleCategoryChange}
      >
        <option disabled>Category</option>
        <option value='all'>All</option>
        <option value='image'>Image</option>
        <option value='language'>Language</option>
      </select>
      <select
        className='select select-bordered w-1/2 md:w-1/3'
        value={order}
        onChange={handleOrderChange}
      >
        <option disabled>Order by</option>
        <option value='recent'>Most recent</option>
        <option value='all'>All likes</option>
        <option value='weekly'>Weekly likes</option>
        <option value='monthly'>Monthly likes</option>
      </select>
    </div>
  )
}

export default Selecter
