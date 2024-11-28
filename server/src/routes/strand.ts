import { Router } from "express";
import { createStrand, getStrands } from "../controllers";

const router = Router();

router.get("/", getStrands)

router.post('/', createStrand)

export default router;
