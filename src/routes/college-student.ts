import { Router } from "express";
import {
  getCollegeStudentByIdAndIdType,
  getCollegeStudents,
  seedCollegeStudents,
  truncateCollegeStudentsCollection,
} from "../controllers";

const router = Router();

router.get("/students", getCollegeStudents);
router.get("/students/:idType/:id", getCollegeStudentByIdAndIdType);
router.get("/students/seed", seedCollegeStudents);
router.get("/students/truncate", truncateCollegeStudentsCollection);

export default router;
