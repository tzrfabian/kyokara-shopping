import ErrorHandler from "@/errors/ErrorHandler";
import { Product } from "@/models/ProductModel";
export const dynamic = "force-dynamic"
export async function GET() {
    try {
        const products = await Product.findFeatured();
        return Response.json(products)
    } catch (err) {
        return ErrorHandler(err);
    }
}