import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/responseError";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof ResponseError) {
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