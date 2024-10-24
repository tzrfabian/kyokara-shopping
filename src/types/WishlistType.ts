import { ObjectId } from "mongodb";
import { z } from "zod";

export const WishlistSchema = z.object({
    userId: z.instanceof(ObjectId),
    productId: z.instanceof(ObjectId),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export type WishlistType = z.infer<typeof WishlistSchema>