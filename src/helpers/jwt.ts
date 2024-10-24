import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const signToken = (data: object): string => {
    return jwt.sign(data, JWT_SECRET);
}

export const verifyToken = (token: string): object | string => {
    return jwt.verify(token, JWT_SECRET);
}