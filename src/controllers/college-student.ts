import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { seed } from "../utils/seeder";

export const router = Router();

export const getCollegeStudents = expressAsyncHandler(async (req, res) => {
    try {
        // TODO
        // reusable response utilities

        const take = req.query.take ? Number(req.query.take): 10;
        const page = req.query.page ? Number(req.query.page): 1;
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
    } catch(e) {
        res.status(400).json({
            success: false,
            message: null,
            // @ts-ignore
            data: e.message,
        });
    }
});

export const seedCollegeStudents = expressAsyncHandler(async (req, res) => {
    try {
        const count = req.query.count ? Number(req.query.count): 1;
        const newCollegeStudents = await seed.student(count);

        const data = await db.collegeStudent.createMany({
            data: newCollegeStudents
        });

        res.status(201).json({
            success: true,
            message: null,
            data
        });
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
})