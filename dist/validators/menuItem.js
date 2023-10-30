"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editExplore = exports.addExplore = exports.editItem = exports.addItem = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addItem = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Item Name cannot be an empty field`,
        'any.required': `Item Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Item meso_name cannot be an empty field`,
        'any.required': `Item meso_name is a required field`
    }),
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    price: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    meso_description: joi_1.default.string().required(),
    menuType: joi_1.default.string().required(),
    available: joi_1.default.boolean().required()
});
exports.addItem = addItem;
const editItem = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Item Name cannot be an empty field`,
        'any.required': `Item Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Item meso_name cannot be an empty field`,
        'any.required': `Item meso_name is a required field`
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    itemId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemId')
    }),
    price: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    meso_description: joi_1.default.string().required(),
    menuType: joi_1.default.string().required(),
    available: joi_1.default.boolean().required()
});
exports.editItem = editItem;
const addExplore = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Explore Name cannot be an empty field`,
        'any.required': `Explore Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Explore meso_name cannot be an empty field`,
        'any.required': `Explore meso_name is a required field`
    }),
    position: joi_1.default.number().required()
});
exports.addExplore = addExplore;
const editExplore = joi_1.default.object({
    exploreId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'exploreId')
    }),
    name: joi_1.default.string().required().messages({
        'string.empty': `Explore Name cannot be an empty field`,
        'any.required': `Explore Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: joi_1.default.number().required()
});
exports.editExplore = editExplore;
