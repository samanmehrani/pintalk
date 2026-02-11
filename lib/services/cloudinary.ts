import multer from "multer"
import { v2 as cloudinary } from "cloudinary"

// @ts-ignore
import { CloudinaryStorage } from "multer-storage-cloudinary"

interface CloudinaryStorageParams {
  folder: string
  allowed_formats: string[]
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const createUploader = (folder: string) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      } as CloudinaryStorageParams,
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  })

export { cloudinary }