import { Router } from 'express';
import {signUpFunc} from "../controllers/auth.controller";
import {check} from "express-validator";

const authRouter = Router();

// POST
authRouter.post('/signUp', [
    check("username", "Username length must be from 3 to 15").trim().isLength({ min: 3, max: 15 }),
    check("phone", "Invalid phone number").trim().isMobilePhone(["ru-RU", "uk-UA", "kk-KZ", "be-BY"]),
    check("password", "Password must be from 10 to 25").trim().isLength({min: 10, max: 25})
], signUpFunc);

// GET

// PUT

// DELETE

export default authRouter;