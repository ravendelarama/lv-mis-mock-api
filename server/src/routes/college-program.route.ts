import { Router } from "express";
import { getCollegePrograms } from "../controllers/index.controller";

const router = Router();

router.get("/programs", getCollegePrograms)

router.post('/programs', (req, res) => {
    res.status(201).json({
        message: "Strand created successfully",
    });
})

export default router;
