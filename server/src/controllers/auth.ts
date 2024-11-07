import expressAsyncHandler from "express-async-handler"
import { generateJwt } from "../utils/helpers"

const redirectUri = process.env.NODE_ENV !== 'production' ? process.env.CLIENT_DEV_URL : process.env.CLIENT_PROD_URL

export const handleGoogleCallback = expressAsyncHandler (async (req, res) => {
    const authToken = generateJwt({id: (req?.user as {id: string}).id}, {type: "access"})
    console.log('auth_token', authToken)
  
    res.cookie('auth_token', authToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 1000
    })
    
    console.log(req.user)
    res.redirect(`${redirectUri}`)
})

