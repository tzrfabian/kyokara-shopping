import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string().min(1, { message: "is required"}),
    username: z.string().min(1, { message: "is required"}),
    email: z.string().min(1, "is required").email({ message: "format is invalid"}),
    password: z.string().min(1, {message: "is required"}).min(5, {message: "must be at least 5 characters"}),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export type UserType = z.infer<typeof UserSchema>