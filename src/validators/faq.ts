import { errors } from "@constants";
import Joi from "joi";
import { join } from "path";

const addFaq = Joi.object({
    question: Joi.string().required(),
    messo_question: Joi.string().required(),
    answer: Joi.string().required(),
    messo_answer: Joi.string().required(),
    role: Joi.string().required()
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
    role: Joi.string().required()
});

const getDetails = Joi.object({
    faqId: Joi.string().min(24).required()
        .messages({
            'string.min': errors.en.invalidMongoId.replace('{{key}}', 'faqId')
        }),
});


export {
    addFaq,
    editFaq,
    getDetails
}