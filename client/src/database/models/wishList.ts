import { ObjectId } from 'mongodb';
import { getCollection } from '../config/index';
import { newWishList, WishListType } from '../types/wishList';
export default class WishListModel {
    static getCollection() {
        return getCollection("wishLists")
    }

    static async addWishList(data: newWishList){
        const exsistWishList = await this.getCollection().findOne({userId: data.userId})

        if(exsistWishList){
            throw ({name: "exsistWishList"})
        }

        return await this.getCollection().insertOne(data)
    }


    static async getWishList(userId: string){
        const userIdObj = new ObjectId (userId)
        const pipeline = [
            {
              '$match': {
                'userId': userIdObj
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': 'productId', 
                'foreignField': '_id', 
                'as': 'product'
              }
            },
            {
                '$unwind': {
                  'path': '$product', 
                  'preserveNullAndEmptyArrays': true
                }
              }
          ]

          const data = await this.getCollection().aggregate(pipeline).toArray() as WishListType[]
          return data
    }

    static async deleteWishList(data: {productId: ObjectId, userId: ObjectId}){
        return await this.getCollection().deleteOne({userId: data.userId, productId: data.productId})
    }
}