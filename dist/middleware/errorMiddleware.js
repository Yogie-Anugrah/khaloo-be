"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const responseError_1 = require("../error/responseError");
const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof responseError_1.ResponseError) {
        res
            .status(err.status)
            .json({
            error: err.message,
        })
            .end();
    }
    res
        .status(500)
        .json({ error: `Internal server error ${err}` })
        .end();
};
exports.errorMiddleware = errorMiddleware;
