import { Response } from "express";

export function response(res: Response, code = 200, success: boolean, message: string | null, data?: any | null, others?: any | null) {
    res.status(code).json({
        success,
        message,
        data,
        ...others
    });
}