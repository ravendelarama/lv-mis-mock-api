import { Router } from "express";
import { getCollegeSectionById, getCollegeSections } from "../controllers/index.controller";

const router = Router();

router.get("/sections", getCollegeSections)

router.get("/sections/:sectionId", getCollegeSectionById)

router.post('/sections', (req, res) => {
    res.status(201).json({
        message: "Strand created successfully",
    });
})

export default router;
