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
 * Add item menu size by vendor
 *
 * @param
 * @returns
 */
function AddItemMenuSize(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.itemId || !data.price) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': userId, 'itemId': data.itemId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: userId,
                    itemId: data.itemId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                };
                var save_data = yield new index_1.menu_sizeModel(obj).save();
                yield index_1.itemModel.updateOne({ '_id': data.itemId }, { $inc: { 'menuSize_count': 1 } });
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
// Get Item Menu size by vendor based on item
function getMenuSizeByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': userId, 'itemId': data.itemId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const menu_sizeCount = yield index_1.menu_sizeModel.countDocuments({ 'vendorId': userId, 'itemId': data.itemId, 'isDelete': false });
            if (menu_size && menu_size.length) {
                resolve({ result: menu_size, count: menu_sizeCount });
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
// Edit item Menu size by vendor
function EditItemMenuSizeByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.menu_sizeId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': userId, '_id': { $ne: data.menu_sizeId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
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
                yield index_1.menu_sizeModel.updateOne({ '_id': data.menu_sizeId, 'vendorId': userId }, obj);
                var data = yield index_1.menu_sizeModel.findOne({ '_id': data.menu_sizeId });
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
// Get Item Menu Size detail
function getItemMenuSizeDetails(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.menu_sizeId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.findOne({ 'vendorId': userId, '_id': data.menu_sizeId, 'isDelete': false });
            if (menu_size) {
                resolve({ result: menu_size });
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
// Active or deactive item Menu Size
function ActiveDeactiveItemMenuSize(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.menu_sizeId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.updateOne({ 'vendorId': userId, '_id': data.menu_sizeId }, { 'isActive': data.status });
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
// Delete item menu size
function DeleteItemMenuSize(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.menu_sizeId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.updateOne({ 'vendorId': userId, '_id': data.menu_sizeId }, { 'isDelete': true });
            var menuSizeData = yield index_1.menu_sizeModel.findOne({ '_id': data.menu_sizeId }, { 'itemId': 1 });
            if (menuSizeData) {
                yield index_1.itemModel.updateOne({ '_id': menuSizeData.itemId }, { $inc: { 'menuSize_count': -1 } });
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
// Get item menu size based on item
function getItemMenuSizeByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const menu_size = yield index_1.menu_sizeModel.find({ 'itemId': data.itemId, 'isActive': true, 'isDelete': false });
            var menuSizeData = yield index_1.menu_sizeModel.countDocuments({ 'itemId': data.itemId, 'isActive': true, 'isDelete': false });
            if (menu_size && menu_size.length) {
                resolve({ result: menu_size, count: menuSizeData });
            }
            else {
                resolve({ result: menu_size, count: menuSizeData });
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
    AddItemMenuSize,
    getMenuSizeByVendor,
    EditItemMenuSizeByVendor,
    getItemMenuSizeDetails,
    ActiveDeactiveItemMenuSize,
    DeleteItemMenuSize,
    getItemMenuSizeByUser
};
