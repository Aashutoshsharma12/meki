"use strict";
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
var storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'admin',
    allowedFormats: ['jpg,png'],
    filename: (req, res, cb) => {
        cb(null, req.file.originalname, Date.now());
    }
});
const filefilter = (req, file, next) => {
    next(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: filefilter
});
module.exports = upload;
