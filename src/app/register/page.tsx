'use client'

import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import Loading from './loading';
import { toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic"
export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!response.ok) {
      const data = await response.json() as {error: string}
      console.log(data.error);
      toast.error(data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false)
      return router.push(`/register?error=${data.error}`)
    }
    toast.success('Register Success!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    router.push('/login')
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  if(loading) {
    return <Loading/>
  }

  return (
<main className="flex min-h-[100svh] items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8 sm:px-6">
  <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-xl ring-1 ring-orange-900/5 sm:px-10 sm:py-10">
    <div className="text-center">
      <h1 className="text-3xl font-semibold text-orange-900">Sign Up</h1>
      <p className="mt-2 text-orange-600">
        Create an account to access our website
      </p>
    </div>
    <div className="mt-5">
      <form onSubmit={handleRegister}>
        <div className="relative mt-6">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleOnChange}
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            autoComplete="name"
            required
          />
          <label
            htmlFor="name"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Your Name
          </label>
        </div>
        <div className="relative mt-6">
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleOnChange}
            placeholder="Username"
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            autoComplete="username"
            required
          />
          <label
            htmlFor="username"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Username
          </label>
        </div>
        <div className="relative mt-6">
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
            placeholder="Email Address"
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            autoComplete="email"
            required
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Email Address
          </label>
        </div>
        <div className="relative mt-6">
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            autoComplete="new-password"
            required
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Password
          </label>
        </div>
        <div className="my-6">
          <button
            type="submit"
            className="min-h-12 w-full rounded-md bg-[#a03b00] px-3 py-3 font-semibold text-white transition hover:bg-[#ff5e00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
          >
            Register
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          {'Already have an account? '}
          <Link href="/login"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign in
          </Link>
          .
        </p>
      </form>
    </div>
  </div>
</main>

  )
}
