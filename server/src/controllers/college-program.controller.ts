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