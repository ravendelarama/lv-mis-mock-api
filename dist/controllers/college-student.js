"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollegeStudents = exports.router = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
exports.router = (0, express_1.Router)();
exports.getCollegeStudents = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        // TODO
        // reusable response utilities
        const take = Number(req.query.take) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * take || 0;
        const data = await models_1.db.collegeStudent.findMany({
            skip,
            take
        });
        res.status(200).json({
            success: true,
            message: null,
            data,
            pagination: {
                page,
                take,
                skip,
            }
        });
    }
    catch {
        res.status(400).json({
            success: false,
            message: null,
            data: null,
        });
    }
});
