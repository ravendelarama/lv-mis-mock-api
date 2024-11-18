import expressAsyncHandler from "express-async-handler";
import { response } from "../utils/response";
import { db } from "../models";
import { generateRandomGoogleId } from "../utils/helpers";

export const getSelf = expressAsyncHandler(async (req, res) => {
  response(res, 200, true, null, {
    user: req.user,
  });
});

export const createUser = expressAsyncHandler(async (req, res) => {
  const { email } = req.body

  const username = email.split('@')[0]
  const googleId = await generateRandomGoogleId(20)

  try {
    const newUser = await db.users.create({
      data: {
        googleId,
        username,
        email,
        hasPassword: false,
        role: "student",
      }
    })

    response(res, 201, true, "User created", {user: newUser});
  } catch (err) {
    console.log(err, 'LINE-25-USER-CONTROLLER')
    response(res, 500, false, "Internal Server Error")
  }
})
