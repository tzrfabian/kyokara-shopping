import ErrorHandler from "@/errors/ErrorHandler";
import { Product } from "@/models/ProductModel"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const {products, totalProducts } = await Product.findAllWithPagination(page, limit);
        return Response.json({products, page, limit, totalProducts})
    } catch (err) {
        return ErrorHandler(err);
    }
}