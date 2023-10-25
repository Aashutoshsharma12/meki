"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotification = exports.editExplore = exports.addExplore = exports.editCat = exports.addCat = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addCat = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: joi_1.default.number().required()
});
exports.addCat = addCat;
const editCat = joi_1.default.object({
    catId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'catId')
    }),
    name: joi_1.default.string().required().messages({
        'string.empty': `Category Name cannot be an empty field`,
        'any.required': `Category Name is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Category meso_name cannot be an empty field`,
        'any.required': `Category meso_name is a required field`
    }),
    position: joi_1.default.number().required()
});
exports.editCat = editCat;
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
const addNotification = joi_1.default.object({
    title: joi_1.default.string().required(),
    meso_title: joi_1.default.string().required().messages({
        'string.empty': `Title(Messodonian) cannot be an empty field`,
        'any.required': `Title(Messodonian) is a required field`
    }),
    description: joi_1.default.string().required(),
    meso_description: joi_1.default.string().required().messages({
        'string.empty': `Description(Messodonian) cannot be an empty field`,
        'any.required': `Description(Messodonian) is a required field`
    }),
    sendTo: joi_1.default.string().required(),
    sendFrom: joi_1.default.string().required()
});
exports.addNotification = addNotification;
