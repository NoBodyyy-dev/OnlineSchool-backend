import {Request, Response, NextFunction} from "express";
import APIError from "../utils/errors";

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof APIError) return res.status(error.status).json({message: error.message, error: error.errors});
    return next(APIError.ServerError(error));
}

export default errorMiddleware;