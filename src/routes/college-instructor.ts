import { Router } from "express";
import { getCollegeInstructors } from "../controllers";

const router = Router();

router.get("/instructors", getCollegeInstructors);

export default router;
