import { Router } from 'express'
import { authRoute } from './auth'
import { chatRoute } from './chats'
import { postsRoute } from './post.route'
import { mediaRoute } from './media.route'
const ruta = Router()

ruta.use('/chat', chatRoute)
ruta.use('/auth', authRoute)
ruta.use('/post', postsRoute)
ruta.use('/media', mediaRoute)

export default ruta
