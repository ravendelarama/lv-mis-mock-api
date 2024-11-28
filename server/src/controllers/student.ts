import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";


export const getStudentInformationBySchoolId = expressAsyncHandler(async (req, res) => {
  try {
    const { schoolId } = req.params

    const student = await db.student.findFirst({
        where: {
            schoolId
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