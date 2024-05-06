import { Router } from 'express'
import {
  createPost,
  deletePost,
  editPost,
  getPosts,
} from '../controllers/post.controller'

const postsRoute = Router()

postsRoute.get('/', getPosts)
postsRoute.post('/', createPost)
postsRoute.put('/', editPost)
postsRoute.delete('/', deletePost)

export { postsRoute }
