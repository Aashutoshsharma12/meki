import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addResturant = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Owner Name cannot be an empty field`,
        'any.required': `Owner Name is a required field`
    }),
    email: Joi.string().email({ minDomainSegments: 2 }),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(2)
        .required()
    ,
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),  //categoryId,
    exploreId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
        }),  //exploreId,
    c1: Joi.string().allow(null, ''),
    c2: Joi.string().allow(null, ''),
    c3: Joi.string().allow(null, ''),
    catId1: Joi.string().allow(null, ''),
    exploreId1: Joi.string().allow(null, ''),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    branchType: Joi.string().required(),
    googlePlaceId: Joi.string().required(),
    restaurantName: Joi.string().required(),
    restaurant_mesoName: Joi.string().required(),
    adminPercentage: Joi.number().required(),
    delivery_charges: Joi.number().required(),
    minimum_orderAmount: Joi.number().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    openingTime1: Joi.string().allow(null, ''),
    closingTime1: Joi.string().allow(null, ''),
    mobileNo: Joi.string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.empty': `Phone Number cannot be an empty field`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
    mobile_countryCode: Joi.string().required(),
    country: Joi.string().required(),
    // addressLine1: Joi.string().required(),
    // addressLine2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    fullAddress: Joi.string().required(),
    max_deliveryTime: Joi.string().required(),
    paymentMehod: Joi.string().required(),
    bankName: Joi.string().required(),
    IFSC_code: Joi.string().required(),
    cr_number: Joi.string().required(),
    branchNumber: Joi.string().required(),
    accountNumber: Joi.string().required(),

});

const add_branch = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `Owner Name cannot be an empty field`,
        'any.required': `Owner Name is a required field`
    }),
    email: Joi.string().email({ minDomainSegments: 2 }),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(2)
        .required()
    ,
    catId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'catId')
        }),  //categoryId,
    exploreId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
        }),  //exploreId,
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    c1: Joi.string().allow(null, ''),
    c2: Joi.string().allow(null, ''),
    catId1: Joi.string().allow(null, ''),
    exploreId1: Joi.string().allow(null, ''),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    branchType: Joi.string().required(),
    googlePlaceId: Joi.string().required(),
    restaurantName: Joi.string(),
    restaurant_mesoName: Joi.string(),
    adminPercentage: Joi.number(),
    delivery_charges: Joi.number().required(),
    minimum_orderAmount: Joi.number().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    openingTime1: Joi.string().allow(null, ''),
    closingTime1: Joi.string().allow(null, ''),
    mobileNo: Joi.string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.empty': `Phone Number cannot be an empty field`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
    mobile_countryCode: Joi.string().required(),
    country: Joi.string().required(),
    // addressLine1: Joi.string().required(),
    // addressLine2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    fullAddress: Joi.string().required(),
    max_deliveryTime: Joi.string().required(),
    paymentMehod: Joi.string().required(),
    bankName: Joi.string().required(),
    IFSC_code: Joi.string().required(),
    cr_number: Joi.string().required(),
    branchNumber: Joi.string().required(),
    accountNumber: Joi.string().required(),

});

const editResturant_branch = Joi.object({
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),  //restaurantId

    mobileNo: Joi.string()
        .min(2)
        .required()
    ,
    c1: Joi.string().allow(null, ''),
    c2: Joi.string().allow(null, ''),
    mobile_countryCode: Joi.string().required(),
    country: Joi.string().allow(null, ''),
    addressLine1: Joi.string().allow(null, ''),
    addressLine2: Joi.string().allow(null, ''),
    city: Joi.string().allow(null, ''),
    state: Joi.string().allow(null, ''),
    zipCode: Joi.string().allow(null, ''),
    fullAddress: Joi.string().allow(null, ''),
    max_deliveryTime: Joi.string().required(),
    minimum_orderAmount: Joi.string().required(),
    delivery_charges: Joi.string().required(),
    paymentMehod: Joi.string().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    openingTime1: Joi.string().allow(null, ''),
    closingTime1: Joi.string().allow(null, ''),
    branchType: Joi.string().allow(null, ''),
    googlePlaceId: Joi.string().allow(null, ''),
    lat: Joi.string().allow(null, ''),
    long: Joi.string().allow(null, '')
});
const editResturant = Joi.object({
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),  //restaurantId

    adminPercentage: Joi.number().required()
});

const updateStatus = Joi.object({
    vendorId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
        }),
    status: Joi.string().required()
});


export {
    addResturant,
    add_branch,
    editResturant,
    editResturant_branch,
    updateStatus
}