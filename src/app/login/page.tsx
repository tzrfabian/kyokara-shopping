'use client'
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "./loading";
import { toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserType } from "@/types/UserType";
import { setToken } from "@/action";

export const dynamic = "force-dynamic"
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async(e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!response.ok) {
      const data = await response.json() as {error: string}
      console.log((data.error));
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
      setLoading(false);
      return router.push(`/login?error=${data.error}`)
    }
    toast.success('Login Success, Welcome!', {
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
    const data = await response.json() as {access_token: string, user: UserType};
    console.log(data);
    await setToken(data.access_token, data.user.email)
    router.push('/');
    setLoading(false);
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
      <h1 className="text-3xl font-semibold text-orange-900">Sign in</h1>
      <p className="mt-2 text-orange-600">Sign in below to access your account</p>
    </div>
    <div className="mt-5">
      <form onSubmit={handleLogin}>
        <div className="relative mt-6">
          <input
            id="email"
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleOnChange}
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
            className="peer mt-1 min-h-12 w-full border-b-2 border-gray-300 px-0 py-2 placeholder:text-transparent focus:border-orange-600 focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleOnChange}
            autoComplete="current-password"
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
            Sign in
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          {"Don't have an account yet?"}
            <Link
              href="/register"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign up
            </Link>
          .
        </p>
      </form>
    </div>
  </div>
</main>

  )
}
