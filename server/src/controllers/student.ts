import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";


export const getStudentById = expressAsyncHandler(async (req, res) => {
  try {
    const { studentId } = req.params

    const student = await db.student.findFirst({
        where: {
            schoolId: studentId
        }
    })

    if (!student){
        return response(res, 404, false, "Student not found")
    }

    response(res, 200, true, null, { student })
  } catch (err) {
    response(res, 500, false, "Internal Server Error")
  }
})