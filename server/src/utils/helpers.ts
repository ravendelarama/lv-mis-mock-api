import jwt from 'jsonwebtoken'

export const generateJwt = (payload: any, options: {type?: "access" | "refresh", expiresIn?: string} = {type: "access", expiresIn: '15m'}) => {
    const type = options.type || 'access'
    const expiresIn = options.expiresIn || (type === 'refresh' ? '7d' : '15m')

    const secret = type === 'refresh' ? process.env.REFRESH_TOKEN_SECRET as string: process.env.ACCESS_TOKEN_SECRET as string

    return jwt.sign(payload, secret, { expiresIn })
}