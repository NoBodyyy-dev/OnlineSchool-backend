import {UserDTOInterface} from "../interfaces/user.interface";
import {Types} from "mongoose";
import jwt from "jsonwebtoken";
import Token from "../models/Token.model";
const {ACCESS_SECRET, ACCESS_LIVE, REFRESH_SECRET, REFRESH_LIVE} = process.env

export const generateToken = (payload: UserDTOInterface) => {
    const accessToken = jwt.sign(payload, ACCESS_SECRET!, {expiresIn: ACCESS_LIVE})
    const refreshToken = jwt.sign(payload, REFRESH_SECRET!, {expiresIn: REFRESH_LIVE})

    return {accessToken, refreshToken}
}

export const saveToken = async (userId: string | Types.ObjectId, refreshToken: string) => {
    const tokenData = await Token.findOne({userId: userId})
    if (tokenData) {
        tokenData.token = refreshToken
        return tokenData.save()
    }

    return await Token.create({userId, refreshToken});
}

export const removeToken = async (refreshToken: string) => {
    return Token.deleteOne({refreshToken});
}

export const validateAccessToken = async (token: string) => {
    try {
        return jwt.verify(token, ACCESS_SECRET!)
    } catch (e) {
        return null
    }
}

export const validateRefreshToken = async (token: string) => {
    try {
        return jwt.verify(token, REFRESH_SECRET!)
    } catch (e) {
        return null;
    }
}

export const findToken = async (refreshToken: string) => {
    return Token.findOne({refreshToken: refreshToken})
}
