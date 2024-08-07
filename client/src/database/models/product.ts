import { Product } from "../types/product"
import { getCollection } from "../config"

class ProductModel{
    static getCollection() {
        return getCollection("products")
    }


    static async getAllProducts(page: string, filter: string){
        try {
            const pipeline = [
                {
                    $match: {
                        name: {
                            $regex: filter,
                            $options: "i",
                        },
                    },
                },
                {
                    $skip: (+page - 1) * 7,
                },
                {
                    $limit: 7,
                },
            ]

            const products = await this.getCollection().aggregate(pipeline).toArray() as Product[]
            return products
        } catch (error) {
            console.log(error)
        }
    }

    static async getProductSlug(slug:string){
        try {
            const product = await this.getCollection().findOne({slug})
            return product
        } catch (error) {
            console.log(error)
        }
    }
}


export default ProductModel