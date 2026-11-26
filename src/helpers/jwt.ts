import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return new TextEncoder().encode(secret);
}

export const signToken = (data: Record<string, unknown>): Promise<string> => {
    return new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(getJwtSecret());
}

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload;
}