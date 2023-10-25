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
const helpers_1 = require("../../utils/helpers");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Offers
 *
 * @param
 * @returns
 */
// Add offers by vendor
function AddOfferByVendor(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const count = yield index_1.offerModel.countDocuments();
            const offerId = (0, helpers_1.identityGenerator)(count, "Id");
            var obj = {
                vendorId: userId,
                offer_token: offerId,
                name: data.name,
                lower_name: data.name.toLowerCase(),
                meso_name: data.meso_name,
                meso_lower_name: data.meso_name.toLowerCase(),
                description: data.description,
                meso_description: data.meso_description,
                min_order_amount: data.min_order_amount,
                max_offer_amount: data.max_offer_amount,
                offer_per: data.offer_per,
                start_date: data.start_date,
                end_data: data.end_data,
                image: image[0].path
            };
            var saveData = yield new index_1.offerModel(obj).save();
            resolve({ result: saveData });
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
// Edit offer by vendor
function EditOfferByVendor(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.offerId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var offer = yield index_1.offerModel.findOne({ '_id': data.offerId, 'vendorId': userId, 'isActive': true, 'isDelete': false });
            if (offer) {
                var obj = {
                    name: data.name ? data.name : offer.name,
                    lower_name: data.name.toLowerCase() ? data.name.toLowerCase() : offer.lower_name,
                    meso_name: data.meso_name ? data.meso_name : offer.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase() ? data.meso_name.toLowerCase() : offer.meso_lower_name,
                    description: data.description ? data.description : offer.description,
                    meso_description: data.meso_description ? data.meso_description : offer.meso_description,
                    min_order_amount: data.min_order_amount ? data.min_order_amount : offer.min_order_amount,
                    max_offer_amount: data.max_offer_amount ? data.max_offer_amount : offer.max_offer_amount,
                    offer_per: data.offer_per ? data.offer_per : offer.offer_per,
                    start_date: data.start_date ? data.start_date : offer.start_date,
                    end_data: data.end_data ? data.end_data : offer.end_data,
                    image: image[0].path ? image[0].path : offer.image
                };
                yield index_1.offerModel.updateOne({ '_id': data.offerId }, obj);
                var offerData = yield index_1.offerModel.findOne({ '_id': data.offerId });
                resolve({ result: offerData });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
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
// Vendor offer lists
function GetOfferListingByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var offers = yield index_1.offerModel.find({ 'vendorId': userId, 'isDelete': false }, { 'lower_name': 0, 'meso_lower_name': 0, 'vendorId': 0, 'createdAt': 0, 'updatedAt': 0 }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var offerCount = yield index_1.offerModel.countDocuments({ 'vendorId': userId, 'isDelete': false });
            if (offers && offers.length) {
                resolve({ result: offers, count: offerCount });
            }
            else {
                reject({ result: [], count: 0 });
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
// Get offer details
function GetOfferDetailsByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.offerId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var offer = yield index_1.offerModel.findOne({ '_id': data.offerId, 'vendorId': userId }, { 'lower_name': 0, 'meso_lower_name': 0, 'vendorId': 0, 'createdAt': 0, 'updatedAt': 0 });
            if (offer) {
                resolve({ result: offer });
            }
            else {
                resolve({ result: {} });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
    }));
}
// Update offer status
function updateOfferStatusByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)('language');
            if (!userId || !data.offerId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.offerModel.updateOne({ '_id': data.offerId, 'vendorId': userId }, { 'isActive': data.status });
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
// Delete offer by vendor
function DeleteOfferByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.offerId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.offerModel.updateOne({ '_id': data.offerId, 'vendorId': userId }, { 'isDelete': false });
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
// Get vendor offers by user
function getOffersByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.vendorId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var offers = yield index_1.offerModel.find({ 'vendorId': data.vendorId, 'isActive': true, 'isDelete': false }, { 'vendorId': 0, 'lower_name': 0, 'meso_lower_name': 0, 'isDelete': 0, 'createdAt': 0, 'updatedAt': 0 });
            var offerCount = yield index_1.offerModel.countDocuments({ 'vendorId': data.vendorId, 'isActive': true, 'isDelete': false });
            if (offers && offers.length) {
                resolve({ resolve: offers, count: offerCount });
            }
            else {
                resolve({ result: [], count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
    }));
}
// Get offer details by user
function getOfferDetailsByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || data.offerId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var offerDetails = yield index_1.offerModel.findOne({ '_id': data.offerId, 'isActive': true, 'isDelete': false }, { 'vendorId': 0, 'lower_name': 0, 'meso_lower_name': 0, 'isDelete': 0, 'createdAt': 0, 'updatedAt': 0 });
            if (offerDetails) {
                resolve({ result: offerDetails });
            }
            else {
                resolve({ result: {} });
            }
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
    AddOfferByVendor,
    EditOfferByVendor,
    GetOfferListingByVendor,
    GetOfferDetailsByVendor,
    updateOfferStatusByVendor,
    DeleteOfferByVendor,
    getOffersByUser,
    getOfferDetailsByUser
};
