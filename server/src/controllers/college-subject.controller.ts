import expressAsyncHandler from "express-async-handler";
import { db } from "../models";
import { response } from "../utils/response";
import { seed } from "../utils/seeder";

export const getCollegeSubjects = expressAsyncHandler(async (req, res) => {
  try {
    const take = req.query.take ? Number(req.query.take) : 10;
    const page = req.query.page ? Number(req.query.page) : 1;
    const skip = (page - 1) * take || 0;

    const subjects = await db.collegeSubject.findMany({
      skip,
      take,
    });

    response(
      res,
      200,
      true,
      null,
      { subjects },
      {
        pagination: {
          page,
          take,
          skip,
          count: subjects.length,
        },
      }
    );
  } catch {
    response(res, 500, false, "Internal Server Error", null);
  }
});

export const getCollegeSubjectById = expressAsyncHandler(async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await db.collegeSubject.findFirst({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      return response(res, 404, false, "Subject not found", null);
    }

    response(res, 200, true, null, { subject });
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

      const studentsTakingSubject = await db.student.findMany({
        where: {
          collegeSubjects: {
            some: {
              subjectId,
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
        { students: studentsTakingSubject },
        {
          pagination: {
            page,
            take,
            skip,
            count: studentsTakingSubject.length,
          },
        }
      );
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSectionsBySubjectId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { subjectId } = req.params;
      const take = req.query.take ? Number(req.query.take) : 10;
      const page = req.query.page ? Number(req.query.page) : 1;
      const skip = (page - 1) * take || 0;

      const sectionsTakingSubject = await db.collegeSection.findMany({
        where: {
          collegeSubjects: {
            some: {
              subjectId,
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
        { sections: sectionsTakingSubject },
        {
          pagination: {
            page,
            take,
            skip,
            count: sectionsTakingSubject.length,
          },
        }
      );
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeInstructorBySubjectId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { subjectId } = req.params;

      if (!subjectId) {
        return response(
          res,
          400,
          false,
          "Invalid request parameters. Contact dev team.",
          null
        );
      }

      const instructor = await db.instructor.findFirst({
        where: {
          subjects: {
            some: {
              subjectId,
            },
          },
        },
      });
      if (!instructor) {
        return response(
          res,
          404,
          false,
          "Instructor not found for the subject",
          null
        );
      }
      response(res, 200, true, null, { instructor });
    } catch (e) {
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);

export const getCollegeSubjectsByInstructorId = expressAsyncHandler(
  async (req, res) => {
    try {
      const { instructorId } = req.params;

      if (!instructorId) {
        return response(
          res,
          400,
          false,
          "Invalid request parameters. Contact dev team.",
          null
        );
      }

      //Wednesday, 10:30 AM - 12:00 PM | Ethics (ETH301)
      // Thursday, 8:30 AM - 10:00 AM | Ethics (ETH301)

      // const subjectsHandled = await db.collegeInstructorSubject.findMany({
      //   select: {
      //     id: true,
      //     schedule: true,
      //     startTime: true,
      //     endTime: true,
      //     subject: {
      //       select: {
      //         id: true,
      //         title: true,
      //         code: true,
      //         description: true,
      //         unit: true
      //       }
      //     }
      //   },
      //   where:{
      //     instructorId
      //   },
      // })

      //     Ethics (ETH301)
      // - Wednesday, 10:30 AM - 12:00 PM
      // - Thursday, 8:30 AM - 10:00 AM
      const subjectsHandled = await db.collegeSubject.findMany({
        where: {
          instructorSubjects: {
            some: {
              instructorId,
            },
          },
        },
        select: {
          id: true,
          title: true,
          code: true,
          description: true,
          unit: true,
          instructorSubjects: {
            select: {
              id: true,
              startTime: true,
              endTime: true,
              schedule: true,
            },
          },
        },
      });

      response(res, 200, true, null, { subjects: subjectsHandled });
    } catch (e) {
      console.log(e);
      response(res, 500, false, "Internal Server Error", null);
    }
  }
);
