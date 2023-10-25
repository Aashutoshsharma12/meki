"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetails = exports.editFaq = exports.addFaq = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addFaq = joi_1.default.object({
    question: joi_1.default.string().required(),
    messo_question: joi_1.default.string().required(),
    answer: joi_1.default.string().required(),
    messo_answer: joi_1.default.string().required(),
    role: joi_1.default.string().required()
});
exports.addFaq = addFaq;
const editFaq = joi_1.default.object({
    faqId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faqId')
    }),
    question: joi_1.default.string().required(),
    messo_question: joi_1.default.string().required(),
    answer: joi_1.default.string().required(),
    messo_answer: joi_1.default.string().required(),
    role: joi_1.default.string().required()
});
exports.editFaq = editFaq;
const getDetails = joi_1.default.object({
    faqId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faqId')
    }),
});
exports.getDetails = getDetails;
