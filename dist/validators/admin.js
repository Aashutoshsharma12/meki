"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listItemCat = exports.getItemCat = exports.EditItemCategory = exports.AddItemCategory = exports.changePasswordSchema = exports.loginSchema = exports.signUpSchema = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
//******Singup Schema********/
const signUpSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string().required().email({ minDomainSegments: 2 }),
    phoneNumber: joi_1.default.string()
        .min(10)
        .max(10)
        .required()
        .messages({
        'string.empty': `Phone Number cannot be an empty field`,
        'string.min': `Phone Number should have a minimum length of {#limit}`,
        'string.max': `Phone Number should have a maximum length of {#limit}`,
        'any.required': `Phone Number is a required field`
    }),
    password: joi_1.default.string()
});
exports.signUpSchema = signUpSchema;
//******Login Schema********/
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email({ minDomainSegments: 2 }),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;
//******changePassword Schema********/
const changePasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string().min(6).max(10).required(),
    password: joi_1.default.string().max(10).required(),
});
exports.changePasswordSchema = changePasswordSchema;
const AddItemCategory = joi_1.default.object({
    name: joi_1.default.string().required(),
    meso_name: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    })
});
exports.AddItemCategory = AddItemCategory;
const EditItemCategory = joi_1.default.object({
    name: joi_1.default.string().required(),
    meso_name: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    itemCategoryId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemCategoryId')
    })
});
exports.EditItemCategory = EditItemCategory;
const getItemCat = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    itemCategoryId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemCategoryId')
    })
});
exports.getItemCat = getItemCat;
const listItemCat = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    page: joi_1.default.number().required(),
    perPage: joi_1.default.number().required()
});
exports.listItemCat = listItemCat;
