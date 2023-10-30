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
 * Add item by vendor
 *
 * @param
 * @returns
 */
function AddItemByVendor(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!data.name || !data.meso_name || !data.price || !data.catId || !data.menu_type || !data.catId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const item = yield index_1.itemModel.find({ 'vendorId': userId, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (item && item.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    catId: data.catId,
                    vendorId: userId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price,
                    menuType: data.menuType,
                    time: data.time,
                    description: data.description,
                    meso_description: data.meso_description,
                    quantity: data.quantity,
                    addOn_count: 0,
                    menuSize_count: 0,
                    image: image[0].path,
                    isActive: true,
                    isDelete: false
                };
                var saveItem = yield new index_1.itemModel(obj).save();
                yield index_1.userModel.updateOne({ '_id': userId }, { $push: { 'itemId': saveItem._id } });
                resolve({ result: saveItem });
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
// Get Item vendor
function getItemByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var items = yield index_1.itemModel.aggregate([
                {
                    $match: {
                        'vendorId': new ObjectId(userId), 'isDelete': false
                    }
                },
                {
                    $group: {
                        '_id': '$catId'
                    }
                },
                {
                    $project: {
                        'catId': 1,
                        'name': 1,
                        'meso_name': 1,
                        'menu_size_price': 1,
                        'price': 1,
                        'menuType': 1,
                        'time': 1,
                        'description': 1,
                        'meso_description': 1,
                        'quantity': 1,
                        'addOn_count': 1,
                        'menuSize_count': 1,
                        'image': 1
                    }
                },
                {
                    $sort: { 'createdAt': -1 }
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            var itemCount = yield index_1.itemModel.countDocuments({ 'vendorId': userId, 'isDelete': false });
            if (items && items.length) {
                resolve({ result: items, count: itemCount });
            }
            else {
                resolve({ result: items, count: itemCount });
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
// Edit item by vendor
function EditItemByVendor(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.name || !data.meso_name || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const items = yield index_1.itemModel.find({ 'vendorId': userId, '_id': { $ne: data.itemId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (items && items.length) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price,
                    menuType: data.menuType,
                    time: data.time,
                    description: data.description,
                    meso_description: data.meso_description,
                    quantity: data.quantity,
                    image: image ? image[0].path : data.oldImage,
                    isActive: true,
                    isDelete: false
                };
                yield index_1.itemModel.updateOne({ '_id': data.itemId, 'vendorId': userId }, obj);
                var data = yield index_1.itemModel.findOne({ '_id': data.itemId });
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
// Get Item detail
function getItemDetails(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const items = yield index_1.itemModel.findOne({ 'vendorId': userId, '_id': data.items, 'isDelete': false });
            if (items) {
                resolve({ result: items });
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
// Active or deactive item
function ActiveDeactiveItem(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const items = yield index_1.itemModel.updateOne({ 'vendorId': userId, '_id': data.itemId }, { 'isActive': data.status });
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
// Delete item
function DeleteItemMenu(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.itemId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const items = yield index_1.itemModel.updateOne({ 'vendorId': userId, '_id': data.itemId }, { 'isDelete': true });
            yield index_1.userModel.updateOne({ '_id': userId }, { $pull: { 'itemId': data.itemId } });
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
// Get Item vendor
function getItemByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var acuserId = data.userId;
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.itemId || !data.acuserId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var items = yield index_1.itemModel.aggregate([
                {
                    $match: {
                        'vendorId': new ObjectId(acuserId), 'isActive': true, 'isDelete': false
                    }
                },
                {
                    $group: {
                        '_id': '$catId'
                    }
                },
                {
                    $project: {
                        'catId': 1,
                        'name': 1,
                        'meso_name': 1,
                        'menu_size_price': 1,
                        'price': 1,
                        'menuType': 1,
                        'time': 1,
                        'description': 1,
                        'meso_description': 1,
                        'image': 1
                    }
                },
                {
                    $sort: { 'createdAt': -1 }
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            var itemCount = yield index_1.itemModel.countDocuments({ 'vendorId': userId, 'isActive': true, 'isDelete': false });
            if (items && items.length) {
                resolve({ result: items, count: itemCount });
            }
            else {
                resolve({ result: items, count: itemCount });
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
// Get menu list count for user
function getMenuListCountByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var vendorId = data.vendorId;
            if (!vendorId || !userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var menus = yield index_1.itemModel.aggregate([
                {
                    $lookup: {
                        from: 'catId',
                        localField: 'catId',
                        foreignField: 'category',
                        as: 'catData'
                    }
                },
                {
                    $group: {
                        '_id': '$catId',
                        'count': { $sum: 1 }
                    }
                },
                {
                    $match: { 'vendorId': new ObjectId(vendorId), 'isActive': true, 'isDelete': false }
                }
            ]);
            if (menus && menus.length) {
                resolve({ result: menus });
            }
            else {
                resolve({ result: [] });
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
    AddItemByVendor,
    getItemByVendor,
    EditItemByVendor,
    getItemDetails,
    ActiveDeactiveItem,
    DeleteItemMenu,
    getItemByUser,
    getMenuListCountByUser
};
