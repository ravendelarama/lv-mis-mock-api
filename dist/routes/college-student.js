"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("src/controllers");
const router = (0, express_1.Router)();
router.get('/students', controllers_1.getCollegeStudents);
exports.default = router;
