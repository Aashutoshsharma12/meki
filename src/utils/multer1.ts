import { StatusCodes } from "http-status-codes";
import { NextFunction } from "express";
import { CustomError } from "./errors";
import sharp from "sharp";

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const multer = require('multer');

const upload_stream = async (req: any, res: any, next: NextFunction) => {
    if (!req.file) {
        console.log('slkslsllslsls')
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Image required", code: StatusCodes.BAD_REQUEST })

    }
    console.log('slslenter')

    // const supportedResourceTypes = ['image', 'raw', 'video'];
    // const fileExtension = req.file.originalname.split('.').pop(); // Extract the file extension

    // // Check if the file extension is valid for the supported resource types
    // const resourceType = supportedResourceTypes.includes(fileExtension) ? fileExtension : 'image';
    const buffer = await sharp(req.file.buffer)
        .resize(200, 200)
        .toBuffer()
    cloudinary.uploader.upload_stream(
        {
            resource_type: 'auto', // Specify the resource type (image, video,raw (for pdf) etc.)
            public_id: 'desired_public_id', // Specify the desired public ID for the image
        },
        (error: any, result: any) => {
            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: error, code: StatusCodes.BAD_REQUEST })
            } else {
                const details =
                {
                    image: [
                        {
                            path: result.secure_url
                        }
                    ]
                }

                req.files = details
                next()
                return;
            }
        }
    ).end(buffer);
}
const upload1 = multer()

export {
    upload_stream,
    upload1
}
