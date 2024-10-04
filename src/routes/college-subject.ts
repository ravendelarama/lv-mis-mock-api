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

router.get("/subjects/:subjectId/students", getCollegeStudentsBySubjectId);

router.get("/subjects/:subjectId/sections", getCollegeSectionsBySubjectId);

router.get("/subjects/:subjectId/instructor", getCollegeInstructorBySubjectId);

export default router;
