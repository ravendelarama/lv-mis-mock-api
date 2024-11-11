import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import environment from "../constants/environment";
import { response } from "../utils/response";
import { db } from "src/models";

export const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, environment.accessTokenSecret as string)
            console.log(decoded)
            next()
        } catch (err) {
            console.error("Error verifying token:", err)
           response(res, 403, false, "Invalid or expired token" , null)
        }
    }

    if (!token) {
       response(res, 401, false, "Token is not provided" , null)
    }
})