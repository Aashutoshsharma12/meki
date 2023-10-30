"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaqCat = exports.editFaqCat = exports.addFaqCat = exports.get = exports.createReport = exports.getDetails = exports.editFaq = exports.addFaq = void 0;
const _constants_1 = require("../constants/index");
const joi_1 = __importDefault(require("joi"));
const addFaq = joi_1.default.object({
    question: joi_1.default.string().required(),
    messo_question: joi_1.default.string().required(),
    answer: joi_1.default.string().required(),
    messo_answer: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    faq_cat: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faq_cat')
    })
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
    role: joi_1.default.string().required(),
    faq_cat: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faq_cat')
    })
});
exports.editFaq = editFaq;
const getDetails = joi_1.default.object({
    faqId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faqId')
    }),
});
exports.getDetails = getDetails;
const addFaqCat = joi_1.default.object({
    name: joi_1.default.string().required(),
    messo_name: joi_1.default.string().required()
});
exports.addFaqCat = addFaqCat;
const editFaqCat = joi_1.default.object({
    faqCatId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faqCatId')
    }),
    name: joi_1.default.string().required(),
    messo_name: joi_1.default.string().required()
});
exports.editFaqCat = editFaqCat;
const getFaqCat = joi_1.default.object({
    faqCatId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'faqCatId')
    })
});
exports.getFaqCat = getFaqCat;
const createReport = joi_1.default.object({
    message: joi_1.default.string().required(),
    Id: joi_1.default.string().required(),
    addBy: joi_1.default.string().required()
});
exports.createReport = createReport;
const get = joi_1.default.object({
    reportId: joi_1.default.string().min(24).required()
        .messages({
        'string.min': _constants_1.errors.en.invalidMongoId.replace('{{key}}', 'reportId')
    }),
});
exports.get = get;
