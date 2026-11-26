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

      if (response.status === 401) {
        toast.error("You must sign in first, before add product to wishlist!", {
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
        return;
      }
      if (!response.ok) {
        const data = await response.json() as { error: string };
        throw new Error(data.error);
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
    <div className="w-full">
      {isWished ? (
        <RemoveWishlistBtn productId={productId} setIsWished={setIsWished} fetchWishlists={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      ) : (
        <button
          onClick={handleAddToWishlist}
          type="button"
          disabled={isAdding}
          className="min-h-11 w-full rounded border-2 border-orange-600 bg-white px-2 py-2 text-[10px] font-semibold uppercase text-gray-900 transition-colors hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:text-xs"
        >
          {isAdding ? "Adding..." : "Add to Wishlist"}
        </button>
      )}
    </div>
  );
}
