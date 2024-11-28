import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";

export const getStrands = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const strands = await db.strand.findMany({
      skip,
      take,
    });

    response(res, 200, true, null, { strands }, {
      pagination: {
        page,
        take,
        skip,
        count: strands.length,
      },
    });
  } catch (error) {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const createStrand = expressAsyncHandler(async(req, res) => {
    try {
        const { title, shortTitle, description } = req.body

        const newStrand = await db.strand.create({
            data: {
                title, 
                shortTitle,
                description,
            },
        });
        response(res, 201, true, "Strand created successfully", { strand: newStrand });
    } catch (error) {
        response(res, 500, false, "Internal Server Error", null);
    }
})