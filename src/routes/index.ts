import { authRoute } from "./auth";
import { chatRoute } from "./chats";
import { Router } from "express";

const ruta = Router()

ruta.use('/chat', chatRoute)
ruta.use('/auth', authRoute)

export default ruta