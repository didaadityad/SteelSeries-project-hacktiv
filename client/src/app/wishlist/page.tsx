"use client"
import { WishListType } from "@/database/types/wishList";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb"
import WishlistCard from "@/component/wishlistCard";

export default function WishList(){
    const [data, setData] = useState<WishListType[]>([])

    async function fetchWishlist(): Promise<WishListType[]>{
        const response =  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`)
        const data = await response.json()
        setData(data.result)
        return data.result
    }

    const removeWishList = async (productId: ObjectId): Promise<void> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({productId})
        })

        if(!response.ok){
            console.log(response)
            throw new Error(`Failed to remove item`)
        }
        fetchWishlist()
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    return (
        <>
  <main className="bg-gray-100 min-h-screen py-12">
    <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-12">YOUR WISHLIST</h1>
    <div className="flex justify-center flex-wrap gap-6 px-4 md:px-6 lg:px-8">
      {data.map((e, i) => (
        <WishlistCard key={i} wishlist={e} removeWishList={removeWishList} />
      ))}
    </div>
  </main>
</>

    );
}