import {Request, Response, NextFunction} from "express";
import * as bcrypt from "bcrypt"
import {catchErrors, maxRefreshTokenAge} from "../utils/util";
import User from "../models/User.model";
import APIError from "../utils/errors";
import UserDto from "../dtos/user.dto";
import {generateToken, saveToken} from "../utils/jwt"

export const signUpFunc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await catchErrors(req, res, next);

        const {username, password, phone} = req.body;
        const findUserByPhone = await User.findOne({phone: phone})
        if (findUserByPhone?._id) return next(APIError.BadRequests("Пользователь с таким номером телефона уже зарегистрирован"))

        const hashPassword = bcrypt.hashSync(password, 8);
        const newUser = new User({
            username: username,
            password: hashPassword,
            phone: phone,
        })

        const userDto = new UserDto(newUser)
        const tokens = generateToken({...userDto})
        await saveToken(userDto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true})

        return res.json(tokens)
    } catch (e) {
        next(e)
    }
}

export const loginFunc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await catchErrors(req, res, next);

        const {phone, password} = req.body;
        const findUserByPhone = await User.findOne({phone: phone})
        if (!findUserByPhone?._id) return next(APIError.NotFound("User not found"))
        if (password === findUserByPhone!.password) {
            const userDto = new UserDto(findUserByPhone)
            const tokens = generateToken({...userDto})
            await saveToken(userDto.id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: maxRefreshTokenAge, httpOnly: true})

            return res.json(tokens)
        } else return next(APIError.BadRequests("Wrong password! Try again!"))
    } catch (e) {
        next(e)
    }
}