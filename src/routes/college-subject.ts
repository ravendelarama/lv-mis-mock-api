import { Router } from "express";
import { getCollegeSectionsBySubjectId, getCollegeStudentsBySubjectId, getSubjectById, getSubjects } from "../controllers";

const router = Router();

router.get("/subjects", getSubjects);

router.get("/subjects/:subjectId", getSubjectById);

router.get('/subjects/:subjectId/students', getCollegeStudentsBySubjectId)

router.get('/subjects/:subjectId/sections', getCollegeSectionsBySubjectId)

export default router;
