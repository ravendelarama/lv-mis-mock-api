"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = exports.collegeInstructorRouter = exports.collegeSubjectRouter = exports.collegeStudentRouter = void 0;
const college_student_1 = __importDefault(require("./college-student"));
exports.collegeStudentRouter = college_student_1.default;
const college_subject_1 = __importDefault(require("./college-subject"));
exports.collegeSubjectRouter = college_subject_1.default;
const college_instructor_1 = __importDefault(require("./college-instructor"));
exports.collegeInstructorRouter = college_instructor_1.default;
const webhook_1 = __importDefault(require("./webhook"));
exports.webhookRouter = webhook_1.default;
