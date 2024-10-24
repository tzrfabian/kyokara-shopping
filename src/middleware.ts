import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { UserType } from "./types/UserType";
import { WithId } from "mongodb";
import ErrorHandler from "./errors/ErrorHandler";

async function auth(request: NextRequest) {
    const authCookie = cookies().get('Authorization')
    if(!authCookie) throw new Error("Invalid Token");
    const [type, token] = authCookie.value.split(' ')
    if(type !== 'Bearer') throw new Error("Invalid Token");

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
    const {payload} = await jwtVerify<WithId<UserType>>(token, jwtSecret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload._id.toString());
    requestHeaders.set('x-user-email', payload.email);

    return requestHeaders;
}

export async function middleware(request:NextRequest) {
    try {
        // Authentication
        const requestHeaders = await auth(request);
        return NextResponse.next({
            request: {
                // New Request Headers
                headers: requestHeaders
            }
        })
    } catch (err) {
        return ErrorHandler(err as Error);
    }
}

export const config = {
    matcher: [
        '/api/wishlist/:path*',
        '/api/products/all-wishlist',
    ]
}