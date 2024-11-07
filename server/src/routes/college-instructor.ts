import { Router } from "express";
import { getCollegeInstructorById, getCollegeInstructors, getCollegeSubjectsByInstructorId } from "../controllers";

const router = Router();

router.get("/instructors", getCollegeInstructors);

// instructor
router.get('/instructors/:instructorId', getCollegeInstructorById)

// Get the subjects that the instructor handles
router.get('/instructors/:instructorId/subjects', getCollegeSubjectsByInstructorId)

export default router;
