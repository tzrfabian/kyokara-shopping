import { logout } from '@/action';
import Link from 'next/link';
import ListMenuNavbar from './ListMenuNavbar';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const cookieStore = await cookies();
  const isLogin = cookieStore.get('Authorization');

  return (
    <header className="relative z-50 border-b border-orange-100 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-11 w-full max-w-7xl items-center gap-3">
        <Link href="/" aria-label="Kyokara home" className="shrink-0">
          <img
            src="https://i.imgur.com/CxMgmcF.png"
            alt="Kyokara"
            className="w-28 sm:w-36"
          />
        </Link>
        <ListMenuNavbar />
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-gray-800 transition hover:bg-orange-50 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 fill-current"
              viewBox="0 0 64 64"
            >
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
            <span className="hidden text-sm font-medium sm:inline">Wishlist</span>
          </Link>
          {isLogin ? (
            <form action={logout}>
              <button
                type="submit"
                className="min-h-11 rounded-full border border-orange-600 px-3 text-xs font-semibold text-orange-800 transition hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:px-5 sm:text-sm"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="flex min-h-11 items-center rounded-full bg-orange-600 px-3 text-xs font-semibold text-white transition hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:px-5 sm:text-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
