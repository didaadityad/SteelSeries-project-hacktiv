"use client"

import { Product } from "@/database/types/product"
import Link from "next/link"
import WishListBtn from "./addWishList"

export default function ProductCard({product}: {product: Product}){

    function formatCurrency (value: number): string {
        return new Intl.NumberFormat(`id-ID`, {style: `currency`, currency: `IDR`}).format(value)
    }

    return (
        <div className="">
  <figure className="">
    <img
      src={product.thumbnail}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-lg"
      style={{ objectFit: 'cover' }} 
    />
  </figure>
  <div className="p-4">
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`}
      className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
    >
      {product.name}
    </Link>
    <p className="text-gray-600 mt-2">{formatCurrency(product.price)}</p>
    <div className="flex justify-between items-center mt-4">
      <WishListBtn productId={product._id} />
      <button className="relative px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <span className="relative z-10 text-lg font-semibold">Buy Now</span>
      </button>
    </div>
  </div>
</div>

      

    )
}