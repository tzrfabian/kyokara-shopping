'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('Authorization');
    cookieStore.delete('user.email')
    redirect('/login');
}

export const setToken = async (token: string, user_email: string) => {
    const cookieStore = await cookies();
    cookieStore.set(`Authorization`, `Bearer ${token}`)
    cookieStore.set(`user.email`, `${user_email}`)
}