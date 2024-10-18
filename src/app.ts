require('dotenv').config();
import * as mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./socket/socket";
import errorMiddleware from "./middlewares/error.middleware";
import router from "./routes/router";

const {CLIENT_URL, DB_URL, PORT} = process.env

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// @ts-ignore
app.use(errorMiddleware);
app.use("/api", router);

const run = async () => {
    try {
        await mongoose.connect(DB_URL!);
        server.listen(PORT);
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    } catch (e) {
        console.log(e);
    }
}

run().catch(console.log);