import {Schema, model} from "mongoose";

const Token = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true},
});

export default model("Role", Token)