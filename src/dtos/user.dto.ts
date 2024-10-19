import {UserDTOInterface} from "../interfaces/user.interface";
import {Types} from "mongoose";

class UserDTO {
    id: string | Types.ObjectId;
    username: string;
    role: string;
    banned: boolean;

    constructor(model: UserDTOInterface) {
        this.id = model._id!
        this.username = model.username
        this.role = model.role;
        this.banned = model.banned
    }
}

export default UserDTO