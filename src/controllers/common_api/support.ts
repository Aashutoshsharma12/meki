import { errors } from "@constants";
import supportModel from "@models/supportModel";
import { CustomError } from "@utils/errors"
import { StatusCodes } from "http-status-codes"

function createReport(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { message, addBy, Id } = body;
            if (addBy == 'deliveryPerson') {
                body.deliveryPersonId = Id
            } else {
                body.userId = Id
            }
            console.log(body, "Dd;d")
            const add = await supportModel.create(body);
            resolve(add);
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}


function getDetails(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const details = await supportModel.findOne({ _id: query.reportId, isDelete: false });
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
            const { status, search, page = 1, perPage = 10 } = query;
            let obj: any = {
                isDelete: false
            }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { message: { $regex: search, $options: 'i' } },
                        { 'UserDetails.name': { $regex: search, $options: 'i' } },
                        { 'UserDetails.email': { $regex: search, $options: 'i' } },
                        { 'UserDetails.phoneNumber': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.name': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.phoneNumber': { $regex: search, $options: 'i' } },
                        { 'deliveryPersonDetails.email': { $regex: search, $options: 'i' } }
                    ]
                }
            }
            if (status) {
                obj = {
                    ...obj,
                    status: status
                }
            }
            const count1 = await supportModel.aggregate([
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'userId',
                        as: 'UserDetails',
                        from: 'users',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'deliveryPersonId',
                        as: 'deliveryPersonDetails',
                        from: 'deliverypersons',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                { $match: obj },
                {
                    $group: {
                        _id: null, // Group all documents together
                        count: { $sum: 1 }, // Use $sum to count the documents
                    },
                }]);
            if (count1.length) {
                var count: any = count1[0].count
            }
            else {
                var count: any = 0
            }
            const list = await supportModel.aggregate([
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'userId',
                        as: 'UserDetails',
                        from: 'users',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        foreignField: '_id',
                        localField: 'deliveryPersonId',
                        as: 'deliveryPersonDetails',
                        from: 'deliverypersons',
                        pipeline: [
                            {
                                $project: { name: 1, email: 1, phoneNumber: 1 }
                            }
                        ]
                    }
                },
                { $match: obj },
                { $sort: { createdAt: -1 } },
                { $skip: Number(page * perPage) - Number(perPage) },
                { $limit: Number(perPage) }
            ]);
            resolve({ list, count: count });
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}
function updateStatus(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { reportId } = query;
            const check = await supportModel.findOne({ _id: reportId, isDelete: false });
            if (check) {
                if (check.status == 'Open') {
                    await supportModel.updateOne({ _id: reportId }, { status: 'Closed' });
                    resolve({ success: true });
                } else {
                    await supportModel.updateOne({ _id: reportId }, { status: "Open" });
                    resolve({ success: true });
                }
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            reject(new CustomError(err, StatusCodes.BAD_REQUEST));
        }
    });
}

export default {
    createReport,
    getDetails,
    list,
    updateStatus
} as const;