import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addItem = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Item Name cannot be an empty field`,
        'any.required': `Item Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Item meso_name cannot be an empty field`,
        'any.required': `Item meso_name is a required field`
    }),
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    price: Joi.string().required(),
    description: Joi.string().required(),
    meso_description: Joi.string().required(),
    menuType: Joi.string().required(),
    available: Joi.boolean().required()
});

const editItem = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Item Name cannot be an empty field`,
        'any.required': `Item Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Item meso_name cannot be an empty field`,
        'any.required': `Item meso_name is a required field`
    }),
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),
    itemId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'itemId')
        }),
    price: Joi.string().required(),
    description: Joi.string().required(),
    meso_description: Joi.string().required(),
    menuType: Joi.string().required(),
    available: Joi.boolean().required()
});

const addExplore = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Explore Name cannot be an empty field`,
        'any.required': `Explore Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Explore meso_name cannot be an empty field`,
        'any.required': `Explore meso_name is a required field`
    }),
    position: Joi.number().required()
});

const editExplore = Joi.object({
    exploreId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
        }),
    name: Joi.string().required().messages({
        'string.empty': `Explore Name cannot be an empty field`,
        'any.required': `Explore Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: Joi.number().required()
})


export {
    addItem,
    editItem,
    addExplore,
    editExplore
}