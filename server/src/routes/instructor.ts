import { Router } from "express";
import { createInstructor} from "../controllers";

const router = Router();

// router.get("/", getCollegeInstructors);

// router.get('/:instructorId', getCollegeInstructorById)

// // Get the subjects that the instructor handles
// router.get('/:instructorId/subjects', getCollegeSubjectsByInstructorId)


router.post('/create', createInstructor)

export default router;
