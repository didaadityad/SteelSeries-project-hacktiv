import ProductModel from "@/database/models/product";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams

    const page = search.get("page") || "1"
    const filter = search.get("filter") || ""
    
    const products = await ProductModel.getAllProducts(page, filter)
    return Response.json({ products }, { status: 200 })
}