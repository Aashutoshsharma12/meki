"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAddressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerAddressSchema = joi_1.default.object({
    addressId: joi_1.default.string().optional().trim(),
    addressLine1: joi_1.default.string().required().min(3).trim(),
    addressLine2: joi_1.default.string().required().min(4).trim(),
    addressLine3: joi_1.default.string().optional().trim(),
    type: joi_1.default.string().required().lowercase().trim(),
    lat: joi_1.default.string().required().trim(),
    long: joi_1.default.string().required().trim(),
    landmark: joi_1.default.string().optional().trim(),
});
exports.registerAddressSchema = registerAddressSchema;
