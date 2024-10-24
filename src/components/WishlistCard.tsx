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
    <div className="max-w-xs overflow-hidden bg-[#f7ede9] rounded-lg shadow-lg flex flex-col justify-between">
  <div className="px-4 py-2 flex-grow">
    <h1 className="text-xl font-bold text-gray-800 capitalize">
    {product.name}
    </h1>
    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
    {product.excerpt}
    </p>
  </div>
  <Link href={`/products/${product.slug}`}>
    <img
      className="object-cover w-full h-60 mt-2"
      src={product.thumbnail}
      alt="product img"
    />
  </Link>
  <div className="flex items-center justify-between px-4 py-2 bg-orange-600">
    <h1 className="text-lg font-bold text-white">Rp. {product.price}</h1>
    {isWished && (
      <RemoveWishlistBtn
        productId={product._id.toString()}
        setIsWished={setIsWished}
        fetchWishlists={fetchWishlists}
      />
        )}
  </div>
</div>
  )
}
