import ErrorHandler, { CustomError } from "@/errors/ErrorHandler";
import { Wishlist } from "@/models/WishlistModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productIdParam = searchParams.get("productId");
        const userIdHeader = request.headers.get('x-user-id');

        if (!productIdParam || !ObjectId.isValid(productIdParam)) {
            throw new CustomError('Invalid product ID', 400);
        }
        if (!userIdHeader || !ObjectId.isValid(userIdHeader)) {
            throw new CustomError('User not authenticated or invalid user ID', 401);
        }

        const userId = new ObjectId(userIdHeader);
        const productId = new ObjectId(productIdParam);

        const isWished = await Wishlist.isProductInWishlist(userId, productId);

        return NextResponse.json({ isWished });
    } catch (err) {
        return ErrorHandler(err);
    }
}
