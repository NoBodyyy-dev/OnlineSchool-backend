import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator"
import APIError from "./errors";
const {REFRESH_LIVE} = process.env

export const maxRefreshTokenAge = Number(REFRESH_LIVE!.replace("d", "")) * 24 * 60 * 60 * 1000;

export const catchErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(APIError.BadRequests("Ошибка валидации", errors.array()));
    next();
};
