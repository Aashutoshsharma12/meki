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
 * Add item addOns by vendor
 *
 * @param
 * @returns
 */
function AddItemAddOns(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.addOns_CatId || !data.price || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var addOns = yield index_1.addOnsModel.find({ 'vendorId': userId, 'addOns_CatId': data.addOns_CatId, 'itemId': data.itemId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns && addOns.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: userId,
                    itemId: data.itemId,
                    addOns_CatId: data.addOns_CatId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                };
                var save_data = yield new index_1.addOnsModel(obj).save();
                yield index_1.addOns_categoryModel.updateOne({ '_id': data.addOns_CatId }, { $inc: { 'addOns_count': 1 } });
                yield index_1.itemModel.updateOne({ '_id': data.itemId }, { $inc: { 'addOn_count': 1 } });
                resolve({ result: save_data });
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
// Get Item AddOns by vendor based on category
function getAddOnsByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.addOns_CatId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const addOns = yield index_1.addOnsModel.find({ 'vendorId': userId, 'addOns_CatId': data.addOns_CatId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const addOnsCount = yield index_1.addOnsModel.countDocuments({ 'vendorId': userId, 'addOns_CatId': data.addOns_CatId, 'isDelete': false });
            if (addOns && addOns.length) {
                resolve({ result: addOns, count: addOnsCount });
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
            reject(err);
        }
    }));
}
// Edit item addOns by vendor
function EditItemAddOnsByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.addOnsId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const addOns = yield index_1.addOnsModel.find({ 'vendorId': userId, '_id': { $ne: data.addOnsId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (addOns && addOns.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    price: data.price,
                    meso_lower_name: data.meso_name.toLowerCase()
                };
                yield index_1.addOnsModel.updateOne({ '_id': data.addOnsId, 'vendorId': userId }, obj);
                var data = yield index_1.addOnsModel.findOne({ '_id': data.addOnsId });
                if (data) {
                    resolve({ result: data });
                }
                else {
                    resolve({ result: data });
                }
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
// Get Item addons detail
function getItemAddOnsDetails(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.addOnsId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const addOns = yield index_1.addOnsModel.findOne({ 'vendorId': userId, '_id': data.addOnsId, 'isDelete': false });
            if (addOns) {
                resolve({ result: addOns });
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
            reject(err);
        }
    }));
}
// Active or deactive item addons
function ActiveDeactiveItemAddOns(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.addOnsId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const addOns = yield index_1.addOnsModel.updateOne({ 'vendorId': userId, '_id': data.addOnsId }, { 'isActive': data.status });
            resolve({ result: { 'isActive': data.status } });
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
// Delete item addons
function DeleteItemAddOns(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.addOnsId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const addOns = yield index_1.addOnsModel.updateOne({ 'vendorId': userId, '_id': data.addOnsId }, { 'isDelete': true });
            var addOnData = yield index_1.addOnsModel.findOne({ '_id': data.addOnsId }, { 'addOns_CatId': 1 });
            if (addOnData) {
                yield index_1.addOns_categoryModel.updateOne({ '_id': addOnData.addOns_CatId }, { $inc: { 'addOns_count': -1 } });
                yield index_1.itemModel.updateOne({ '_id': addOnData.itemId }, { $inc: { 'addOn_count': -1 } });
            }
            resolve({ result: { 'isDelete': true } });
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
    AddItemAddOns,
    getAddOnsByVendor,
    EditItemAddOnsByVendor,
    getItemAddOnsDetails,
    ActiveDeactiveItemAddOns,
    DeleteItemAddOns
};
