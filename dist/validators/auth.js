"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInSchema = exports.accountVerificationSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    countryCode: joi_1.default.string().required(),
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
    role: joi_1.default.string().required().valid('user', 'vendor', 'delivery_boy'), //user , vendor , delivery_boy
});
exports.signUpSchema = signUpSchema;
const accountVerificationSchema = joi_1.default.object({
    countryCode: joi_1.default.string().required(),
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
    role: joi_1.default.string().required().valid('user', 'vendor', 'delivery_boy', 'Admin'), //user , vendor , delivery_boy
});
exports.accountVerificationSchema = accountVerificationSchema;
const logInSchema = joi_1.default.object({
    countryCode: joi_1.default.string().required(),
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
    role: joi_1.default.string().required().valid('user', 'vendor', 'delivery_boy', 'Admin'), //user , vendor , delivery_boy
});
exports.logInSchema = logInSchema;
