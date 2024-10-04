import { Router } from "express";
import { getCollegeStudentsBySubjectId, getSubjectById, getSubjects } from "../controllers";

const router = Router();

router.get("/subjects", getSubjects);

router.get("/subjects/:subjectId", getSubjectById);

router.get('/subjects/:subjectId/students', getCollegeStudentsBySubjectId)

export default router;
