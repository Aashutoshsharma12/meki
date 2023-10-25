import { errors } from "@constants"
import cancelReasonModel from "@models/cancelReason";
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"

function addReason(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { reason, meso_reason } = body;
            const check = await cancelReasonModel.findOne({ $or: [{ lower_reason: reason.toLowerCase() }, { meso_lower_reason: meso_reason.toLowerCase() }], isDelete: false });
            if (check) {
                reject(new CustomError(errors.en.reasonExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_reason: reason.toLowerCase(),
                    meso_lower_reason: meso_reason.toLowerCase()
                }
                const add = await cancelReasonModel.create(obj);
                resolve(add);
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

function editReason(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { reason, meso_reason, cancelReasonId } = body;
            const check = await cancelReasonModel.findOne({ _id: { $ne: cancelReasonId }, $or: [{ lower_reason: reason.toLowerCase() }, { meso_lower_reason: meso_reason.toLowerCase() }], isDelete: false });
            if (check) {
                reject(new CustomError(errors.en.reasonExist, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    ...body,
                    lower_reason: reason.toLowerCase(),
                    meso_lower_reason: meso_reason.toLowerCase()
                }
                await cancelReasonModel.updateOne({ _id: cancelReasonId }, obj);
                resolve({ success: true });
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    });
}

function getReason(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { cancelReasonId } = query;
            const check = await cancelReasonModel.findOne({ isDelete: false, _id: cancelReasonId });
            if (check) {
                resolve(check);
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    });
}

function listReason(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, search } = query;
            let obj: any = {
                isDelete: false
            }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { reason: { $regex: search, $options: 'i' } },
                        { meso_reason: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            const count = await cancelReasonModel.countDocuments(obj);
            const check = await cancelReasonModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ check, count: count });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    })
}

function deleteReason(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { cancelReasonId } = query;
            const check = await cancelReasonModel.findOne({ isDelete: false, _id: cancelReasonId });
            if (check) {
                await cancelReasonModel.updateOne({ _id: cancelReasonId }, { isDelete: true });
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
    addReason,
    editReason,
    getReason,
    listReason,
    deleteReason
} as const