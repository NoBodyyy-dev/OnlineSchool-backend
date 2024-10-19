import {Schema, model} from "mongoose";

const User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    role: {type: String, enum: ["user", "admin", "main-admin", "creator"], default: "user"},
    purchasedCourses: {type: Array(Schema.Types.ObjectId), ref: "Course"},
    coursesOwner: {type: Array(Schema.Types.ObjectId), ref: "CoursesOwner", required: false},
    banned: {type: Boolean, default: false},
}, {timestamps: true})

export default model("User", User)