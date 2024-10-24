import ErrorHandler from "@/errors/ErrorHandler";
import { User } from "@/models/UserModel";
export const dynamic = "force-dynamic"
export async function GET() {
    try {
        const users = await User.findAll();
        return Response.json(users);
    } catch (err) {
        return ErrorHandler(err);
    }
}