import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addCat = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: Joi.number().required()
});

const editCat = Joi.object({
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),
    name: Joi.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: Joi.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: Joi.number().required()
})

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

const addNotification = Joi.object({
    title: Joi.string().required(),
    meso_title: Joi.string().required().messages({
        'string.empty': `Title(Messodonian) cannot be an empty field`,
        'any.required': `Title(Messodonian) is a required field`
    }),
    description: Joi.string().required(),
    meso_description: Joi.string().required().messages({
        'string.empty': `Description(Messodonian) cannot be an empty field`,
        'any.required': `Description(Messodonian) is a required field`
    }),
    sendTo: Joi.string().required(),
    sendFrom: Joi.string().required()
});


export {
    addCat,
    editCat,
    addExplore,
    editExplore,
    addNotification
}