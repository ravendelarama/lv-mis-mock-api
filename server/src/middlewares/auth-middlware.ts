import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import environment from "../constants/environment";
import { response } from "../utils/response";
import { db } from "../models";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const isAuthenticated = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log(req.headers.authorization, 'LN 19')
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, environment.accessTokenSecret as string) as DecodedToken
            console.log(decoded)
            const authUser = await db.users.findFirst({
              where: {
                id: decoded.id,
              }
            })

            if (authUser){
              req.user = authUser
            }
            next()
        } catch (err) {
            console.error("Error verifying token:", err)
            return response(res, 403, false, "Invalid or expired token")
        }
    }

    if (!token) {
       return response(res, 401, false, "Token is not provided")
    }
  }
);
