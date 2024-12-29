import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middlware";
import { createUser, getSelf } from "../controllers/index.controller";

const router = Router();

router.get("/@me", isAuthenticated, getSelf);

router.post('/create', createUser)

export default router;
