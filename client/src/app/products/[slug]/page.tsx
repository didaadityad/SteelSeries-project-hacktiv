import WishListBtn from "@/component/addWishList"
import { Product } from "@/database/types/product"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
    params: {slug: string}
    searchParams: {[key:string]: string | string[] | undefined}
}

export async function generateMetadata(
    {params, searchParams}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const slug = params.slug

    const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`).then((res) => res.json())

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: "SteelSeries - " + product.product.name,
        description: product.product.description,
        openGraph: {
            images: [...previousImages]
        }
    }
}

async function fetchProduct (params:string):Promise<Product>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params}`)
    const data = await response.json()
    return data.product
}

function formatCurrency (value: number): string {
    return new Intl.NumberFormat(`id-ID`, {style: `currency`, currency: `IDR`}).format(value)
}

export default async function ProductDetail ({params}: {
    params: {slug:string}
}){
    const product =  await fetchProduct(params.slug)

    return (
        <>
  <main className="flex flex-col min-h-screen bg-gray-100">
    <header className="flex justify-center items-center py-8 bg-white shadow-md">
      <h1 className="text-5xl font-extrabold text-gray-900">Product Detail</h1>
    </header>
    <section className="flex flex-col md:flex-row max-w-7xl mx-auto my-12 bg-white rounded-2xl shadow-lg overflow-hidden flex-1">
      <div className="w-full md:w-1/2 h-full">
        <img
          src={product?.thumbnail}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl font-bold text-gray-900">{product?.name}</h3>
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-600">Tags:</p>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {product.tags[0]}
            </span>
          </div>
          <p className="text-3xl font-semibold text-gray-800">{formatCurrency(product?.price)}</p>
          <p className="text-gray-700 leading-relaxed">{product?.description}</p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-6 gap-4">
          <WishListBtn productId={product._id} />
          <button className="relative px-8 py-3 bg-white text-gray-900 font-semibold border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <span className="relative z-10">Buy Now</span>
          </button>
        </div>
      </div>
    </section>
  </main>
</>

      
      
    )
}