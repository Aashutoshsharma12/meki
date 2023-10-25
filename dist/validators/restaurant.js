"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.editResturant_branch = exports.editResturant = exports.add_branch = exports.addResturant = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addResturant = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Owner Name cannot be an empty field`,
        'any.required': `Owner Name is a required field`
    }),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    countryCode: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(2)
        .required(),
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    exploreId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
    }),
    c1: joi_1.default.string().allow(null, ''),
    c2: joi_1.default.string().allow(null, ''),
    c3: joi_1.default.string().allow(null, ''),
    catId1: joi_1.default.string().allow(null, ''),
    exploreId1: joi_1.default.string().allow(null, ''),
    lat: joi_1.default.string().required(),
    long: joi_1.default.string().required(),
    branchType: joi_1.default.string().required(),
    googlePlaceId: joi_1.default.string().required(),
    restaurantName: joi_1.default.string().required(),
    restaurant_mesoName: joi_1.default.string().required(),
    adminPercentage: joi_1.default.number().required(),
    delivery_charges: joi_1.default.number().required(),
    minimum_orderAmount: joi_1.default.number().required(),
    openingTime: joi_1.default.string().required(),
    closingTime: joi_1.default.string().required(),
    openingTime1: joi_1.default.string().allow(null, ''),
    closingTime1: joi_1.default.string().allow(null, ''),
    mobileNo: joi_1.default.string()
        .min(10)
        .max(10)
        .required()
        .messages({
        'string.empty': `Phone Number cannot be an empty field`,
        'string.min': `Phone Number should have a minimum length of {#limit}`,
        'string.max': `Phone Number should have a maximum length of {#limit}`,
        'any.required': `Phone Number is a required field`
    }),
    mobile_countryCode: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    // addressLine1: Joi.string().required(),
    // addressLine2: Joi.string().required(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    zipCode: joi_1.default.string().required(),
    fullAddress: joi_1.default.string().required(),
    max_deliveryTime: joi_1.default.string().required(),
    paymentMehod: joi_1.default.string().required(),
    bankName: joi_1.default.string().required(),
    IFSC_code: joi_1.default.string().required(),
    cr_number: joi_1.default.string().required(),
    branchNumber: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().required(),
});
exports.addResturant = addResturant;
const add_branch = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Owner Name cannot be an empty field`,
        'any.required': `Owner Name is a required field`
    }),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    countryCode: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(2)
        .required(),
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    exploreId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    c1: joi_1.default.string().allow(null, ''),
    c2: joi_1.default.string().allow(null, ''),
    catId1: joi_1.default.string().allow(null, ''),
    exploreId1: joi_1.default.string().allow(null, ''),
    lat: joi_1.default.string().required(),
    long: joi_1.default.string().required(),
    branchType: joi_1.default.string().required(),
    googlePlaceId: joi_1.default.string().required(),
    restaurantName: joi_1.default.string(),
    restaurant_mesoName: joi_1.default.string(),
    adminPercentage: joi_1.default.number(),
    delivery_charges: joi_1.default.number().required(),
    minimum_orderAmount: joi_1.default.number().required(),
    openingTime: joi_1.default.string().required(),
    closingTime: joi_1.default.string().required(),
    openingTime1: joi_1.default.string().allow(null, ''),
    closingTime1: joi_1.default.string().allow(null, ''),
    mobileNo: joi_1.default.string()
        .min(10)
        .max(10)
        .required()
        .messages({
        'string.empty': `Phone Number cannot be an empty field`,
        'string.min': `Phone Number should have a minimum length of {#limit}`,
        'string.max': `Phone Number should have a maximum length of {#limit}`,
        'any.required': `Phone Number is a required field`
    }),
    mobile_countryCode: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    // addressLine1: Joi.string().required(),
    // addressLine2: Joi.string().required(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    zipCode: joi_1.default.string().required(),
    fullAddress: joi_1.default.string().required(),
    max_deliveryTime: joi_1.default.string().required(),
    paymentMehod: joi_1.default.string().required(),
    bankName: joi_1.default.string().required(),
    IFSC_code: joi_1.default.string().required(),
    cr_number: joi_1.default.string().required(),
    branchNumber: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().required(),
});
exports.add_branch = add_branch;
const editResturant_branch = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    mobileNo: joi_1.default.string()
        .min(2)
        .required(),
    c1: joi_1.default.string().allow(null, ''),
    c2: joi_1.default.string().allow(null, ''),
    mobile_countryCode: joi_1.default.string().required(),
    country: joi_1.default.string().allow(null, ''),
    addressLine1: joi_1.default.string().allow(null, ''),
    addressLine2: joi_1.default.string().allow(null, ''),
    city: joi_1.default.string().allow(null, ''),
    state: joi_1.default.string().allow(null, ''),
    zipCode: joi_1.default.string().allow(null, ''),
    fullAddress: joi_1.default.string().allow(null, ''),
    max_deliveryTime: joi_1.default.string().required(),
    minimum_orderAmount: joi_1.default.string().required(),
    delivery_charges: joi_1.default.string().required(),
    paymentMehod: joi_1.default.string().required(),
    openingTime: joi_1.default.string().required(),
    closingTime: joi_1.default.string().required(),
    openingTime1: joi_1.default.string().allow(null, ''),
    closingTime1: joi_1.default.string().allow(null, ''),
    branchType: joi_1.default.string().allow(null, ''),
    googlePlaceId: joi_1.default.string().allow(null, ''),
    lat: joi_1.default.string().allow(null, ''),
    long: joi_1.default.string().allow(null, '')
});
exports.editResturant_branch = editResturant_branch;
const editResturant = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    adminPercentage: joi_1.default.number().required()
});
exports.editResturant = editResturant;
const updateStatus = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    status: joi_1.default.string().required()
});
exports.updateStatus = updateStatus;
