import { database } from "@/db/config";
import {WishlistSchema, WishlistType} from '../types/WishlistType';
import { ObjectId } from "mongodb";

export class Wishlist {
    static collection() {
        return database.collection<WishlistType>('wishlists')
    }

    static async findAll() {
        return await this.collection().find().toArray();
    }

    static async addWishlist(newWish: WishlistType) {
        WishlistSchema.parse(newWish);
        const result = await this.collection().insertOne(newWish);
        return result;
    }

    static async isProductInWishlist(userId: ObjectId, productId: ObjectId) {
        const wishlistItem = await this.collection().findOne({
            userId: userId,
            productId: productId
        });
        return wishlistItem !== null;
    }

    static async deleteWishlist(newWish: WishlistType) {
        WishlistSchema.parse(newWish);
        const result = await this.collection().deleteOne(newWish);
        return result;
    }
}