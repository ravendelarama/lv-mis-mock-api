import { Router } from "express";
import {
  getCollegeStudentByIdAndIdType,
  getCollegeStudents,
  getCollegeSectionByStudentId,
  seedCollegeStudents,
  truncateCollegeStudentsCollection,
  getCollegeSubjectsByStudentId,
} from "../controllers";

const router = Router();

router.get("/students", getCollegeStudents);

router.get("/students/:studentId/section", getCollegeSectionByStudentId);

router.get("/students/:studentId/subjects", getCollegeSubjectsByStudentId);

router.get(
  "/students/:studentIdType/:studentId",
  getCollegeStudentByIdAndIdType
);

router.get("/students/seed", seedCollegeStudents);

router.get("/students/truncate", truncateCollegeStudentsCollection);

export default router;
