import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";
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

        response(res, 200, true, null, data, {
            pagination: {
                page,
                take,
                skip,
                count: data.length
            }
        });
    } catch {
        response(res, 500, false, "Internal Server Error", null);
    }
});

export const seedCollegeStudents = expressAsyncHandler(async (req, res) => {
    try {
        const count = req.query.count ? Number(req.query.count): 1;
        const newCollegeStudents = await seed.student(count);

        const data = await db.collegeStudent.createMany({
            data: newCollegeStudents
        });

        response(res, 201, true, null, data);
    } catch(e) {
        response(res, 500, false, "Internal Server Error", null);
    }
})