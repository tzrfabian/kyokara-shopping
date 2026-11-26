import { ProductType } from "@/types/ProductType"
import AddToWishlistBtn from "./AddToWishlistBtn"
import Link from "next/link"

type Props = {
    product: ProductType
  }

export default function FeaturedCard(props: Props) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl">
        <img src={props.product.thumbnail} alt={props.product.name} className="aspect-[4/3] w-full object-cover" />
        <div className="p-4 text-center sm:p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold capitalize sm:text-lg">{props.product.name}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{props.product.excerpt}</p>
        <p className="mt-2 text-base font-bold text-gray-800 sm:text-lg">Rp. {props.product.price}</p>
            <div className="mt-2">
            <AddToWishlistBtn productId={props.product._id.toString()} />
            </div>
            <Link href={`/products/${props.product.slug}`} className="mt-3 flex min-h-11 items-center justify-center rounded-lg bg-[#fc6326] py-2 text-center font-medium text-white transition hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
            View Details
            </Link>
        </div>
    </article>
  )
}
