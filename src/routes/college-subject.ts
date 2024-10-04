import { Router } from "express";
import { getSubjectById, getSubjects } from "../controllers";

const router = Router();

router.get("/subjects", getSubjects);

router.get("/subjects/:subjectId", getSubjectById);

export default router;
