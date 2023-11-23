"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
const error_1 = require("../../error/error");
function apiError(err, req, res, _) {
    if (err instanceof error_1.APIError) {
        res.status(err.code).json({
            error: err.message,
            success: false,
            code: err.code,
            data: err.extra || {},
        });
        return;
    }
    res.status(400).json({ error: err.message, success: false, code: 400 });
}
exports.apiError = apiError;
