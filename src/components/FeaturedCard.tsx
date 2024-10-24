import { ProductType } from "@/types/ProductType"
import AddToWishlistBtn from "./AddToWishlistBtn"
import Link from "next/link"

type Props = {
    product: ProductType
  }

export default function FeaturedCard(props: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md">
        <img src={props.product.thumbnail} alt={props.product.name} className="w-full h-64 object-cover" />
        <div className="p-4 text-center">
        <h4 className="text-lg font-medium mb-2 capitalize">{props.product.name}</h4>
        <p className="line-clamp-3">{props.product.excerpt}</p>
        <p className="text-lg font-bold text-gray-800">Rp. {props.product.price}</p>
            <div className="mt-2">
            <AddToWishlistBtn productId={props.product._id.toString()} />
            </div>
            <Link href={`/products/${props.product.slug}`} className="block text-center bg-[#fc6326] hover:bg-orange-700 text-white py-2 rounded mt-2">
            View Details
            </Link>
        </div>
    </div>
  )
}
