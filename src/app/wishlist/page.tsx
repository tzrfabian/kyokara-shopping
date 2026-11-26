'use client'
import WishlistCard from '@/components/WishlistCard'
import { ProductType } from '@/types/ProductType'
import { useEffect, useState } from 'react'
import Loading from './loading';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlists = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all-wishlist`, {
        credentials: 'include'
      })
      const data = await response.json();
      setWishlist(data)
      setLoading(false);
    } catch (err) {
      console.log("Failed to fetch products:", err);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlists();
  }, [])

  return (
    <main className="mx-auto my-6 w-full max-w-7xl px-4 sm:my-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">Your Wishlist</h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
          {loading ? (
            <Loading/>
          ) : (
            wishlist.map((wishlist, i) => {
              return <WishlistCard key={i} product={wishlist} fetchWishlists={fetchWishlists}/>
            })
          )}
            
        </div>
    </main>
  )
}
