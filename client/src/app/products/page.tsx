"use client"

import { Product, ProductResponse } from "@/database/types/product";
import { useEffect, useState } from "react"
import {useDebounce} from "use-debounce"
import InfiniteScroll from "react-infinite-scroll-component"
import Image from "next/image";
import ProductCard from "@/component/productCard";

export default function Products (){
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true)

    const [debounceValue] = useDebounce(search, 750)

    async function getProducts(page: number, filter: string): Promise<Product[]>{
        const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&filter=${filter}`)
        const data: ProductResponse = await response.json()
        return data.products
    }

    useEffect(() => {
        async function fetchInitialProducts(){
            setProducts([]);
            setPage(1);
            setHasMore(true);
            const newProducts = await getProducts(1, debounceValue);
            setProducts(newProducts);
            if (newProducts.length === 0) {
                setHasMore(false);
            }
        }
        fetchInitialProducts()
    },[debounceValue])

    useEffect(() => {
        async function fetchMoreProducts() {
            if (page === 1) return; 
            const newProducts = await getProducts(page, debounceValue);
            if (newProducts.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prevProducts) => [...prevProducts, ...newProducts]);
            }
        }
        fetchMoreProducts();
    }, [page])

    const fetchNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    return (
        <>
        <main className="flex min-h-screen flex-col justify-between bg-gray-50">
          <img
            src={"https://wallpaperaccess.com/full/883189.jpg"}
            width={2000}
            height={500}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            alt={"banner"}
          />
      
          <h3 className="text-4xl font-bold pt-16 pb-8 text-center text-gray-800">
            ALL PRODUCTS
          </h3>
          <div className="w-full flex justify-center pb-16">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-2/3 lg:w-1/2 p-4 rounded-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <InfiniteScroll
            dataLength={products.length}
            className="flex flex-col justify-center items-center"
            next={fetchNextPage}
            hasMore={hasMore}
            loader={<h4 className="text-gray-600">Loading...</h4>}
            endMessage={
              <p className="text-center text-gray-600">
                <b>You have seen it all</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8 px-5">
              {products?.map((e) => (
                <div
                  key={e.slug}
                  className="bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 overflow-hidden"
                >
                  <ProductCard product={e} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </main>
      </>
      

    )
}