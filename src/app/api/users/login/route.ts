import ErrorHandler from "@/errors/ErrorHandler";
import { comparePassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { User } from "@/models/UserModel";
import { UserSchema } from "@/types/UserType";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const LoginSchema = UserSchema.pick({
    email: true,
    password: true
})

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.json();
        const body = LoginSchema.parse(rawBody);
        const user = await User.findOne({
            email: body.email
        });
        if(!user) {
            throw new Error("Invalid Email/Password");
        }

        const validPassword = comparePassword(body.password, user.password);
        if(!validPassword) {
            throw new Error("Invalid Email/Password");
        }
        const {password, ...userData} = user;
        console.log(password);
        const access_token = signToken(userData);
        cookies().set('Authorization', `Bearer ${access_token}`);

        return NextResponse.json({
            access_token,
            user: userData
        })
    } catch (err) {
        return ErrorHandler(err);
    }
}