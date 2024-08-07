import UserModel from "@/database/models/users"
import {ZodError} from "zod"

type ValidationError = {
    name: string
}


export async function GET (){
    const data = {
        name: "adit"
    }

    return Response.json(data)
}
export async function POST(request: Request){
    try {
        const data = await request.json()
        await UserModel.register(data)
        return Response.json({message: "User Registered"}, {status: 201})
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
                message: "Email Already Exsist"
            }, {status: 400})
        }

        if(validationError.name == "uniqueUsername"){
            return Response.json({
                message: "Username Already Exsist"
            }, {status: 400})
        }

        console.log(error)
        return Response.json({
            message: "Internal Server Error"
        }, {status: 500})
    }

}