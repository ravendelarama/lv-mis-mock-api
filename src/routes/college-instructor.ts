import { Router } from "express";
import { getCollegeInstructorById, getCollegeInstructors } from "../controllers";

const router = Router();

router.get("/instructors", getCollegeInstructors);

router.get('/instructors/:instructorId', getCollegeInstructorById)

export default router;
