"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = response;
function response(res, code = 200, success, message, data, others) {
    res.status(code).json({
        success,
        message,
        data,
        ...others
    });
}
