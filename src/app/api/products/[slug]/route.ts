import ErrorHandler from "@/errors/ErrorHandler";
import { Product } from "@/models/ProductModel";

export async function GET(request: Request, { params }: { params: {slug: string} }) {
    try {
        const {slug} = params;
        // const userIdHeader = request.headers.get('x-user-id');
        // console.log(userIdHeader);
        // if(userIdHeader) {
        //     const userId = new ObjectId(userIdHeader);
        //     const product = await Product.findBySlugAuth(slug, userId)
        //     return Response.json(product)
        // }
        const product = await Product.findBySlug(slug);
        return Response.json(product)
        
    } catch (err) {
        return ErrorHandler(err);
    }
}