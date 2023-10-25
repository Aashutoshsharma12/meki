import { errors } from "@constants"
import deliveryPersonModel from "@models/deliveryPerson";
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"

function addDeliveryPerson(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!image) {
                reject(new CustomError('Image Required', StatusCodes.BAD_REQUEST))
            } else {
                const { phoneNumber, countryCode } = body;
                const check = await deliveryPersonModel.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false });
                if (check) {
                    reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST))
                } else {
                    const obj = {
                        ...body,
                        image: image[0].path
                    }
                    const add = await deliveryPersonModel.create(obj);
                    resolve(add);
                }
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    })
}

function editDeliveryPerson(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { phoneNumber, countryCode, delivery_personId } = body;
            const check1 = await deliveryPersonModel.findOne({ isDelete: false, _id: delivery_personId });
            if (check1) {
                const check = await deliveryPersonModel.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, _id: { $ne: delivery_personId } });
                if (check) {
                    reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST))
                } else {
                    if (!image) {
                        var newImage: any = check1.image
                    } else {
                        var newImage: any = image[0].path
                    }
                    const obj = {
                        ...body,
                        image: newImage
                    }
                    const add = await deliveryPersonModel.updateOne({ _id: delivery_personId }, obj);
                    resolve(add);
                }
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }

        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    })
}

function getDeliveryPerson(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { delivery_personId } = query;
            const check = await deliveryPersonModel.findOne({ isDelete: false, _id: delivery_personId });
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

function listDeliveryPerson(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, search, status } = query;
            let obj: any = {
                isDelete: false
            }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } }
                    ]
                }
            }

            if (status) {
                obj = {
                    ...obj,
                    status: status
                }
            }
            const count = await deliveryPersonModel.countDocuments(obj);
            const check = await deliveryPersonModel.find(obj).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            resolve({ check, count: count });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST))
        }
    })
}

function deleteDeliveryPerson(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { delivery_personId } = query;
            const check = await deliveryPersonModel.findOne({ isDelete: false, _id: delivery_personId });
            if (check) {
                await deliveryPersonModel.updateOne({ _id: delivery_personId }, { isDelete: true });
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
    addDeliveryPerson,
    editDeliveryPerson,
    getDeliveryPerson,
    listDeliveryPerson,
    deleteDeliveryPerson
} as const