import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";
import { seed } from "../utils/seeder";

export const getCollegeStudents = expressAsyncHandler(async (req, res) => {
  try {
    // TODO
    // reusable response utilities

    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const data = await db.collegeStudent.findMany({
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
});

export const seedCollegeStudents = expressAsyncHandler(async (req, res) => {
  try {
    const count = req.query.count ? Number(req.query.count) : 1;
    const newCollegeStudents = await seed.student(count);

    const data = await db.collegeStudent.createMany({
      data: newCollegeStudents,
    });

    response(res, 201, true, null, data);
  } catch (e) {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeStudentByIdAndIdType = expressAsyncHandler(
  async (req, res) => {
    try {
      const { studentId, studentIdType } = req.params;
      if (!studentId || !studentIdType) {
        return response(
          res,
          400,
          false,
          "Invalid request parameters. Contact dev team.",
          null
        );
      }

      let criterion;

      switch (studentIdType) {
        case "id":
          criterion = { id: studentId };
          break;
        case "schoolId":
          criterion = {
            schoolId: studentId,
          };
          break;
        default:
          return response(
            res,
            400,
            false,
            "Invalid request parameter 'studentIdType'. Must be 'id' or'schoolId'",
            null
          );
      }

      const student = await db.collegeStudent.findFirst({ where: criterion });

      if (!student) {
        return response(res, 404, false, "Student not found", null);
      }

      response(res, 200, true, null, student);
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const truncateCollegeStudentsCollection = expressAsyncHandler(
  async (req, res) => {
    try {
      await db.collegeStudent.deleteMany({});
      response(
        res,
        200,
        true,
        "Students collection truncated successfully",
        null
      );
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSectionByStudentId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        return response(
          res,
          400,
          false,
          "Invalid request parameters. Contact dev team.",
          null
        );
      }
      const section = await db.collegeSection.findFirst({
        where: {
          studentSections: {
            some: {
              studentId,
            },
          },
        },
      });
      if (!section) {
        return response(res, 404, false, "Section not found", null);
      }

      response(res, 200, true, null, section);
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSubjectsByStudentId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      if (!studentId) {
        return response(
          res,
          400,
          false,
          "Invalid request parameters. Contact dev team.",
          null
        );
      }
      const subjects = await db.collegeSubject.findMany({
        where: {
          studentSubjects: {
            some: {
              studentId,
            },
          },
        },
        skip,
        take,
      });
      response(res, 200, true, null, subjects);
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeStudentsBySubjectIdAndSectionId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { subjectId, sectionId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      if (!subjectId || !sectionId) {
        return response(
          res,
          400,
          false,
          "Invalid parameters. Contact the dev team.",
          null
        );
      }

      const students = await db.collegeStudent.findMany({
        where: {
          studentSubjects: {
            some: {
              subjectId,
            },
          },
          studentSections: {
            some: {
              sectionId,
            },
          },
        },
        skip,
        take,
      });
      response(res, 200, true, null, students);
    } catch (e) {
      console.log(e)
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);
