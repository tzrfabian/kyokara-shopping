import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import React from "react";

export default async function ProtectedComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const isLogin = cookieStore.has('Authorization');
    if(!isLogin) {
        return redirect('/login');
    }
  return children;
}
