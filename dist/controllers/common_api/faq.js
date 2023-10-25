"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("../../constants/index");
const faq_1 = require("../../models/faq");
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = require("http-status-codes");
function addFaq(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { question, messo_question, role } = body;
            const check = yield faq_1.faqModel.findOne({ role: role, isDelete: false, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const obj = Object.assign(Object.assign({}, body), { lower_question: question.toLowerCase(), lower_messo_question: messo_question.toLowerCase() });
                const add = yield faq_1.faqModel.create(obj);
                resolve(add);
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function editFaq(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { faqId, question, messo_question, role } = body;
            const check = yield faq_1.faqModel.findOne({ isDelete: false, role: role, _id: { $ne: faqId }, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const obj = Object.assign(Object.assign({}, body), { lower_question: question.toLowerCase(), lower_messo_question: messo_question.toLowerCase(), isActive: true, isDelete: false });
                yield faq_1.faqModel.updateOne({ _id: faqId }, obj);
                resolve({ success: true });
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function getDetails(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const details = yield faq_1.faqModel.findOne({ _id: query.faqId, isDelete: false });
            if (!details) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                resolve(details);
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function list(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { role, search, page = 1, perPage = 10 } = query;
            let obj = {
                isDelete: false
            };
            if (search) {
                obj = Object.assign(Object.assign({}, obj), { $or: [
                        { question: { $regex: search, $options: 'i' } },
                        { messo_question: { $regex: search, $options: 'i' } }
                    ] });
            }
            if (role) {
                obj = Object.assign(Object.assign({}, obj), { role: role });
            }
            const count = yield faq_1.faqModel.countDocuments(obj);
            const list = yield faq_1.faqModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ list, count: count });
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
function deleteFaq(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { faqId } = query;
            const check = yield faq_1.faqModel.findOne({ _id: faqId, isDelete: false });
            if (check) {
                yield faq_1.faqModel.updateOne({ _id: faqId }, { isDelete: true });
                resolve({ success: true });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(new errors_1.CustomError(err, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }));
}
exports.default = {
    addFaq,
    editFaq,
    getDetails,
    list,
    deleteFaq
};
