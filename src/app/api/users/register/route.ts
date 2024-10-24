import { User } from '@/models/UserModel';
import { UserType } from '../../../../types/UserType';
import ErrorHandler from '@/errors/ErrorHandler';

export async function POST(request: Request) {
    try {
        const body = await request.json() as UserType;
        await User.create(body);

        return Response.json({ message: "User Register Success", body}, {status: 201})
    } catch (err) {
        return ErrorHandler(err);
    }
}