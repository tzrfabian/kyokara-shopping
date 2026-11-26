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
    <div className="w-full">
        <button 
          onClick={handleRemoveFromWishlist}
          type='button'
          disabled={isRemoving}
          className="min-h-11 w-full rounded border-2 border-orange-600 bg-white px-2 py-2 text-[10px] font-semibold uppercase text-gray-900 transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:text-xs">
          {isRemoving ? "Removing..." : "Remove from Wishlist"}
        </button>
    </div>
  )
}
