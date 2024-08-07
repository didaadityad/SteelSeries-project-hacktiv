import { Product, ProductResponse } from "@/database/types/product";
import Link from "next/link";


async function getProducts(): Promise<Product[]>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
    const data: ProductResponse = await response.json()
    return await data.products
    
}
export default async function Home() {
  const products = await getProducts()
  return (
    <>
    <main className="flex min-h-screen flex-col justify-between bg-gray-50">
      
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full h-96">
          <img src="https://wallpaperaccess.com/full/883189.jpg" className="w-full h-full object-cover rounded-lg shadow-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full h-96">
          <img src="https://th.bing.com/th/id/OIP.yDvKJTjwjd4utSndxkDLdgHaCH?rs=1&pid=ImgDetMain" className="w-full h-full object-cover rounded-lg shadow-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full h-96">
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/61b88a144382729.628bb6d95f132.jpg" className="w-full h-full object-cover rounded-lg shadow-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full h-96">
          <img src="https://th.bing.com/th/id/OIP.l_eGbvRAr8Fz7xQqsg-ROQHaEQ?rs=1&pid=ImgDetMain" className="w-full h-full object-cover rounded-lg shadow-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle btn-outline text-gray-800 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
              ❯
            </a>
          </div>
        </div>
      </div>
  
     
      <div className="flex flex-col items-center py-16">
        <h3 className="text-4xl font-bold text-gray-800">RECOMMENDED PRODUCTS</h3>
        <p className="text-gray-600 mt-2">Temukan pilihan produk berkelas</p>
      </div>
  
      
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-2 gap-8">
          {products?.map((e) => (
            <div 
              className="relative shadow-lg shadow-gray-300 fadeIn transform transition-transform hover:scale-105"
              key={e.slug}
            >
              <img
                src={e.thumbnail}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
                alt="products"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">
                  {e.name}
                </h2>
                <Link href={`/products/${e.slug}`}>
                  <button className="mt-4 px-4 py-2 bg-white text-black rounded-full btn">
                    Temukan produk
                  </button>
                </Link>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center mt-8">
            <Link href="/products" className="text-md px-4 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors">
              See all products
            </Link>
          </div>
        </div>
      </div>
  
      
      <div className="bg-gray-800 text-white py-20 mt-16 flex flex-col md:flex-row justify-around w-full">
        <div className="text-center mb-8 md:mb-0">
          <p className="text-lg font-bold">Layanan Pelanggan 24/7</p>
          <p className="text-sm mt-1">Tim kami siap membantu Anda kapan saja, siang atau malam.</p>
        </div>
        <div className="text-center mb-8 md:mb-0">
          <p className="text-lg font-bold">Garansi Perpanjangan</p>
          <p className="text-sm mt-1">Nikmati ketenangan dengan garansi perpanjangan pada produk tertentu.</p>
        </div>
        <div className="text-center mb-8 md:mb-0">
          <p className="text-lg font-bold">Diskon Anggota Eksklusif</p>
          <p className="text-sm mt-1">Akses diskon dan penawaran khusus sebagai anggota yang berharga.</p>
        </div>
      </div>
    </main>
  </>
  

  )
}