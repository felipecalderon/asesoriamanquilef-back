import { cdn } from '../cdn.config'

export const uploadImageToCloudinary = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cdn.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}
