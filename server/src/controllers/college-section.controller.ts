import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";

export const getCollegeSections = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const data = await db.collegeSection.findMany({
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

export const getCollegeSectionById = expressAsyncHandler(async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await db.collegeSection.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      return response(res, 404, false, "Section not found", null);
    }

    response(res, 200, true, null, { section });
  } catch (e) {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeStudentsBySectionId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { sectionId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      const studentsUnderSection = await db.student.findMany({
        where: {
          collegeSections: {
            some: {
              sectionId,
            },
          },
        },
        skip,
        take,
      });

      response(
        res,
        200,
        true,
        null,
        { students: studentsUnderSection },
        {
          pagination: {
            page,
            take,
            skip,
            count: studentsUnderSection.length,
          },
        }
      );
    } catch (e) {
      console.log(e);
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);
