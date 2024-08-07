"use client"

import { WishListType } from "@/database/types/wishList"
import { ObjectId } from "mongodb"

export default function WishlistCard({ wishlist, removeWishList }: { wishlist: WishListType, removeWishList: (productId: ObjectId) => Promise<void> }) {
    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    }

    return (
        <>
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col items-center p-6">
           
            <button
                onClick={() => removeWishList(wishlist.productId)}
                className="absolute top-2 left-2 p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
            >
                <span className="text-xl font-bold">✕</span> 
            </button>
            <div className="flex-shrink-0 mb-4">
                <img
                    src={wishlist.product.thumbnail}
                    alt={wishlist.product.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-sm"
                />
            </div>
            <div className="flex-1 flex flex-col items-center">
                <div className="py-4 text-center">
                    <p className="text-2xl font-semibold text-gray-800">{wishlist.product.name}</p>
                    <p className="text-lg text-gray-600">{formatCurrency(wishlist.product.price)}</p>
                </div>
                <div className="flex gap-4 mt-4 items-center justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        BUY
                    </button>
                </div>
            </div>
        </div>
    </>
    
    
    )
}