"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editaddons = exports.addaddons = exports.editaddons_cat = exports.addaddons_cat = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addaddons_cat = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    quantity: joi_1.default.number().required(),
    position: joi_1.default.number().required()
});
exports.addaddons_cat = addaddons_cat;
const editaddons_cat = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    quantity: joi_1.default.number().required(),
    position: joi_1.default.number().required()
});
exports.editaddons_cat = editaddons_cat;
const addaddons = joi_1.default.object({
    name: joi_1.default.string().required(),
    meso_name: joi_1.default.string().required(),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    // description: Joi.string().required(),
    // meso_description: Joi.string().required(),
    price: joi_1.default.number().required(),
    addOns_CatId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'addOns_CatId')
    }),
    itemId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemId')
    }),
});
exports.addaddons = addaddons;
const editaddons = joi_1.default.object({
    name: joi_1.default.string().required(),
    meso_name: joi_1.default.string().required(),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    itemId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemId')
    }),
    price: joi_1.default.number().required(),
    addOns_CatId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'addOns_CatId')
    }),
    addonsId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'addonsId')
    })
});
exports.editaddons = editaddons;
