import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addFaq = Joi.object({
    question: Joi.string().required(),
    messo_question: Joi.string().required(),
    answer: Joi.string().required(),
    messo_answer: Joi.string().required(),
    role: Joi.string().required(),
    faq_cat: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faq_cat')
        })
});

const editFaq = Joi.object({
    faqId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faqId')
        }),
    question: Joi.string().required(),
    messo_question: Joi.string().required(),
    answer: Joi.string().required(),
    messo_answer: Joi.string().required(),
    role: Joi.string().required(),
    faq_cat: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faq_cat')
        })
});

const getDetails = Joi.object({
    faqId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faqId')
        }),
});

const addFaqCat = Joi.object({
    name: Joi.string().required(),
    messo_name: Joi.string().required()
});

const editFaqCat = Joi.object({
    faqCatId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faqCatId')
        }),
    name: Joi.string().required(),
    messo_name: Joi.string().required()
});

const getFaqCat = Joi.object({
    faqCatId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faqCatId')
        })
});

const createReport = Joi.object({
    message: Joi.string().required(),
    Id: Joi.string().required(),
    addBy: Joi.string().required()
});

const get = Joi.object({
    reportId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'reportId')
        }),
});

export {
    addFaq,
    editFaq,
    getDetails,
    createReport,
    get,
    addFaqCat,
    editFaqCat,
    getFaqCat
}