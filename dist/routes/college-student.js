"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/students", controllers_1.getCollegeStudents);
// Get the section where the specified student belongs to
router.get("/students/:studentId/section", controllers_1.getCollegeSectionByStudentId);
// Get the subjects the specified student is enrolled in
router.get("/students/:studentId/subjects", controllers_1.getCollegeSubjectsByStudentId);
// Get students enrolled in a specific subject and section
router.get("/students/section-subject/:sectionId/:subjectId", controllers_1.getCollegeStudentsBySubjectIdAndSectionId);
// Get student information by their ID type and ID
router.get("/students/:studentIdType/:studentId", controllers_1.getCollegeStudentByIdAndIdType);
router.get("/students/seed", controllers_1.seedCollegeStudents);
router.get("/students/truncate", controllers_1.truncateCollegeStudentsCollection);
exports.default = router;
