import WishListModel from '@/database/models/wishList';
import { ObjectId } from 'mongodb';
type ValidationError = {
    name: string
}

export async function POST(request: Request){
    try {
        const {productId} = await request.json()
        const userId = request.headers.get("x-id-user") as string
        const data = {
            productId: new ObjectId(productId),
            userId: new ObjectId(userId),
            createdAt: new Date(),
            updatedAt: new Date()

        }

        await WishListModel.addWishList(data)
        return Response.json({message: "wishlist added"})
    } catch (error) {
        const validationError = error as ValidationError
        if(validationError.name = "exsistWishList"){
            return Response.json({message: "Already Added"})
        }
    }
}

export async function GET(request: Request){
    const userId = request.headers.get("x-id-user") as string;
    const result = await WishListModel.getWishList(userId);
    return Response.json({result}, {status: 200})
}

export async function DELETE(request: Request){
    let {productId} = await request.json();
    const userId = request.headers.get("x-id-user") as string;
    const data = {
        productId: new ObjectId(productId),
        userId: new ObjectId(userId)
    }
    await WishListModel.deleteWishList(data);
    return Response.json({message: "successfully removed product"}, {status: 200})
}