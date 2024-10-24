'use client'
import { ProductType } from '@/types/ProductType';
import { useState, FormEvent, ChangeEvent } from 'react'

interface SearchBarProps {
  onSearch: (products: ProductType[]) => void
}

export default function SearchBar({onSearch}: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/search?keyword=${search}`);
    const data = await response.json();
    onSearch(data)
    setSearch('');
  };

  return (
    <div className="flex max-w-md mx-auto font-[sans-serif]">
    <form onSubmit={handleSearch} className='flex w-full rounded-full border-2 border-orange-500 overflow-hidden'>
      <input
          type="text"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search here..."
          className="w-full outline-none bg-white text-sm px-5 py-3"
      />
      <button
          title="search"
          type="submit"
          className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 px-6"
      >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="18px"
          className="fill-white"
          >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
      </button>
    </form>
    </div>
  )
}

