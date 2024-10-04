import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";
import { seed } from "../utils/seeder";

export const getSubjects = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const data = await db.collegeSubject.findMany({
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
  } catch {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getSubjectById = expressAsyncHandler(async (req, res) => {
  try {
    const { subjectId } = req.params;
    const data = await db.collegeSubject.findFirst({
      where: {
        id: subjectId,
      },
    });

    if (!data) {
      return response(res, 404, false, "Subject not found", null);
    }

    response(res, 200, true, null, data);
  } catch (e) {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeStudentsBySubjectId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { subjectId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      const studentsTakingSubject = await db.collegeStudent.findMany({
        where: {
          studentSubjects: {
            some: {
              subjectId,
            },
          },
        },
        skip,
        take,
      });

      response(res, 200, true, null, studentsTakingSubject, {
        pagination: {
          page,
          take,
          skip,
          count: studentsTakingSubject.length,
        },
      });
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);
