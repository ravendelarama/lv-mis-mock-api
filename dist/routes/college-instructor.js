"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/instructors", controllers_1.getCollegeInstructors);
router.get('/instructors/:instructorId', controllers_1.getCollegeInstructorById);
// Get the subjects that the instructor handles
router.get('/instructors/:instructorId/subjects', controllers_1.getCollegeSubjectsByInstructorId);
exports.default = router;
