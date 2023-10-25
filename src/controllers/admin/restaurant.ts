import { errors } from "@constants";
import bank_detailsModel from "@models/bankDetails";
import userModel from "@models/users";
import { CustomError } from "@utils/errors";
import { randomString } from "@utils/helpers";
import { StatusCodes } from "http-status-codes";
const toatalBranch = async (vendorId: any) => {
    const details: any = await userModel.findOne({ _id: vendorId }, { totalBranch: 1 });
    await userModel.updateOne({ _id: vendorId }, { totalBranch: details.totalBranch + 1 })
}

function list(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, search } = query
            let obj: any = { isDelete: false, branchType: 'Main', role: 'vendor' }
            if (search) {
                obj = {
                    ...obj,
                    $or: [
                        { restaurantName: { '$regex': search, '$options': "i" } },
                        { restaurant_mesoName: { '$regex': search, '$options': "i" } }
                    ]
                }
            }

            const data = await userModel.aggregate([
                {
                    $match: obj
                },
                { $sort: { createdAt: -1 } },
                {
                    $skip: ((Number(perPage) * Number(page)) - Number(perPage))
                },
                { $limit: Number(perPage) }
            ]);
            const count = await userModel.countDocuments(obj);
            resolve({ data: data, count: count });
        } catch (err) {
            reject(err)
        }
    })
}

function addResturant(body: any, restaurantImage: any, branchImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!restaurantImage) {
                reject(new CustomError('RestaurantImage required', StatusCodes.BAD_REQUEST))
            }
            if (!branchImage) {
                reject(new CustomError('BranchImage required', StatusCodes.BAD_REQUEST))
            }
            const { phoneNumber, countryCode } = body
            const check = await userModel.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, role: 'vendor' });
            if (check) {
                reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const restaurantNo = randomString(4, '#')
                const obj = {
                    ...body,
                    restaurantImage: restaurantImage[0].path ? restaurantImage[0].path : "",
                    role: "vendor",
                    addBy: "Admin",
                    branchNo: restaurantNo,
                    branchDetails: {
                        delivery_charges: body.delivery_charges,
                        minimum_orderAmount: body.minimum_orderAmount,
                        openingTime: body.openingTime,
                        closingTime: body.closingTime,
                        mobileNo: body.mobileNo,
                        countryCode: body.mobile_countryCode,
                        max_deliveryTime: body.max_deliveryTime,
                        branchImage: branchImage[0].path ? branchImage[0].path : "",
                        paymentMehod: body.paymentMehod.split(','),
                        addressDetails: {
                            country: body.country,
                            addressLine1: body.fullAddress,
                            addressLine2: body.fullAddress,
                            city: body.city,
                            state: body.state,
                            zipCode: body.zipCode,
                            fullAddress: body.fullAddress
                        }
                    }
                }
                const add = await userModel.create(obj);
                const bankDetails = {
                    vendorId: add._id,  //restaurantId
                    bankDetails: {
                        bankName: body.bankName,
                        IFSC_code: body.IFSC_code,
                        cr_number: body.cr_number,
                        branchNumber: body.branchNumber,
                        accountNumber: body.accountNumber
                    }
                }
                await bank_detailsModel.create(bankDetails);
                resolve(add)
            }
        } catch (err) {
            reject(err)
        }
    })
}

function editResturant(body: any, restaurantImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            // if (!restaurantImage) {
            //     reject(new CustomError('Restaurant Image required', StatusCodes.BAD_REQUEST))
            // }
            const { vendorId } = body
            const check: any = await userModel.findOne({ _id: vendorId, isDelete: false, role: 'vendor' });
            if (restaurantImage) {
                var image = restaurantImage[0].path
            } else {
                var image = check.restaurantImage
            }
            if (!check) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            } else {
                const obj = {
                    adminPercentage: body.adminPercentage,
                    restaurantImage: image,
                }
                await userModel.updateOne({ _id: vendorId }, obj);
                resolve({ success: true })
            }
        } catch (err) {
            reject(err)
        }
    })
}

function addResturant_branch(body: any, branchImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!branchImage) {
                reject(new CustomError('BranchImage required', StatusCodes.BAD_REQUEST))
            }
            const { phoneNumber, countryCode } = body
            const check = await userModel.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, role: 'vendor' });
            if (check) {
                reject(new CustomError(errors.en.accountAlreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                const restaurantNo = randomString(4, '#')
                const obj = {
                    ...body,
                    branchNo: restaurantNo,
                    role: "vendor",
                    addBy: "Admin",
                    branchType: "Sub",
                    branchDetails: {
                        delivery_charges: body.delivery_charges,
                        minimum_orderAmount: body.minimum_orderAmount,
                        openingTime: body.openingTime,
                        closingTime: body.closingTime,
                        mobileNo: body.mobileNo,
                        countryCode: body.mobile_countryCode,
                        max_deliveryTime: body.max_deliveryTime,
                        branchImage: branchImage[0].path ? branchImage[0].path : "",
                        paymentMehod: body.paymentMehod.split(','),
                        addressDetails: {
                            country: body.country,
                            addressLine1: body.fullAddress,
                            addressLine2: body.fullAddress,
                            city: body.city,
                            state: body.state,
                            zipCode: body.zipCode,
                            fullAddress: body.fullAddress
                        }
                    }
                }
                console.log(obj,"obj----")
                const add = await userModel.create(obj);
                const bankDetails = {
                    vendorId: add._id,  //restaurantId
                    bankDetails: {
                        bankName: body.bankName,
                        IFSC_code: body.IFSC_code,
                        cr_number: body.cr_number,
                        branchNumber: body.branchNumber,
                        accountNumber: body.accountNumber
                    }
                }
                await bank_detailsModel.create(bankDetails);
                toatalBranch(body.vendorId);
                resolve(add)
            }
        } catch (err) {
            reject(err)
        }
    })
}

function branchList(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { page = 1, perPage = 10, vendorId } = query
            if (!vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST))
            }
            const data = await userModel.find({ $or: [{ vendorId: vendorId }, { _id: vendorId }], isDelete: false }, { vendorId: 1, branchType: 1, "branchDetails.max_deliveryTime": 1, "branchDetails.minimum_orderAmount": 1, "branchDetails.openingTime": 1, "branchDetails.closingTime": 1, "branchDetails.status": 1, "branchDetails.branchImage": 1, "branchDetails.paymentMehod": 1, "branchDetails.addressDetails": 1, status: 1, itemId: 1, branchNo: 1, restaurantName: 1 }).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            const count = await userModel.countDocuments({ $or: [{ vendorId: vendorId }, { _id: vendorId }], isDelete: false })
            resolve({ data: data, count: count })
        } catch (err) {
            reject(err);
        }
    })
}

function details(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!query.vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST));
            }
            const data = await userModel.findOne({ _id: query.vendorId, isDelete: false });
            if (data)
                resolve(data)
            else
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
        } catch (err) {
            reject(err);
        }
    });
}

function documents_upload(body: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!body.vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST));
            } else if (!image) {
                reject(new CustomError("Image required", StatusCodes.BAD_REQUEST));
            } else {
                const data = await userModel.findOne({ _id: body.vendorId, isDelete: false });
                if (data) {
                    await userModel.updateOne({ _id: body.vendorId, isDelete: false }, { documents: image[0].path, document_status: true });
                    resolve({ success: true })
                } else {
                    reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
                }
            }
        } catch (err) {
            reject(err);
        }
    });
}
function documents_upload_body(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(body,
                "'slslsls")
            if (!body.vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST));
            } else if (!body.image) {
                reject(new CustomError("Image required", StatusCodes.BAD_REQUEST));
            } else {
                const data = await userModel.findOne({ _id: body.vendorId, isDelete: false });
                if (data) {
                    await userModel.updateOne({ _id: body.vendorId, isDelete: false }, { documents: body.image, document_status: true });
                    resolve({ success: true })
                } else {
                    reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
                }
            }
        } catch (err) {
            reject(err);
        }
    });
}

function updateStatus(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await userModel.findOne({ _id: body.vendorId, isDelete: false });
            if (check) {
                await userModel.updateOne({ _id: body.vendorId }, { status: body.status });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            reject(err)
        }
    })
}

function editResturant_branch(body: any, branchImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            // if (!branchImage) {
            //     reject(new CustomError('BranchImage required', StatusCodes.BAD_REQUEST))
            // }
            const { vendorId } = body
            const check = await userModel.findOne({ _id: vendorId, isDelete: false, role: 'vendor' });
            if (!check) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            } else {
                if (!branchImage) {
                    var image = check.branchDetails.branchImage
                } else {
                    var image = branchImage[0].path
                }
                const obj = {
                    branchDetails: {
                        delivery_charges: body.delivery_charges,
                        minimum_orderAmount: body.minimum_orderAmount,
                        openingTime: body.openingTime,
                        closingTime: body.closingTime,
                        mobileNo: body.mobileNo,
                        countryCode: body.mobile_countryCode,
                        max_deliveryTime: body.max_deliveryTime,
                        branchImage: image,
                        paymentMehod: body.paymentMehod.split(','),
                        addressDetails: {
                            country: body.country ? body.country : check.branchDetails.country,
                            addressLine1: body.fullAddress ? body.fullAddress : check.branchDetails.fullAddress,
                            addressLine2: body.fullAddress ? body.fullAddress : check.branchDetails.fullAddress,
                            city: body.city ? body.city : check.branchDetails.city,
                            state: body.state ? body.state : check.branchDetails.state,
                            zipCode: body.zipCode ? body.zipCode : check.branchDetails.zipCode,
                            fullAddress: body.fullAddress ? body.fullAddress : check.branchDetails.fullAddress
                        }
                    },
                    lat: body.lat,
                    long: body.long
                }
                await userModel.updateOne({ _id: vendorId }, obj);
                resolve({ success: true })
            }
        } catch (err) {
            reject(err)
        }
    })
}


export default {
    list,
    addResturant,
    addResturant_branch,
    editResturant,
    editResturant_branch,
    branchList,
    details,
    documents_upload,
    updateStatus,
    documents_upload_body
} as const