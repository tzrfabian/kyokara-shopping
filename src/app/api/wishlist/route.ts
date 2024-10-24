
import ErrorHandler, { CustomError } from "@/errors/ErrorHandler";
import { Wishlist } from "@/models/WishlistModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const wishlists = await Wishlist.findAll();
        return NextResponse.json(wishlists);
    } catch (err) {
        return ErrorHandler(err);
    }
}

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const {productId} = body;
        const userIdHeader = request.headers.get('x-user-id');
        if (!userIdHeader || !ObjectId.isValid(userIdHeader)) {
            throw new CustomError('User not authenticated or invalid user ID', 401);
        }
        const userId = new ObjectId(userIdHeader);
        if(!userId) {
            throw new CustomError("User not authenticated", 401)
        }

    const newWishlist = {
        userId: userId,
        productId: new ObjectId(productId),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const result = await Wishlist.addWishlist(newWishlist);

    return NextResponse.json({ message: 'Wishlist added successfully', result });
    } catch (err) {
        return ErrorHandler(err);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const {productId} = body;
        const userIdHeader = request.headers.get('x-user-id');
        if (!userIdHeader || !ObjectId.isValid(userIdHeader)) {
            throw new CustomError('User not authenticated or invalid user ID', 401);
        }
        const userId = new ObjectId(userIdHeader);
        if(!userId) {
            throw new CustomError("User not authenticated", 401)
        }

    const wishlistToDelete = {
        userId: userId,
        productId: new ObjectId(productId)
    };

    const result = await Wishlist.deleteWishlist(wishlistToDelete);

    return NextResponse.json({ message: 'Wishlist deleted successfully', result });
    } catch (err) {
        return ErrorHandler(err);
    }
}