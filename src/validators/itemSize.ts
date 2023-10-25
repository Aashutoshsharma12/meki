import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addSize = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Title in messodonian cannot be an empty field`,
        'any.required': `Title messodonian is a required field`
    }),
    price: Joi.number().required(),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    itemId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'itemId')
        })
});

const editSize = Joi.object({
    menu_sizeId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'menu_sizeId')
        }),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    name: Joi.string().required().messages({
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Title in messodonian cannot be an empty field`,
        'any.required': `Title messodonian is a required field`
    }),
    price: Joi.number().required()
})


export {
    addSize,
    editSize
}