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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("../../constants/index");
const bankDetails_1 = __importDefault(require("../../models/bankDetails"));
const users_1 = __importDefault(require("../../models/users"));
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
const http_status_codes_1 = require("http-status-codes");
const toatalBranch = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield users_1.default.findOne({ _id: vendorId }, { totalBranch: 1 });
    yield users_1.default.updateOne({ _id: vendorId }, { totalBranch: details.totalBranch + 1 });
});
function list(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, search } = query;
            let obj = { isDelete: false, branchType: 'Main', role: 'vendor' };
            if (search) {
                obj = Object.assign(Object.assign({}, obj), { $or: [
                        { restaurantName: { '$regex': search, '$options': "i" } },
                        { restaurant_mesoName: { '$regex': search, '$options': "i" } }
                    ] });
            }
            const data = yield users_1.default.aggregate([
                {
                    $match: obj
                },
                { $sort: { createdAt: -1 } },
                {
                    $skip: ((Number(perPage) * Number(page)) - Number(perPage))
                },
                { $limit: Number(perPage) }
            ]);
            const count = yield users_1.default.countDocuments(obj);
            resolve({ data: data, count: count });
        }
        catch (err) {
            reject(err);
        }
    }));
}
function addResturant(body, restaurantImage, branchImage) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!restaurantImage) {
                reject(new errors_1.CustomError('RestaurantImage required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            if (!branchImage) {
                reject(new errors_1.CustomError('BranchImage required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const { phoneNumber, countryCode } = body;
            const check = yield users_1.default.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, role: 'vendor' });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.accountAlreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const restaurantNo = (0, helpers_1.randomString)(4, '#');
                const obj = Object.assign(Object.assign({}, body), { restaurantImage: restaurantImage[0].path ? restaurantImage[0].path : "", role: "vendor", addBy: "Admin", branchNo: restaurantNo, branchDetails: {
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
                    } });
                const add = yield users_1.default.create(obj);
                const bankDetails = {
                    vendorId: add._id,
                    bankDetails: {
                        bankName: body.bankName,
                        IFSC_code: body.IFSC_code,
                        cr_number: body.cr_number,
                        branchNumber: body.branchNumber,
                        accountNumber: body.accountNumber
                    }
                };
                yield bankDetails_1.default.create(bankDetails);
                resolve(add);
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function editResturant(body, restaurantImage) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            // if (!restaurantImage) {
            //     reject(new CustomError('Restaurant Image required', StatusCodes.BAD_REQUEST))
            // }
            const { vendorId } = body;
            const check = yield users_1.default.findOne({ _id: vendorId, isDelete: false, role: 'vendor' });
            if (restaurantImage) {
                var image = restaurantImage[0].path;
            }
            else {
                var image = check.restaurantImage;
            }
            if (!check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const obj = {
                    adminPercentage: body.adminPercentage,
                    restaurantImage: image,
                };
                yield users_1.default.updateOne({ _id: vendorId }, obj);
                resolve({ success: true });
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function addResturant_branch(body, branchImage) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!branchImage) {
                reject(new errors_1.CustomError('BranchImage required', http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const { phoneNumber, countryCode } = body;
            const check = yield users_1.default.findOne({ phoneNumber: phoneNumber, countryCode: countryCode, isDelete: false, role: 'vendor' });
            if (check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.accountAlreadyExist, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const restaurantNo = (0, helpers_1.randomString)(4, '#');
                const obj = Object.assign(Object.assign({}, body), { branchNo: restaurantNo, role: "vendor", addBy: "Admin", branchType: "Sub", branchDetails: {
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
                    } });
                console.log(obj, "obj----");
                const add = yield users_1.default.create(obj);
                const bankDetails = {
                    vendorId: add._id,
                    bankDetails: {
                        bankName: body.bankName,
                        IFSC_code: body.IFSC_code,
                        cr_number: body.cr_number,
                        branchNumber: body.branchNumber,
                        accountNumber: body.accountNumber
                    }
                };
                yield bankDetails_1.default.create(bankDetails);
                toatalBranch(body.vendorId);
                resolve(add);
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function branchList(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, perPage = 10, vendorId } = query;
            if (!vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const data = yield users_1.default.find({ $or: [{ vendorId: vendorId }, { _id: vendorId }], isDelete: false }, { vendorId: 1, branchType: 1, "branchDetails.max_deliveryTime": 1, "branchDetails.minimum_orderAmount": 1, "branchDetails.openingTime": 1, "branchDetails.closingTime": 1, "branchDetails.status": 1, "branchDetails.branchImage": 1, "branchDetails.paymentMehod": 1, "branchDetails.addressDetails": 1, status: 1, itemId: 1, branchNo: 1, restaurantName: 1 }).sort({ createdAt: -1 }).skip((page * perPage) - perPage).limit(perPage);
            const count = yield users_1.default.countDocuments({ $or: [{ vendorId: vendorId }, { _id: vendorId }], isDelete: false });
            resolve({ data: data, count: count });
        }
        catch (err) {
            reject(err);
        }
    }));
}
function details(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!query.vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            const data = yield users_1.default.findOne({ _id: query.vendorId, isDelete: false });
            if (data)
                resolve(data);
            else
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        catch (err) {
            reject(err);
        }
    }));
}
function documents_upload(body, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!body.vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else if (!image) {
                reject(new errors_1.CustomError("Image required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const data = yield users_1.default.findOne({ _id: body.vendorId, isDelete: false });
                if (data) {
                    yield users_1.default.updateOne({ _id: body.vendorId, isDelete: false }, { documents: image[0].path, document_status: true });
                    resolve({ success: true });
                }
                else {
                    reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function documents_upload_body(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(body, "'slslsls");
            if (!body.vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else if (!body.image) {
                reject(new errors_1.CustomError("Image required", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                const data = yield users_1.default.findOne({ _id: body.vendorId, isDelete: false });
                if (data) {
                    yield users_1.default.updateOne({ _id: body.vendorId, isDelete: false }, { documents: body.image, document_status: true });
                    resolve({ success: true });
                }
                else {
                    reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function updateStatus(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const check = yield users_1.default.findOne({ _id: body.vendorId, isDelete: false });
            if (check) {
                yield users_1.default.updateOne({ _id: body.vendorId }, { status: body.status });
                resolve({ success: true });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function editResturant_branch(body, branchImage) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            // if (!branchImage) {
            //     reject(new CustomError('BranchImage required', StatusCodes.BAD_REQUEST))
            // }
            const { vendorId } = body;
            const check = yield users_1.default.findOne({ _id: vendorId, isDelete: false, role: 'vendor' });
            if (!check) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
            else {
                if (!branchImage) {
                    var image = check.branchDetails.branchImage;
                }
                else {
                    var image = branchImage[0].path;
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
                };
                yield users_1.default.updateOne({ _id: vendorId }, obj);
                resolve({ success: true });
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
exports.default = {
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
};
