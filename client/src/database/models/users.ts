import {ObjectId} from 'mongodb'
import {z} from 'zod'
import { getCollection } from '../config'
import { comparePassword, hashPassword } from '../helpers/bcrypt'
import { signToken } from '../helpers/jwt'
const newUserSchema = z.object({
    username: z.string({required_error: "Username is required"}),
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email"}),
    password: z.string({required_error: "Password is required"}).min(5, {message: "Password must be at least 5 characters"})
})

const loginSchema = newUserSchema.omit({username: true})

type User = {
    _id: ObjectId
    username: string
    name: string
    email: string
    password: string
}

type NewUser = Omit<User, "_id">

type LoginForm = Omit<NewUser, "name" | "username">

export default class UserModel {
    static getCollection(){
        return getCollection("users")
    }


    static async register (data: NewUser){
        const parseResult = newUserSchema.safeParse(data)
        if(!parseResult.success){
            throw parseResult.error
        }

        const findByEmail = await this.getCollection().findOne({email: data.email}) as User
        if(findByEmail){
            throw {name: "uniqueEmail"}
        }

        const findByUsername = await this.getCollection().findOne({username: data.username}) as User
        if(findByUsername){
            throw {name: "uniqueUsername"}
        }

        return await this.getCollection().insertOne({
            ...data,
            password: hashPassword(data.password)
        })
    }

    static async login (data: LoginForm){
        const parseResult = loginSchema.safeParse(data)
        if(!parseResult.success) {
            throw parseResult.error
        }

        const user = await this.getCollection().findOne({email: data.email})
        if(!user || !comparePassword(data.password, user.password)){
            throw {name: "InvalidUser"}
        }
        const access_token = signToken({_id: user._id})
        return access_token

    }
}