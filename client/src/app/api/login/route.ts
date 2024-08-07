import UserModel from "@/database/models/users"
import { cookies } from "next/headers"
import {ZodError} from "zod"

type ValidationError = {
    name: string
}


export async function POST(request: Request){
    try {
        const data = await request.json()
        const access_token = await UserModel.login(data)
        cookies().set('Authorization', `Bearer ${access_token}`)
        return Response.json({access_token}, {status: 200})
    } catch (error) {
        if (error instanceof ZodError){
            return Response.json({
                message: error.issues[0].message
            }, {
                status: 400
            })
        }
        const validationError = error as ValidationError
        if (validationError.name == "uniqueEmail"){
            return Response.json({
                message: "Invalid Email/Password"
            }, {status: 401})
        }

        console.log(error)
        return Response.json({
            message: "Internal Server Error"
        }, {status: 500})
    }

}