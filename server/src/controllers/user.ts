import expressAsyncHandler from "express-async-handler";
import { response } from "../utils/response";

export const getSelf = expressAsyncHandler(async (req, res) => {
  response(res, 200, true, null, {
    user: req.user,
  });
});
