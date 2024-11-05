"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeInstructorBySubjectId = exports.getCollegeSectionsBySubjectId = exports.getCollegeStudentsBySubjectId = exports.getCollegeSubjectById = exports.getCollegeSubjects = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
const response_1 = require("../utils/response");
exports.getCollegeSubjects = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const data = await models_1.db.collegeSubject.findMany({
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
    catch {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeSubjectById = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { subjectId } = req.params;
        const data = await models_1.db.collegeSubject.findFirst({
            where: {
                id: subjectId,
            },
        });
        if (!data) {
            return (0, response_1.response)(res, 404, false, "Subject not found", null);
        }
        (0, response_1.response)(res, 200, true, null, data);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeStudentsBySubjectId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { subjectId } = req.params;
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const studentsTakingSubject = await models_1.db.student.findMany({
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
        (0, response_1.response)(res, 200, true, null, studentsTakingSubject, {
            pagination: {
                page,
                take,
                skip,
                count: studentsTakingSubject.length,
            },
        });
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeSectionsBySubjectId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { subjectId } = req.params;
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const sectionsTakingSubject = await models_1.db.collegeSection.findMany({
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
        (0, response_1.response)(res, 200, true, null, sectionsTakingSubject, {
            pagination: {
                page,
                take,
                skip,
                count: sectionsTakingSubject.length,
            },
        });
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeInstructorBySubjectId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { subjectId } = req.params;
        if (!subjectId) {
            return (0, response_1.response)(res, 400, false, "Invalid request parameters. Contact dev team.", null);
        }
        const data = await models_1.db.instructor.findFirst({
            where: {
                subjects: {
                    some: {
                        subjectId,
                    },
                },
            },
        });
        if (!data) {
            return (0, response_1.response)(res, 404, false, "Instructor not found for the subject", null);
        }
        (0, response_1.response)(res, 200, true, null, data);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
