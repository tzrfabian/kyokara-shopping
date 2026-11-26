'use client'

import { ProductType } from '@/types/ProductType'
import AddToWishlistBtn from './AddToWishlistBtn'
import Link from 'next/link'

type Props = {
  product: ProductType
}

export default function ProductCard(props: Props) {
  return (
<article className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-[#f7ede9] shadow-md transition-shadow hover:shadow-lg">
  <div className="flex-grow px-3 py-3 sm:px-4">
    <h2 className="line-clamp-2 text-sm font-bold capitalize text-gray-800 sm:text-lg">
      {props.product.name}
    </h2>
    <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:line-clamp-3 sm:text-sm">
      {props.product.excerpt}
    </p>
  </div>
  <Link href={`/products/${props.product.slug}`}>
    <img
      className="aspect-square w-full object-cover sm:aspect-[4/3]"
      src={props.product.thumbnail}
      alt={props.product.name}
    />
  </Link>
  <div className="flex min-w-0 flex-col gap-2 bg-orange-600 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
    <p className="min-w-0 truncate text-xs font-bold text-white sm:text-base">Rp. {props.product.price}</p>
    <div className="w-full sm:w-auto">
      <AddToWishlistBtn productId={props.product._id.toString()}/>
    </div>
  </div>
</article>

  )
}
