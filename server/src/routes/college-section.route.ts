import { Router } from "express";
import { getCollegeSections } from "../controllers/index.controller";

const router = Router();

router.get("/sections", getCollegeSections)

// router.get("/sections/:sectionId", )

router.post('/sections', (req, res) => {
    res.status(201).json({
        message: "Strand created successfully",
    });
})

export default router;
