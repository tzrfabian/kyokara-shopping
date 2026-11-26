'use client'

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { ProductType } from "@/types/ProductType";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (currentPage: number) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${currentPage}&limit=10`);
          const data = await response.json();
    
          // nge cek apakah ada yg masih bisa diload
          setProducts((prevProducts) => [...prevProducts, ...data.products]);
          if (data.products.length < 10) {
            setHasMore(false);
          }
          setLoading(false);
        } catch (err) {
          console.log("Failed to fetch products:", err);
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        fetchProducts(page + 1);
    }

    const handleSearchResults = (searchResults: ProductType[]) => {
        setFilteredProducts(searchResults)
    }

  return (
    <main className="mx-auto my-6 w-full max-w-7xl px-4 sm:my-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:mb-8 sm:text-3xl">List of Our Products</h1>
        <div className="mb-8 sm:mb-10">
            <SearchBar onSearch={handleSearchResults}/>
        </div>
      <InfiniteScroll
        dataLength={products.length} 
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading more products...</div>}
        endMessage={
          <div className="text-center py-4 text-gray-500">
            <p>{"You've reached the end of the product list."}</p>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
          {loading && products.length === 0 ? (
            <Loading />
          ) : (
            (filteredProducts.length > 0 ? filteredProducts : products).map((el, i) => {
              return <ProductCard key={i} product={el} />;
            })
          )}
        </div>
      </InfiniteScroll>
    </main>
  )
}
