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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const app_1 = __importDefault(require("./routes/app"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const errors_1 = require("./utils/errors");
const admin_panel_1 = __importDefault(require("./routes/admin-panel"));
const index_1 = __importDefault(require("./routes/admin/index"));
const database_1 = require("./utils/database");
require("./models/index");
const multer_1 = __importDefault(require("./utils/multer"));
const cors = require("cors");
// Constants
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ limit: '20mb', extended: true }));
app.use(body_parser_1.default.json({ limit: '20mb' }));
//Connect DB
(0, database_1.connect)();
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
// Common middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization");
    next();
});
app.use(cors());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/
// Add api router
app.use('/api/v1', app_1.default);
// Admin api router
app.use('/api/v1/admin', index_1.default);
// Error handling
app.use((err, _, res, __) => {
    jet_logger_1.default.err(err, true);
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
        message: err.message,
        code: status
    });
});
/***********************************************************************************
 *                         API route file upload
 **********************************************************************************/
app_1.default.post('/upload', multer_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file)
        return res.status(http_status_codes_1.default.OK).send({ data: { url: req.file.path }, code: http_status_codes_1.default.OK, message: 'File uploaded.' });
    else
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            error: 'Error in file upload',
            message: 'Error in file upload',
            code: http_status_codes_1.default.BAD_REQUEST
        });
}));
//From body
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
app_1.default.post('/upload_image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield cloudinary.uploader.upload(req.body.image);
        res.json({ message: "success", data: data.secure_url });
    }
    catch (err) {
        res.json({ error: err });
    }
    // cloudinary.uploader.upload_stream(
    //     {
    //         resource_type: 'image', // Specify the resource type (image, video,raw (for pdf) etc.)
    //         public_id: 'desired_public_id', // Specify the desired public ID for the image
    //     },
    //     (error: any, result: any) => {
    //         if (error) {
    //             console.error('Error uploading image:', error);
    //         } else {
    //             console.log('Image uploaded successfully:', result);
    //         }
    //     }
    // ).end(imageBuffer.buffer);
}));
app_1.default.post('/multi-upload', multer_1.default.array('image', 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        const urls = req.files.map((it) => it.path);
        return res.status(http_status_codes_1.default.OK).send({ data: { url: urls }, code: http_status_codes_1.default.OK, message: 'Files uploaded.' });
    }
    else
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            error: 'Error in file upload',
            message: 'Error in file upload',
            code: http_status_codes_1.default.BAD_REQUEST
        });
}));
/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/
// Set views dir
const adminViewsDir = path_1.default.join(__dirname, 'public/admin/');
app.set('views', [adminViewsDir]);
// Set static dir
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
// Serve admin panel files
app.use('/admin', admin_panel_1.default);
// Export here and start in a diff file (for testing).
exports.default = app;
