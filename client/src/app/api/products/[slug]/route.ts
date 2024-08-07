import ProductModel from "@/database/models/product";

export async function GET(request: Request, {params} : {params: {slug: string}}){
    const product = await ProductModel.getProductSlug(params.slug)
    return Response.json({product}, {status: 200})
}