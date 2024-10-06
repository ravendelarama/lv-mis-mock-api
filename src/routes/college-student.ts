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

// Get the section where the specified student belongs to
router.get("/students/:studentId/section", getCollegeSectionByStudentId);

// Get the subjects the specified student is enrolled in
router.get("/students/:studentId/subjects", getCollegeSubjectsByStudentId);

// Get student information by their ID type and ID
router.get(
  "/students/:studentIdType/:studentId",
  getCollegeStudentByIdAndIdType
);

router.get("/students/seed", seedCollegeStudents);

router.get("/students/truncate", truncateCollegeStudentsCollection);

export default router;
