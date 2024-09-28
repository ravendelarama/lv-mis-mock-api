import expressAsyncHandler from "express-async-handler";
import { db } from "../models";

export const getCollegePrograms = expressAsyncHandler(async (req, res) => {
    try {
        const take = req.query.take ? Number(req.query.take): 10;
        const page = req.query.page ? Number(req.query.page): 1;
        const skip = (page - 1) * take || 0;

        const data = await db.collegeProgram.findMany({
            skip,
            take
        });
        
        res.status(200).json({
            success: true,
            message: null,
            data,
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null
        })
    }
});