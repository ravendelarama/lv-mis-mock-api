import expressAsyncHandler from "express-async-handler";
import { generateJwt } from "../utils/helpers";
import { response } from "../utils/response";
import environment from "../constants/environment";
import jwt from "jsonwebtoken";
import { User } from "src/types/User";

const redirectUri = environment.clientUrl;

export const handleGoogleCallback = expressAsyncHandler(async (req, res) => {
  const accessToken = generateJwt(
    { id: (req?.user as User).id },
    { type: "access" }
  );

  res.redirect(`${redirectUri}/auth/callback?at=${accessToken}`);
});

export const validateOAuthToken = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, environment.accessTokenSecret as string);
    response(res, 200, true, "OAuth token is valid");
  } catch (error) {
    response(res, 401, false, "Invalid OAuth token");
  }
});

export const logout = expressAsyncHandler(async (req, res) => {
  try {
    res.clearCookie("auth_token");

    response(res, 200, true, "Successfully logged out");
  } catch (err) {
    response(res, 400, false, "Failed to log out");
  }
});
