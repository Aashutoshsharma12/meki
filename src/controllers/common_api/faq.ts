import { errors } from "@constants";
import { faqModel } from "@models/faq";
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"

function addFaq(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { question, messo_question, role } = body;
            const check = await faqModel.findOne({ role: role, isDelete: false, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
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
            const { faqId, question, messo_question, role } = body;
            const check = await faqModel.findOne({ isDelete: false, role: role, _id: { $ne: faqId }, $or: [{ lower_question: question.toLowerCase() }, { lower_messo_question: messo_question.toLowerCase() }] });
            if (check) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_question: question.toLowerCase(),
                    lower_messo_question: messo_question.toLowerCase(),
                    isActive:true,
                    isDelete:false
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
            const details = await faqModel.findOne({ _id: query.faqId,isDelete:false });
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
            const list = await faqModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
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
            const check = await faqModel.findOne({ _id: faqId ,isDelete:false});
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


export default {
    addFaq,
    editFaq,
    getDetails,
    list,
    deleteFaq
} as const;