import { Router } from "express";
import { getSubjects } from "../controllers";

const router = Router();

router.get("/subjects", getSubjects);

export default router;
