import { database } from "@/db/config";
import { UserType, UserSchema } from '../types/UserType';
import { hashPassword } from "@/helpers/bcrypt";
import { Filter, ObjectId } from "mongodb";

export class User {
    static collection() {
        return database.collection<UserType>('users')
    }

    static async findAll() {
        return await this.collection().find().toArray();
    }

    static async findByPk(id: string) {
        const result = await this.collection().findOne({_id: new ObjectId(id)})
        return result;
    }

    static async findOne(filter: Filter<UserType>) {
        const result = await this.collection().findOne(filter);
        return result;
    }

    static async create(newUser: UserType) {
        UserSchema.parse(newUser);
        newUser.password = hashPassword(newUser.password);
        newUser.createdAt = newUser.updatedAt = new Date();

        const result = await this.collection().insertOne(newUser);
        const { password, ...onlyUserData} = newUser;
        console.log(password);
        return {
            ...onlyUserData,
            id: result.insertedId
        };
    }
}