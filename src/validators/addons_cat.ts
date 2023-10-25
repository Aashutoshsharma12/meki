import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addaddons_cat = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    quantity: Joi.number().required(),
    position: Joi.number().required()
});

const editaddons_cat = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    quantity: Joi.number().required(),
    position: Joi.number().required()
});

const addaddons = Joi.object({
    name: Joi.string().required(),
    meso_name: Joi.string().required(),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    price: Joi.number().required(),
    addOns_CatId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'addOns_CatId')
        }),
    itemId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'itemId')
        }),
});

const editaddons = Joi.object({
    name: Joi.string().required(),
    meso_name: Joi.string().required(),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    itemId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'itemId')
        }),
    price: Joi.number().required(),
    addOns_CatId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'addOns_CatId')
        }),
    addonsId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'addonsId')
        })
});




export {
    addaddons_cat,
    editaddons_cat,
    addaddons,
    editaddons
}