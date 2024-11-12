import expressAsyncHandler from "express-async-handler";
import { generateJwt } from "../utils/helpers";
import { response } from "../utils/response";
import environment from "../constants/environment";

const redirectUri = environment.clientUrl

export const handleGoogleCallback = expressAsyncHandler(async (req, res) => {
  const authToken = generateJwt(
    { id: (req?.user as { id: string }).id },
    { type: "access" }
  );

  res.cookie("auth_token", authToken, {
    httpOnly: true,
    secure: environment.isProd ? true : false,
    sameSite: environment.isProd ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.redirect(`${redirectUri}`);
});

export const logout = expressAsyncHandler(async (req, res) => {
  try {
    res.clearCookie("auth_token");

    response(res, 200, true, "Successfully logged out");
  } catch (err) {
    response(res, 400, false, "Failed to log out");
  }
});
