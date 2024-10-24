'use client'

import { ProductType } from '@/types/ProductType'
import AddToWishlistBtn from './AddToWishlistBtn'
import Link from 'next/link'

type Props = {
  product: ProductType
}

export default function ProductCard(props: Props) {
  return (
<div className="max-w-xs overflow-hidden bg-[#f7ede9] rounded-lg shadow-lg flex flex-col justify-between">
  <div className="px-4 py-2 flex-grow">
    <h1 className="text-xl font-bold text-gray-800 capitalize">
      {props.product.name}
    </h1>
    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
      {props.product.excerpt}
    </p>
  </div>
  <Link href={`/products/${props.product.slug}`}>
    <img
      className="object-cover w-full h-60 mt-2"
      src={props.product.thumbnail}
      alt="product img"
    />
  </Link>
  <div className="flex items-center justify-between px-4 py-2 bg-orange-600">
    <h1 className="text-lg font-bold text-white">Rp. {props.product.price}</h1>
    <AddToWishlistBtn productId={props.product._id.toString()}/>
  </div>
</div>

  )
}
