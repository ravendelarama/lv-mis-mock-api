import { Router } from "express";
import { getCollegeStudents, seedCollegeStudents } from "../controllers";

const router = Router();

router.get('/students', getCollegeStudents);
router.post('/students/seed', seedCollegeStudents);


export default router;