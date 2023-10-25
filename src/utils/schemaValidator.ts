import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export const schemaValidator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i: any) => i.message.split('"').join('')).join(',');
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                error: message,
                message: message,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            });
        }
    }
}
export const schemaValidator1 = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i: any) => i.message.split('"').join('')).join(',');
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                error: message,
                message: message,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            });
        }
    }
}

