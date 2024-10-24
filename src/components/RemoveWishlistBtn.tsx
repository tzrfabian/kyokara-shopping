'use client'

import { useState } from "react";

type RemoveWishlistBtnProps = {
  productId: string;
  setIsWished: (value: boolean) => void;
  fetchWishlists: () => void;
};
export default function RemoveWishlistBtn({ productId, setIsWished, fetchWishlists }: RemoveWishlistBtnProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveFromWishlist = async () => {
    try {
      setIsRemoving(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }

      setIsWished(false);
      fetchWishlists();
      console.log("Product removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
        <button 
          onClick={handleRemoveFromWishlist}
          type='button'
          disabled={isRemoving}
          className="px-2 py-1 text-xs border-2 border-orange-600 font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-orange-300 focus:bg-gray-400 focus:outline-none">
          {isRemoving ? "Removing..." : "Remove from Wishlist"}
        </button>
    </div>
  )
}
