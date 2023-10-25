import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/app';
import logger from 'jet-logger';
import { CustomError } from '@utils/errors';
import adminRoutesFE from './routes/admin-panel';
import adminRoutesBE from './routes/admin/index';

import { connect, disconnect } from '@utils/database';
import '@models/index';
import upload from '@utils/multer';
const cors = require("cors")
// Constants
const app = express();
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));
//Connect DB
connect();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}




/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use('/api/v1', apiRouter);



// Admin api router
app.use('/api/v1/admin', adminRoutesBE);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
        message: err.message,
        code: status
    });
});


/***********************************************************************************
 *                         API route file upload
 **********************************************************************************/

apiRouter.post('/upload', upload.single('image'), async (req: any, res: Response) => {
    if (req.file)
        return res.status(StatusCodes.OK).send({ data: { url: req.file.path }, code: StatusCodes.OK, message: 'File uploaded.' })
    else
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Error in file upload',
            message: 'Error in file upload',
            code: StatusCodes.BAD_REQUEST
        })
});
//From body
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

apiRouter.post('/upload_image', async (req: any, res) => {
    try {
        const data = await cloudinary.uploader.upload(req.body.image)
        res.json({ message: "success", data: data.secure_url })
    } catch (err) {
        res.json({ error: err })
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
})
apiRouter.post('/multi-upload', upload.array('image', 10), async (req: any, res: Response) => {
    if (req.files) {
        const urls = req.files.map((it: any) => it.path)
        return res.status(StatusCodes.OK).send({ data: { url: urls }, code: StatusCodes.OK, message: 'Files uploaded.' })
    }
    else
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Error in file upload',
            message: 'Error in file upload',
            code: StatusCodes.BAD_REQUEST
        })
});




/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views dir
const adminViewsDir = path.join(__dirname, 'public/admin/');

app.set('views', [adminViewsDir]);

// Set static dir
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Serve admin panel files
app.use('/admin', adminRoutesFE)





// Export here and start in a diff file (for testing).
export default app;