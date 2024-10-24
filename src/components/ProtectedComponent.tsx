import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import React from "react";

export default function ProtectedComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const isLogin = cookies().has('Authorization');
    if(!isLogin) {
        return redirect('/login');
    }
  return children;
}
