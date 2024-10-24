'use client'
import { useEffect, useState } from "react";
import RemoveWishlistBtn from "./RemoveWishlistBtn";
import { Bounce, toast } from "react-toastify";
type AddToWishlistBtnProps = {
  productId: string;
};

export default function AddToWishlistBtn({ productId }: AddToWishlistBtnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isWished, setIsWished] = useState(false);

  const handleCheckWishlistStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/check?productId=${productId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const { isWished } = await response.json();
        setIsWished(isWished);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  }
  useEffect(() => {
    handleCheckWishlistStatus();
  }, [productId]);

  const handleAddToWishlist = async () => {
    try {
      setIsAdding(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("You must sign in first, before add product to wishlist!");
      }
      toast.success('Add to Wishlist Success', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsWished(true);
      console.log("Product added to wishlist");
    } catch (error) {
      toast.error((error as Error).message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error adding to wishlist:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      {isWished ? (
        <RemoveWishlistBtn productId={productId} setIsWished={setIsWished} fetchWishlists={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      ) : (
        <button
          onClick={handleAddToWishlist}
          type="button"
          disabled={isAdding}
          className="px-2 py-1 text-xs border-2 border-orange-600 font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-orange-300 focus:bg-gray-400 focus:outline-none"
        >
          {isAdding ? "Adding..." : "Add to Wishlist"}
        </button>
      )}
    </div>
  );
}
