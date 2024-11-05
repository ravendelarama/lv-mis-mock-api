"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/subjects", controllers_1.getCollegeSubjects);
router.get("/subjects/:subjectId", controllers_1.getCollegeSubjectById);
// Get students who take a specific subject
router.get("/subjects/:subjectId/students", controllers_1.getCollegeStudentsBySubjectId);
// Get sections that take a specific subject
router.get("/subjects/:subjectId/sections", controllers_1.getCollegeSectionsBySubjectId);
// Get instructor who teaches a specific subject
router.get("/subjects/:subjectId/instructor", controllers_1.getCollegeInstructorBySubjectId);
exports.default = router;
