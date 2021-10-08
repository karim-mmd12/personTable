import React from 'react'

interface SearchProps {
  value: string
  onChange: Function
}
const SearchInput = ({ value, onChange }: SearchProps) => {
  return (
    <input
      type='text'
      name='search'
      className='form-control my-3'
      placeholder='Search...'
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  )
}

export default SearchInput
