"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editVendor = exports.get = exports.edit = exports.add = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const add = joi_1.default.object({
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(2)
        .required(),
    countryCode: joi_1.default.string().required()
});
exports.add = add;
const edit = joi_1.default.object({
    delivery_personId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'deliveryPersonId')
    }),
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(2)
        .required(),
    countryCode: joi_1.default.string().required()
});
exports.edit = edit;
const get = joi_1.default.object({
    delivery_personId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'deliveryPersonId')
    })
});
exports.get = get;
const editVendor = joi_1.default.object({
    vendorId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'vendorId')
    }),
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string()
        .min(2)
        .required(),
    countryCode: joi_1.default.string().required(),
});
exports.editVendor = editVendor;
