import { database } from "@/db/config";
import { ProductType } from "@/types/ProductType";
import { ObjectId } from "mongodb";

export class Product {
    static collection() {
        return database.collection<ProductType>('products')
    }
    
    static findAll() {
        return this.collection().find().toArray();
    }

    static async findAllWithPagination(page: number = 1, limit: number = 10) {
      const skip = (page - 1) * limit;
      const totalProducts = await this.collection().countDocuments();
      const products = await this.collection().find().skip(skip).limit(limit).toArray();

      return {products, totalProducts}
    }

    static getWishlisted(userId: ObjectId) {
        const pipeline = [
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "wishlists",
                  localField: "_id",
                  foreignField: "productId",
                  as: "isWished"
                }
            },
            {
              $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                  isUserWished: {
                    $in: [
                      new ObjectId(String(userId)),
                      "$isWished.userId"
                    ]
                  }
                }
            },
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  isUserWished: true
                }
            }
          ]
        const result = this.collection().aggregate(pipeline).toArray();
        return result
    }

    static findBySlug(slug: string) {
        return this.collection().findOne({slug});
    }

    static findBySlugAuth(slug: string, userId: ObjectId) {
        const pipeline = [
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  slug: slug
                }
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "wishlists",
                  localField: "_id",
                  foreignField: "productId",
                  as: "isWished"
                }
            },
            {
              $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                  isUserWished: {
                    $in: [
                      new ObjectId(String(userId)),
                      "$isWished.userId"
                    ]
                  }
                }
            }
          ]
          const result = this.collection().aggregate(pipeline).next();
          return result;
    }

    static findFeatured() {
        return this.collection().find().sort({createdAt: -1}).limit(6).toArray();
    }

    static searchProduct(keyword: string) {
        const searchRegex = new RegExp(keyword, 'i');
        return this.collection().find({
            $or: [
                {name: {$regex: searchRegex}}
            ]
        }).toArray();
    }
}