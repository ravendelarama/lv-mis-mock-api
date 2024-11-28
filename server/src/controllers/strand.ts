import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";

export const getStrands = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const data = await db.strand.findMany({
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
  } catch (error) {
    response(res, 500, false, "Internal Server Error", null);
  }
});
