import ErrorHandler from "@/errors/ErrorHandler";
import { Product } from "@/models/ProductModel";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
    try {
        const userIdHeader = request.headers.get('x-user-id');
        // console.log(userIdHeader);
        if (!userIdHeader) {
            throw new Error('x-user-id header is missing or empty');
        }
        const userId = new ObjectId(userIdHeader);
        const wishedProducts = await Product.getWishlisted(userId);
        return Response.json(wishedProducts)
    } catch (err) {
        return ErrorHandler(err);
    }
}