import expressAsyncHandler from "express-async-handler";
import { generateJwt } from "../utils/helpers";
import { response } from "../utils/response";

const redirectUri =
  process.env.NODE_ENV !== "production"
    ? process.env.DEV_CLIENT_URL
    : process.env.PROD_CLIENT_URL;

export const handleGoogleCallback = expressAsyncHandler(async (req, res) => {
  const authToken = generateJwt(
    { id: (req?.user as { id: string }).id },
    { type: "access" }
  );

  res.cookie("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 1000,
  });

  res.redirect(`${redirectUri}`);
});

export const logout = expressAsyncHandler(async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 0,
    });

    response(res, 200, true, "Successfully logged out");
  } catch (err) {
    response(res, 400, false, "Failed to log out");
  }
});
