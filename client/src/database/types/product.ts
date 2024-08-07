import { ObjectId } from 'mongodb';
export type Product = {
    _id: ObjectId
    name:string
    slug:string
    description:string
    excerpt:string
    thumbnail:string
    images: string[]
    price:number
    tags:string[]
    createdAt:string
    updatedAt:string
}

export type ProductResponse = {
    products: Product[]
}