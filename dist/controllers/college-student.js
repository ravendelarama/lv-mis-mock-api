"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeStudentsBySubjectIdAndSectionId = exports.getCollegeSubjectsByStudentId = exports.getCollegeSectionByStudentId = exports.truncateCollegeStudentsCollection = exports.getCollegeStudentByIdAndIdType = exports.seedCollegeStudents = exports.getCollegeStudents = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
const response_1 = require("../utils/response");
const seeder_1 = require("../utils/seeder");
exports.getCollegeStudents = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        // TODO
        // reusable response utilities
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const data = await models_1.db.student.findMany({
            skip,
            take,
        });
        (0, response_1.response)(res, 200, true, null, data, {
            pagination: {
                page,
                take,
                skip,
                count: data.length,
            },
        });
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.seedCollegeStudents = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const count = req.query.count ? Number(req.query.count) : 1;
        const newCollegeStudents = await seeder_1.seed.student(count);
        const data = await models_1.db.student.createMany({
            data: newCollegeStudents,
        });
        (0, response_1.response)(res, 201, true, null, data);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeStudentByIdAndIdType = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { studentId, studentIdType } = req.params;
        if (!studentId || !studentIdType) {
            return (0, response_1.response)(res, 400, false, "Invalid request parameters. Contact dev team.", null);
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
                return (0, response_1.response)(res, 400, false, "Invalid request parameter 'studentIdType'. Must be 'id' or'schoolId'", null);
        }
        const student = await models_1.db.student.findFirst({ where: criterion });
        if (!student) {
            return (0, response_1.response)(res, 404, false, "Student not found", null);
        }
        (0, response_1.response)(res, 200, true, null, student);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.truncateCollegeStudentsCollection = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        await models_1.db.student.deleteMany({});
        (0, response_1.response)(res, 200, true, "Students collection truncated successfully", null);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeSectionByStudentId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            return (0, response_1.response)(res, 400, false, "Invalid request parameters. Contact dev team.", null);
        }
        const section = await models_1.db.collegeSection.findFirst({
            where: {
                students: {
                    some: {
                        studentId,
                    },
                },
            },
        });
        if (!section) {
            return (0, response_1.response)(res, 404, false, "Section not found", null);
        }
        (0, response_1.response)(res, 200, true, null, section);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeSubjectsByStudentId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { studentId } = req.params;
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        if (!studentId) {
            return (0, response_1.response)(res, 400, false, "Invalid request parameters. Contact dev team.", null);
        }
        const subjects = await models_1.db.collegeSubject.findMany({
            where: {
                students: {
                    some: {
                        studentId,
                    },
                },
            },
            skip,
            take,
        });
        (0, response_1.response)(res, 200, true, null, subjects);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeStudentsBySubjectIdAndSectionId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { subjectId, sectionId } = req.params;
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        if (!subjectId || !sectionId) {
            return (0, response_1.response)(res, 400, false, "Invalid parameters. Contact the dev team.", null);
        }
        const students = await models_1.db.student.findMany({
            where: {
                collegeSubjects: {
                    some: {
                        subjectId,
                    },
                },
                collegeSections: {
                    some: {
                        sectionId,
                    },
                },
            },
            skip,
            take,
        });
        (0, response_1.response)(res, 200, true, null, students);
    }
    catch (e) {
        console.log(e);
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
