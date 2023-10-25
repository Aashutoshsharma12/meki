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
const index_1 = require("../../models/index");
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const _Custom_message_1 = require("../../Custom_message/index");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * branch
 *
 * @param
 * @returns
 */
// Get Vendor branch
function GetVendorBranchs(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var branchs = yield index_1.userModel.find({ 'vendorId': userId, 'isDelete': false }, { 'name': 1, 'status': 1, 'isActive': 1, 'image': 1, 'branchId': 1, 'rating': 1 }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var branchCount = yield index_1.userModel.countDocuments({ 'vendorId': userId, 'isDelete': false });
            if (branchs && branchs.length) {
                resolve({ 'result': branchs, count: branchCount });
            }
            else {
                resolve({ 'result': {}, count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Get branch details by vendor
function GetBranchDetailsByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.branchId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var branch = yield index_1.userModel.findOne({ '_id': data.branchId }, { 'name': 1, 'image': 1, 'address': 1, 'rating': 1, 'branchId': 1 }).populate({ path: 'itemId', select: 'name' });
            if (branch) {
                var data = branch.toObject();
                var rating = yield index_1.ratingModel.aggregate([
                    {
                        $match: { 'vendorId': new ObjectId(data.branchId) }
                    },
                    {
                        $group: {
                            '_id': null,
                            'count': { $sum: 1 }
                        }
                    }
                ]);
                if (rating && rating.length) {
                    data.reviewCount = rating[0].count;
                }
                else {
                    data.reviewCount = 0;
                }
                var openClose = yield index_1.open_closingModel.findOne({ 'vendorId': data.branchId }, { 'isActive': 0, 'isDelete': 0, 'createdAt': 0, 'updatedAt': 0 });
                if (openClose) {
                    data.open_close = openClose;
                }
                else {
                    data.open_close = {};
                }
                resolve({ 'result': data });
            }
            else {
                resolve({ 'result': {} });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Edit branch image by vendor
function EditBranchImageByVendor(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.branchId || !image) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.userModel.updateOne({ '_id': data.branchId }, { $set: { 'image': image[0].path } });
            resolve({ result: {} });
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Edit branch number by vendor
function EditBranchMobileByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.branchId || !data.phoneNumber) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.userModel.updateOne({ '_id': data.branchId }, { 'phoneNumber': data.phoneNumber });
            resolve({ result: {} });
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
    }));
}
// Search vendor branch
function SearchVendorBranch(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.search) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var obj = { 'vendorId': userId, 'isDelete': false, 'lower_name': { $regex: data.search.toLowerCase(), $options: 'i' } };
            var branches = yield index_1.userModel.find(obj, { 'name': 1, 'status': 1, 'isActive': 1, 'image': 1, 'branchId': 1, 'rating': 1 }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var branchCount = yield index_1.userModel.countDocuments(obj);
            if (branches && branches.length) {
                resolve({ 'result': branches, count: branchCount });
            }
            else {
                resolve({ 'result': [], count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Update online offline status
function UpdateOnlineOfflineStatus(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.branchId || !data.status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.userModel.updateOne({ '_id': data.branchId }, { 'status': data.status });
            resolve({ 'result': {} });
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
    }));
}
// Export default
exports.default = {
    GetVendorBranchs,
    GetBranchDetailsByVendor,
    EditBranchImageByVendor,
    EditBranchMobileByVendor,
    SearchVendorBranch,
    UpdateOnlineOfflineStatus
};
