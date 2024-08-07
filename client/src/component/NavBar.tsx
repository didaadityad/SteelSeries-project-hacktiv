"use client"
import { Logout } from "@/app/logout"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()
  const handleLogout = async () => {
    await Logout()
    router.refresh
  }
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
  <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
    <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
      STEELSERIES
    </Link>
    <div className="flex items-center space-x-6">
      <Link
        href="/products"
        className="px-4 py-2 text-gray-800 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        PRODUCT
      </Link>
      <Link
        href="/wishlist"
        className="px-4 py-2 text-gray-800 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        WISHLIST
      </Link>
      {isLoggedIn ? (
        <button
          onClick={() => handleLogout()}
          className="px-4 py-2 text-gray-800 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          LOGOUT
        </button>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 text-gray-800 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          LOGIN & REGISTER
        </Link>
      )}
    </div>
  </div>
</div>


  )
}