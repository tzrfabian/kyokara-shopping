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
    <div className='container my-8 px-4 mx-auto'>
        <p className="text-center font-bold text-2xl mb-8">Your Wishlist</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {loading ? (
            <Loading/>
          ) : (
            wishlist.map((wishlist, i) => {
              return <WishlistCard key={i} product={wishlist} fetchWishlists={fetchWishlists}/>
            })
          )}
            
        </div>
    </div>
  )
}
