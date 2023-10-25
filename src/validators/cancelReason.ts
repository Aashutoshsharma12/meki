import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addCancelReason = Joi.object({
    reason: Joi.string().required(),
    meso_reason: Joi.string().required()
});

const editCancelReason = Joi.object({
    cancelReasonId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'cancelReasonId')
        }),
        reason: Joi.string().required(),
        meso_reason: Joi.string().required()
});

const getReason = Joi.object({
    cancelReasonId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'cancelReasonId')
        }),
});


export {
    addCancelReason,
    editCancelReason,
    getReason
}