'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ListMenuNavbar() {
    const pathName = usePathname();
    const isActive = (path: string) => pathName === path;

  return (
    <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
        <li className="mb-6 hidden max-lg:block">
          <a href="">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
          </a>
        </li>
        <li className="max-lg:border-b max-lg:py-3 px-3">
          <Link
            href="/"
            className={`${isActive('/') ? 'text-[#ff4c04]' : 'text-[#333]'} hover:text-[#ff4c04] text-[15px] block font-semibold`}
          >
            Home
          </Link>
        </li>
        <li className="max-lg:border-b max-lg:py-3 px-3">
          <Link
            href="/products"
            className={`${isActive('/products') ? 'text-[#ff4c04]' : 'text-[#333]'} hover:text-[#ff4c04] text-[15px] block font-semibold`}
          >
            Products
          </Link>
        </li>
        <li className="max-lg:border-b max-lg:py-3 px-3">
          <a
            href=""
            className={`${isActive('/about') ? 'text-[#ff4c04]' : 'text-[#333]'} hover:text-[#ff4c04] text-[15px] block font-semibold`}
          >
            About
          </a>
        </li>
      </ul>
  )
}
