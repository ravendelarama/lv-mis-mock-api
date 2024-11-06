import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";

export const getCollegeInstructors = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;
    const data = await db.instructor.findMany({
      skip,
      take,
    });
    response(res, 200, true, null, data, {
      pagination: {
        page,
        take,
        skip,
        count: data.length,
      },
    });
  } catch (e) {
    console.log(e);
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeInstructorById = expressAsyncHandler(
  async (req, res) => {
    try {
      const { instructorId } = req.params;
      if (!instructorId) {
        return response(res, 400, false, "Invalid request parameters", null);
      }

      const data = await db.instructor.findUnique({
        where: { id: instructorId },
      });

      if (!data) {
        return response(res, 404, false, "Instructor not found", null);
      }
      response(res, 200, true, null, data);
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSubjectsByInstructorId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { instructorId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;
      const data = await db.collegeSubject.findMany({
        where: {
          instructorSubjects: {
            some: {
              instructorId,
            },
          },
        },
        skip,
        take,
      });
      response(res, 200, true, null, data, {
        pagination: {
          page,
          take,
          skip,
          count: data.length,
        },
      });
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);
