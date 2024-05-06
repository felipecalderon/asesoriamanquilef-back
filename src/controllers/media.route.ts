import { Request, Response } from 'express'
import { uploadImageToCloudinary } from '../utils/imageToCDN'

export const imageUpload = async (req: Request, res: Response) => {
  // req file solo funciona si se le pasa el middleware de multer en la ruta
  const { file } = req
  if (!file) {
    return res.status(200).json({
      message: null,
      error: 'Es necesario una imagen',
      data: null,
    })
  }
  const uploadfile = await uploadImageToCloudinary(file.buffer)
  return res.json(uploadfile)
}
