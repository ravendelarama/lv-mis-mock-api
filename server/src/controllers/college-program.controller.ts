import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";

export const getCollegePrograms = expressAsyncHandler(async (req, res) => {
    try {
        const take = req.query.take ? Number(req.query.take): 10;
        const page = req.query.page ? Number(req.query.page): 1;
        const skip = (page - 1) * take || 0;

        const data = await db.collegeProgram.findMany({
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

export const getCollegeProgramById = expressAsyncHandler(async (req, res) => {
  try {
    const { programId } = req.params;
    const program = await db.collegeProgram.findFirst({
      where: {
        id: programId,
      },
    });

    if (!program) {
      return response(res, 404, false, "Program not found", null);
    }

    response(res, 200, true, null, { program });
  } catch (e) {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeStudentsByProgramId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { programId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      const studentsEnrolledInProgram = await db.student.findMany({
        where: {
          programs: {
            some: {
              programId,
            },
          },
        },
        skip,
        take,
      });

      response(res, 200, true, null, { students: studentsEnrolledInProgram}, {
        pagination: {
          page,
          take,
          skip,
          count: studentsEnrolledInProgram.length,
        },
      });
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSectionsByProgramId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { programId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      const sectionsUnderProgram = await db.collegeSection.findMany({
        where: {
          program: {
            id: programId,
          },
        },
        skip,
        take,
      });

      response(res, 200, true, null, { sections: sectionsUnderProgram }, {
        pagination: {
          page,
          take,
          skip,
          count: sectionsUnderProgram.length,
        },
      });
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);