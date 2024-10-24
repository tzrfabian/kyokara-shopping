import ErrorHandler from "@/errors/ErrorHandler";
import { Product } from "@/models/ProductModel";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    try {
        const products = await Product.searchProduct(keyword as string);
        return new Response(JSON.stringify(products), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return ErrorHandler(err);
    }
}