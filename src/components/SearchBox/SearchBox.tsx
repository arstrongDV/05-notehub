import React from 'react'
import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
    searchQuery: string;
    onChange: (newQuery: string) => void;
}

const SearchBox = ({ searchQuery, onChange }: SearchBoxProps) => {

    const handleChange = useDebouncedCallback((value: string) => {
        onChange(value)
    }, 300)

  return (
    <input
        className={css.input}
        defaultValue={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
        type="text"
        placeholder="Search notes"
    />
  )
}

export default SearchBox