'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ListMenuNavbar() {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
      { href: '/', label: 'Home' },
      { href: '/products', label: 'Products' },
      { href: '/#about', label: 'About' },
    ];

  return (
    <nav aria-label="Main navigation" className="relative ml-auto lg:ml-8 lg:flex-1">
      <button
        type="button"
        className="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-orange-200 text-gray-800 transition hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 lg:hidden"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      <ul
        id="primary-navigation"
        className={`${isOpen ? 'flex' : 'hidden'} fixed inset-x-4 top-[4.25rem] z-50 flex-col gap-1 rounded-xl border border-orange-100 bg-white p-3 shadow-lg lg:static lg:flex lg:flex-row lg:items-center lg:gap-2 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:inset-x-auto lg:top-auto`}
      >
        {links.map(({ href, label }) => {
          const isActive = pathName === href;

          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600 lg:px-4 ${isActive ? 'text-orange-700' : 'text-gray-700'}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}
