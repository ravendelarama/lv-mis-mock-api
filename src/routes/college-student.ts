import { Router } from "express";
import {
  getCollegeStudentByIdAndIdType,
  getCollegeStudents,
  seedCollegeStudents,
} from "../controllers";

const router = Router();

router.get("/students", getCollegeStudents);
router.get("/students/:idType/:id", getCollegeStudentByIdAndIdType);
router.get("/students/seed", seedCollegeStudents);

export default router;
