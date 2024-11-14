import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middlware";
import { getSelf } from "../controllers";

const router = Router();

router.get("/@me", isAuthenticated, getSelf);

export default router;
