import { Router } from "express";
import { createInstructor, getCollegeSubjectsByInstructorId} from "../controllers/index.controller";

const router = Router();

// router.get("/", getCollegeInstructors);

// router.get('/:instructorId', getCollegeInstructorById)

// // Get the subjects that the instructor handles
// router.get('/:instructorId/subjects', getCollegeSubjectsByInstructorId)


router.post('/create', createInstructor)

router.get('/:instructorId/subjects', getCollegeSubjectsByInstructorId)

export default router;
