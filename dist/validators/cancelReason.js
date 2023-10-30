"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReason = exports.editCancelReason = exports.addCancelReason = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addCancelReason = joi_1.default.object({
    reason: joi_1.default.string().required(),
    meso_reason: joi_1.default.string().required()
});
exports.addCancelReason = addCancelReason;
const editCancelReason = joi_1.default.object({
    cancelReasonId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'cancelReasonId')
    }),
    reason: joi_1.default.string().required(),
    meso_reason: joi_1.default.string().required()
});
exports.editCancelReason = editCancelReason;
const getReason = joi_1.default.object({
    cancelReasonId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'cancelReasonId')
    }),
});
exports.getReason = getReason;
