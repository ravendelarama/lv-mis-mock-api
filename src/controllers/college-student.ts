import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { db } from "../models";

export const router = Router();

export const getCollegeStudents = expressAsyncHandler(async (req, res) => {
    try {
        // TODO
        // reusable response utilities

        const take = Number(req.query.take) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * take || 0;
        
        const data = await db.collegeStudent.findMany({
            skip,
            take
        });

        res.status(200).json({
            success: true,
            message: null,
            data,
            pagination: {
                page,
                take,
                skip,
            }
        });
    } catch {
        res.status(400).json({
            success: false,
            message: null,
            data: null,
        });
    }
});