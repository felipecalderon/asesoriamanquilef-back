import { Router } from 'express'
import { imageUpload } from '../controllers/media.route'
import { upload } from '../multer.config'
const mediaRoute = Router()

mediaRoute.post('/', upload.single('image'), imageUpload)

export { mediaRoute }
