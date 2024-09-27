import { Router } from "express";
import { getCollegeStudents } from "../controllers";

const router = Router();

router.get('/students', getCollegeStudents);


export default router;