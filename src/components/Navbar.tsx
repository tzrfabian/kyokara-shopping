'use server'
import { logout } from '@/action';
import Link from 'next/link'
import React from 'react'
import ListMenuNavbar from './ListMenuNavbar';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const isLogin = cookies().get('Authorization');
  return (
    <header className="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50">
  <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
    <Link href="/">
      <img
        src="https://i.imgur.com/CxMgmcF.png"
        alt="logo"
        className="w-36"
      />
    </Link>
    <div
      id="collapseMenu"
      className="lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
    >
      <button
        type='button'
        title='hamburger'
        id="toggleClose"
        className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 fill-black"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          />
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          />
        </svg>
      </button>
      <ListMenuNavbar/>
    </div>
    <div className="flex gap-x-6 gap-y-4 ml-auto">
      <div className="flex justify-center space-x-8">
        <span className="relative">
          <Link href={'/wishlist'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="cursor-pointer fill-[#333] inline hover:fill-[#fa6400] w-fit"
              viewBox="0 0 64 64"
            >
            <path
              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
              data-original="#000000"
              />
            </svg>
          <p className="absolute left-auto -ml-4 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
            Wishlist
          </p>
          </Link>
        </span>
          {isLogin ? (
            <form action={logout}>
            <button
              title='logout'
              type='submit'
              className="px-5 py-2 text-sm rounded-full text-black hover:text-white border-2 border-[#ff4c04] bg-white hover:bg-[#ff0404]">
              Sign out
            </button>
          </form>
          ): (
            <Link href={'/login'}>
            <button
              title='login'
              type='button'
              className="px-5 py-2 text-sm rounded-full text-white border-2 border-[ff4c04] bg-[#ff4c04] hover:bg-[#c43a04]">
              Sign in
            </button>
            </Link>
          )}
          
        <button type='button' id="toggleOpen" className="lg:hidden" title='hamburger'>
          <svg
            className="w-7 h-7"
            fill="#333"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

  )
}
