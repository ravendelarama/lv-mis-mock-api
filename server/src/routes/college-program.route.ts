import { Router } from "express";
import { getCollegeProgramById, getCollegePrograms } from "../controllers/index.controller";

const router = Router();

router.get("/programs", getCollegePrograms)

router.get("/programs/:programId", getCollegeProgramById)

router.post('/programs', (req, res) => {
    res.status(201).json({
        message: "Strand created successfully",
    });
})

export default router;
