import express from "express"
import * as http from "node:http";
import {Server} from "socket.io";

export const app = express()
const {CLIENT_URL} = process.env

export const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true
    }
})
