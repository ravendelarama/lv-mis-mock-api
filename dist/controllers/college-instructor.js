"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeSubjectsByInstructorId = exports.getCollegeInstructorById = exports.getCollegeInstructors = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
const response_1 = require("../utils/response");
exports.getCollegeInstructors = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const data = await models_1.db.instructor.findMany({
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
exports.getCollegeInstructorById = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { instructorId } = req.params;
        if (!instructorId) {
            return (0, response_1.response)(res, 400, false, "Invalid request parameters", null);
        }
        const data = await models_1.db.instructor.findUnique({
            where: { id: instructorId },
        });
        if (!data) {
            return (0, response_1.response)(res, 404, false, "Instructor not found", null);
        }
        (0, response_1.response)(res, 200, true, null, data);
    }
    catch (e) {
        (0, response_1.response)(res, 500, false, "Internal Server Error", null);
    }
});
exports.getCollegeSubjectsByInstructorId = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { instructorId } = req.params;
        const take = req.query.take ? Number(req.query.take) : 10;
        const page = req.query.page ? Number(req.query.page) : 1;
        const skip = (page - 1) * take || 0;
        const data = await models_1.db.collegeSubject.findMany({
            where: {
                instructorSubjects: {
                    some: {
                        instructorId,
                    },
                },
            },
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
