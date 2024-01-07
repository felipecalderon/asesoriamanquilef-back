import { mediaRoute } from "./media";
import { chatRoute } from "./chats";
import { Router } from "express";

const ruta = Router()

ruta.use(chatRoute)
ruta.use(mediaRoute)

export default ruta