import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const add = Joi.object({

    name: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(2)
        .required()
    ,
    countryCode: Joi.string().required()
});

const edit = Joi.object({
    delivery_personId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'deliveryPersonId')
        }),
    name: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(2)
        .required()
    ,
    countryCode: Joi.string().required()
})

const get = Joi.object({
    delivery_personId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'deliveryPersonId')
        })
})

const editVendor = Joi.object({
    vendorId: Joi.string().min(24).required()
    .messages({
        'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    name: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(2)
        .required()
    ,
    countryCode: Joi.string().required(),
    
});

export  {
    add,
    edit,
    get,
    editVendor
} 