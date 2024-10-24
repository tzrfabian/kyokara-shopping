'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const logout = async () => {
    cookies().delete('Authorization');
    cookies().delete('user.email')
    redirect('/login');
}

export const setToken = async (token: string, user_email: string) => {
    cookies().set(`Authorization`, `Bearer ${token}`)
    cookies().set(`user.email`, `${user_email}`)
}