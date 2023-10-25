"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload1 = exports.upload_stream = void 0;
const http_status_codes_1 = require("http-status-codes");
const sharp_1 = __importDefault(require("sharp"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const multer = require('multer');
const upload_stream = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        console.log('slkslsllslsls');
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "Image required", code: http_status_codes_1.StatusCodes.BAD_REQUEST });
    }
    console.log('slslenter');
    // const supportedResourceTypes = ['image', 'raw', 'video'];
    // const fileExtension = req.file.originalname.split('.').pop(); // Extract the file extension
    // // Check if the file extension is valid for the supported resource types
    // const resourceType = supportedResourceTypes.includes(fileExtension) ? fileExtension : 'image';
    const buffer = yield (0, sharp_1.default)(req.file.buffer)
        .resize(200, 200)
        .toBuffer();
    cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        public_id: 'desired_public_id', // Specify the desired public ID for the image
    }, (error, result) => {
        if (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error, code: http_status_codes_1.StatusCodes.BAD_REQUEST });
        }
        else {
            const details = {
                image: [
                    {
                        path: result.secure_url
                    }
                ]
            };
            req.files = details;
            next();
            return;
        }
    }).end(buffer);
});
exports.upload_stream = upload_stream;
const upload1 = multer();
exports.upload1 = upload1;
