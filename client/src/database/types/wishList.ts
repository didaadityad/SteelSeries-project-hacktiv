import { ObjectId } from 'mongodb';
import { Product } from './product';
export type WishListType = {
    _id: ObjectId
    userId: ObjectId
    productId: ObjectId
    createdAt: Date
    updatedAt: Date
    product: Product
}

export type newWishList = Omit<WishListType, '_id' | 'product'>
