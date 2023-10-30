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
 * Add item addOns category by vendor
 *
 * @param
 * @returns
 */
function AddItemAddOnsCategory(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var addOns_category = yield index_1.addOns_categoryModel.find({ 'vendorId': userId, 'itemId': data.itemId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns_category && addOns_category.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: userId,
                    itemId: data.itemId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    quantity: data.quantity,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                };
                var save_data = yield new addOns_category(obj).save();
                yield index_1.itemModel.updateOne({ '_id': data.itemId }, { $inc: { 'addOn_Cat_count': 1 } });
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
// Get Item AddOns Category by vendor
function getAddOns_CategoryByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.find({ 'vendorId': userId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const itemAddOnsCategoryCount = yield index_1.addOns_categoryModel.countDocuments({ 'vendorId': userId, 'isDelete': false });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                resolve({ result: itemAddOnsCategory, count: itemAddOnsCategoryCount });
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
// Edit item addOns category by vendor
function EditItemAddOnsCategoryByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.itemAddOnsCategoryId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.find({ 'vendorId': userId, '_id': { $ne: data.itemAddOnsCategoryId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    quantity: data.quantity,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                };
                yield index_1.addOns_categoryModel.updateOne({ '_id': data.itemAddOnsCategoryId, 'vendorId': userId }, obj);
                var data = yield index_1.addOns_categoryModel.findOne({ '_id': data.itemCategoryId });
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
// Get Item addons category detail
function getItemAddOnsCategoryDetails(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemAddOnsCategoryId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.findOne({ 'vendorId': userId, '_id': data.itemAddOnsCategoryId, 'isDelete': false });
            if (itemAddOnsCategory) {
                resolve({ result: itemAddOnsCategory });
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
// Active or deactive item addons category
function ActiveDeactiveItemAddOnsCategory(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemAddOnsCategoryId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.updateOne({ 'vendorId': userId, '_id': data.itemAddOnsCategoryId }, { 'isActive': data.status });
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
// Export default
exports.default = {
    AddItemAddOnsCategory,
    getAddOns_CategoryByVendor,
    EditItemAddOnsCategoryByVendor,
    getItemAddOnsCategoryDetails,
    ActiveDeactiveItemAddOnsCategory
};
