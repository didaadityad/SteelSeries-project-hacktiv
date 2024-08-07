'use client'
import {ObjectId} from 'mongodb'
import {toast} from 'react-toastify'


export const addWishList = async (productId: ObjectId): Promise<void> => {

    try {
        console.log(`Attempting to add productId: ${productId} to wishlist`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist` , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productId})
        })
    
        const result = await response.json()
        if(!response.ok){
            toast.error(result.message)
        } else {
            toast.success('Added to wishlist')
        }
    } catch (error) {
        console.log(error)
    }
}

export default function WishListBtn({productId}: {productId: ObjectId}){
    return (
        <button 
    onClick={() => addWishList(productId)} 
    className="relative flex items-center justify-center px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
>
    <span className="relative z-10 text-lg font-semibold">Add to Wishlist</span>
    <span className="absolute inset-0 bg-indigo-100 opacity-20 rounded-lg"></span>
</button>

    )
}