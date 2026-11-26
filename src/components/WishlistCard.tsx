'use client'
import { ProductType } from "@/types/ProductType";
import RemoveWishlistBtn from "./RemoveWishlistBtn";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: ProductType;
  fetchWishlists: () => void;
}

export default function WishlistCard({product, fetchWishlists}: Props) {
  const [isWished, setIsWished] = useState(true);
  
  return (
    <article className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl bg-[#f7ede9] shadow-md transition-shadow hover:shadow-lg">
  <div className="flex-grow px-3 py-3 sm:px-4">
    <h2 className="line-clamp-2 text-sm font-bold capitalize text-gray-800 sm:text-lg">
    {product.name}
    </h2>
    <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:line-clamp-3 sm:text-sm">
    {product.excerpt}
    </p>
  </div>
  <Link href={`/products/${product.slug}`}>
    <img
      className="aspect-square w-full object-cover sm:aspect-[4/3]"
      src={product.thumbnail}
      alt={product.name}
    />
  </Link>
  <div className="flex min-w-0 flex-col gap-2 bg-orange-600 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
    <p className="truncate text-xs font-bold text-white sm:text-base">Rp. {product.price}</p>
    <div className="w-full sm:w-auto">
      {isWished && (
        <RemoveWishlistBtn
          productId={product._id.toString()}
          setIsWished={setIsWished}
          fetchWishlists={fetchWishlists}
        />
      )}
    </div>
  </div>
    </article>
  )
}
