import jwt from 'jsonwebtoken'
import environment from '../constants/environment'
import { db } from '../models'

export const generateJwt = (payload: any, options: {type?: "access" | "refresh", expiresIn?: string} = {type: "access", expiresIn: '15m'}) => {
    const type = options.type || 'access'
    const expiresIn = options.expiresIn || (type === 'refresh' ? '7d' : '15m')

    const secret = type === 'refresh' ? environment.refreshTokenSecret as string: environment.accessTokenSecret as string

    return jwt.sign(payload, secret, { expiresIn })
}

export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export const generateRandomGoogleId = async (length: number) => {
    let googleId

    do {
        googleId = generateRandomString(length)
    } while (await db.users.findFirst({
        where: {
            googleId
        }
    }));

    return googleId
}