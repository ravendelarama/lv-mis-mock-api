import { Router } from "express";
import {
  getCollegeStudentByIdAndIdType,
  getCollegeStudents,
  getSectionByStudentId,
  seedCollegeStudents,
  truncateCollegeStudentsCollection,
} from "../controllers";

const router = Router();

router.get("/students", getCollegeStudents);

router.get("/students/:studentId/section", getSectionByStudentId);

router.get(
  "/students/:studentIdType/:studentId",
  getCollegeStudentByIdAndIdType
);

router.get("/students/seed", seedCollegeStudents);

router.get("/students/truncate", truncateCollegeStudentsCollection);

export default router;
