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
// import { errors.ens } from "@Custom_errors.en";
const mongoose_1 = __importDefault(require("mongoose"));
const _constants_1 = require("../../constants/index");
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item menu size
 *
 * @param
 * @returns
 */
function AddItemMenuSize(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': data.vendorId, isDelete: false, 'itemId': data.itemId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: data.vendorId,
                    itemId: data.itemId,
                    name: data.name,
                    addBy: "Admin",
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
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// List Item Menu size by vendor based on item
function listMenuSize(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const page = data.page ? data.page : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': data.vendorId, 'itemId': data.itemId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (page - 1)).limit(perPage);
            const menu_sizeCount = yield index_1.menu_sizeModel.countDocuments({ 'vendorId': data.vendorId, 'itemId': data.itemId, 'isDelete': false });
            if (menu_size && menu_size.length) {
                resolve({ result: menu_size, count: menu_sizeCount });
            }
            else {
                resolve({ result: [], count: menu_sizeCount });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Edit item Menu size
function EditItemMenuSize(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const menu_size = yield index_1.menu_sizeModel.find({ 'vendorId': data.vendorId, '_id': { $ne: data.menu_sizeId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    price: data.price,
                    meso_lower_name: data.meso_name.toLowerCase()
                };
                yield index_1.menu_sizeModel.updateOne({ '_id': data.menu_sizeId, 'vendorId': data.vendorId }, obj);
                resolve({ success: true });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Get Item Menu Size detail
function getItemMenuSizeDetails(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const menu_size = yield index_1.menu_sizeModel.findOne({ 'vendorId': data.vendorId, '_id': data.menu_sizeId, 'isDelete': false });
            if (menu_size) {
                resolve({ result: menu_size });
            }
            else {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Delete item menu size
function DeleteItemMenuSize(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const menu_size = yield index_1.menu_sizeModel.updateOne({ 'vendorId': data.vendorId, '_id': data.menu_sizeId }, { 'isDelete': true });
            var menuSizeData = yield index_1.menu_sizeModel.findOne({ '_id': data.menu_sizeId }, { 'itemId': 1 });
            if (menuSizeData) {
                yield index_1.itemModel.updateOne({ '_id': menuSizeData.itemId }, { $inc: { 'menuSize_count': -1 } });
            }
            resolve({ success: true });
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(_constants_1.errors.en.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    AddItemMenuSize,
    listMenuSize,
    EditItemMenuSize,
    getItemMenuSizeDetails,
    DeleteItemMenuSize,
};
