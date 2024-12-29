import { Router } from "express";
import { getCollegeSectionById, getCollegeSections, getCollegeStudentsBySectionId } from "../controllers/index.controller";

const router = Router();

router.get("/sections", getCollegeSections)

router.get("/sections/:sectionId", getCollegeSectionById)

router.get('/sections/:sectionId/students', getCollegeStudentsBySectionId)

router.post('/sections', (req, res) => {
    res.status(201).json({
        message: "Strand created successfully",
    });
})

export default router;
