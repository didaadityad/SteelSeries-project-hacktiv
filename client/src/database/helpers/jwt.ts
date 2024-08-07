import jwt, {JwtPayload} from "jsonwebtoken"
import * as jose from 'jose'

const secret = process.env.JWT_SECRET_KEY as string


export const signToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, secret)
}

export const readPayload = async<T>(token: string) => {
const secretKey = new TextEncoder().encode(secret)
const payloadJose = await jose.jwtVerify<T>(token, secretKey);
return payloadJose.payload
}




