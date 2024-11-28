import { Router } from "express";
import { getStrands } from "../controllers";

const router = Router();

router.get("/", getStrands)

export default router;
