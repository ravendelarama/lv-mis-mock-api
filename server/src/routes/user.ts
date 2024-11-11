import { Router } from "express";
import { response } from "../utils/response";
import { isAuthenticated } from "../middlewares/auth-middlware";

const router = Router();

router.get("/@me", isAuthenticated ,(req, res) => {
  response(res, 200, true, null, {
    user: {
        name: 'test name'
    }
  })
});

export default router;
