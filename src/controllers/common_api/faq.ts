import { errors } from "@constants";
import { faqModel } from "@models/faq";
import { faq_catModel } from "@models/faq_cat";
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"

function addFaq(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { question, messo_question, role, faq_cat } = body;
            const check = await faqModel.findOne({ role: role, faq_cat: faq_cat, isDelete: false, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
            if (check) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_question: question.toLowerCase(),
                    lower_messo_question: messo_question.toLowerCase()
                }
                const add = await faqModel.create(obj);
                resolve(add);
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function editFaq(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { faqId, question, messo_question, faq_cat, role } = body;
            const check = await faqModel.findOne({ isDelete: false, faq_cat: faq_cat, role: role, _id: { $ne: faqId }, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
            if (check) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_question: question.toLowerCase(),
                    lower_messo_question: messo_question.toLowerCase(),
                    isActive: true,
                    isDelete: false
                }
                await faqModel.updateOne({ _id: faqId }, obj);
                resolve({ success: true });
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function getDetails(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const details = await faqModel.findOne({ _id: query.faqId, isDelete: false });
            if (!details) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            } else {
                resolve(details);
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function list(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { role, search, page = 1, perPage = 10 } = query;
            let obj: any = {
                isDelete: false
            }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { question: { $regex: search, $options: 'i' } },
                        { messo_question: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            if (role) {
                obj = {
                    ...obj,
                    role: role
                }
            }
            const count = await faqModel.countDocuments(obj);
            const list = await faqModel.find(obj).populate({ path: 'faq_cat', select: 'name' }).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ list, count: count });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function deleteFaq(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { faqId } = query;
            const check = await faqModel.findOne({ _id: faqId, isDelete: false });
            if (check) {
                await faqModel.updateOne({ _id: faqId }, { isDelete: true });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function addFaqCat(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, messo_name } = body;
            const check = await faq_catModel.findOne({ isDelete: false, $or: [{ lower_name: name.toLowerCase() }, { lower_messo_name: messo_name.toLowerCase() }] });
            if (check) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_name: name.toLowerCase(),
                    lower_messo_name: messo_name.toLowerCase()
                }
                const add = await faq_catModel.create(obj);
                resolve(add);
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function editFaqCat(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { faqCatId, name, messo_name } = body;
            const check = await faq_catModel.findOne({ isDelete: false, _id: { $ne: faqCatId }, $or: [{ lower_name: name.toLowerCase() }, { lower_messo_name: messo_name.toLowerCase() }] });
            if (check) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_name: name.toLowerCase(),
                    lower_messo_name: messo_name.toLowerCase(),
                    isActive: true,
                    isDelete: false
                }
                await faq_catModel.updateOne({ _id: faqCatId }, obj);
                resolve({ success: true });
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function getFaqCatDetails(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const details = await faq_catModel.findOne({ _id: query.faqCatId, isDelete: false });
            if (!details) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            } else {
                resolve(details);
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function faqCatList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { search, page = 1, perPage = 10 } = query;
            let obj: any = {
                isDelete: false
            }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { messo_name: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            const count = await faq_catModel.countDocuments(obj);
            const list = await faq_catModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ list, count: count });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}
function deleteFaqCat(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { faqCatId } = query;
            const check = await faq_catModel.findOne({ _id: faqCatId, isDelete: false });
            if (check) {
                await faq_catModel.updateOne({ _id: faqCatId }, { isDelete: true });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

//for drop down list
function all_faqCat(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let obj: any = {
                isDelete: false
            }
            const list = await faq_catModel.find(obj).sort({ createdAt: -1 });
            resolve(list);
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

export default {
    addFaq,
    editFaq,
    getDetails,
    list,
    deleteFaq,
    addFaqCat,
    editFaqCat,
    getFaqCatDetails,
    faqCatList,
    deleteFaqCat,
    all_faqCat
} as const;