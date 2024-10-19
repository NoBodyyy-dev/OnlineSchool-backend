import {Types} from "mongoose";

export interface UserDTOInterface {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    username: string;
    role: string;
    banned: boolean;
}