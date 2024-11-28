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

export const createStudentInformation = expressAsyncHandler(async (req, res) => {
  try {
    const { userId, schoolId, firstName, middleName, lastName, educationType, sex } = req.body

    const user = await db.users.findFirst({
      where: { id: userId },
    })

    if (!user){
      return response(res, 404, false, "User not found", null)
    }

    const imageUrl = `https://placehold.co/600x400?text=${user.username}`

    const newStudentInformation = await db.student.create({
      data: {
        userId,
        schoolId,
        firstName,
        middleName,
        lastName,
        imageUrl,
        email: user.email,
        educationType,
        sex,
      }
    })

    response(res, 201, true, null, { student: newStudentInformation })

  } catch (err) {
    response(res, 500, false, "Internal Server Error")
  }
})