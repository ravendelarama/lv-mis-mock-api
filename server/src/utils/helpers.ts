import jwt from 'jsonwebtoken'
import environment from '../constants/environment'

export const generateJwt = (payload: any, options: {type?: "access" | "refresh", expiresIn?: string} = {type: "access", expiresIn: '15m'}) => {
    const type = options.type || 'access'
    const expiresIn = options.expiresIn || (type === 'refresh' ? '7d' : '15m')

    const secret = type === 'refresh' ? environment.refreshTokenSecret as string: environment.accessTokenSecret as string

    return jwt.sign(payload, secret, { expiresIn })
}