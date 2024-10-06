import { Router } from "express";
import {
  getCollegeInstructorBySubjectId,
  getCollegeSectionsBySubjectId,
  getCollegeStudentsBySubjectId,
  getCollegeSubjectById,
  getCollegeSubjects,
} from "../controllers";

const router = Router();

router.get("/subjects", getCollegeSubjects);

router.get("/subjects/:subjectId", getCollegeSubjectById);

// Get students who take a specific subject
router.get("/subjects/:subjectId/students", getCollegeStudentsBySubjectId);

// Get sections that take a specific subject
router.get("/subjects/:subjectId/sections", getCollegeSectionsBySubjectId);

// Get instructor who teaches a specific subject
router.get("/subjects/:subjectId/instructor", getCollegeInstructorBySubjectId);

export default router;
