"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSize = exports.addSize = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addSize = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Title in messodonian cannot be an empty field`,
        'any.required': `Title messodonian is a required field`
    }),
    price: joi_1.default.number().required(),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    itemId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'itemId')
    })
});
exports.addSize = addSize;
const editSize = joi_1.default.object({
    menu_sizeId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'menu_sizeId')
    }),
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    name: joi_1.default.string().required().messages({
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`
    }),
    meso_name: joi_1.default.string().required().messages({
        'string.empty': `Title in messodonian cannot be an empty field`,
        'any.required': `Title messodonian is a required field`
    }),
    price: joi_1.default.number().required()
});
exports.editSize = editSize;
