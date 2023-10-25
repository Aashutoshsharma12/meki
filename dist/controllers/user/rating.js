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
 * Add Rating by user
 *
 * @param Rating
 * @returns
 */
function AddRatingByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.rating || !data.vendorId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const rating = yield index_1.ratingModel.findOne({ 'userId': userId, 'vendorId': data.vendorId, 'orderId': data.orderId });
            if (rating) {
                reject(new errors_1.CustomError(message.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    'rating': data.rating,
                    'desc': data.desc,
                    'userId': userId,
                    'vendorId': data.vendorId,
                    'orderId': data.orderId,
                    'isActive': true,
                    'isDelete': false
                };
                var addRating = yield new index_1.ratingModel(obj).save();
                var avgRating = yield index_1.ratingModel.aggregate([
                    {
                        $match: { 'vendorId': new ObjectId(data.vendorId) }
                    },
                    {
                        $group: {
                            ratingAvg: { $avg: '$rating' }
                        }
                    }
                ]);
                if (avgRating && avgRating.length) {
                    yield index_1.userModel.updateOne({ '_id': data.vendorId }, { 'rating': avgRating[0].ratingAvg });
                }
                resolve({ data: addRating });
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
// Get rating by vendor
function getRatingByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const rating = yield index_1.ratingModel.find({ 'vendorId': userId }).populate([{ path: 'userId', select: 'name' }, { path: 'orderId' }]).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const avgRating = yield index_1.ratingModel.aggregate([
                {
                    $match: {
                        'vendorId': new ObjectId(userId)
                    }
                },
                {
                    $group: {
                        ratingAvg: { $avg: '$rating' }
                    }
                }
            ]);
            if (rating && rating.length) {
                if (avgRating && avgRating.length) {
                    resolve({ rating: rating, AvgRating: avgRating[0].ratingAvg });
                }
                else {
                    resolve({ rating: rating, AvgRating: 0 });
                }
            }
            else {
                resolve({ 'rating': {}, AvgRating: 0 });
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
// Export default
exports.default = {
    AddRatingByUser,
    getRatingByVendor
};
