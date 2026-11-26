import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { UserType } from "./types/UserType";
import { WithId } from "mongodb";
import ErrorHandler, { CustomError } from "./errors/ErrorHandler";

async function auth(request: NextRequest) {
    const authCookie = request.cookies.get('Authorization')
    if(!authCookie) throw new CustomError("Invalid Token", 401);
    const [type, token] = authCookie.value.split(' ')
    if(type !== 'Bearer') throw new CustomError("Invalid Token", 401);

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
    let payload: WithId<UserType>;
    try {
        ({payload} = await jwtVerify<WithId<UserType>>(token, jwtSecret));
    } catch (error) {
        if (error instanceof Error) {
            throw new CustomError("Invalid Token", 401);
        }
        throw error;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload._id.toString());
    requestHeaders.set('x-user-email', payload.email);

    return requestHeaders;
}

export async function proxy(request:NextRequest) {
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