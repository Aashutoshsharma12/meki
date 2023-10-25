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
const mongoose_1 = __importDefault(require("mongoose"));
const _constants_1 = require("../../constants/index");
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item addOns category by Admin
 *
 * @param
 * @returns
 */
function AddItemAddOnsCategory(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            var addOns_category = yield index_1.addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns_category && addOns_category.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace('{{catName}}', 'this'), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: vendorId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    quantity: data.quantity,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    addBy: 'Admin',
                    // meso_description: data.meso_description,
                    position: data.position
                };
                var save_data = yield new index_1.addOns_categoryModel(obj).save();
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
// List Item AddOns Category 
function listAddOns_Category(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var obj = {};
            var array = [];
            const { vendorId, page = 1, perPage = 10, itemId } = data;
            if (!vendorId) {
                reject(new errors_1.CustomError("VendorId required", http_status_codes_1.default.BAD_REQUEST));
            }
            if (!itemId) {
                reject(new errors_1.CustomError("itemId required", http_status_codes_1.default.BAD_REQUEST));
            }
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false }).sort({ 'createdAt': -1 }).skip(perPage * (page - 1)).limit(perPage);
            const itemAddOnsCategoryCount = yield index_1.addOns_categoryModel.countDocuments({ 'vendorId': vendorId, isDelete: false });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                for (let i = 0; i < itemAddOnsCategory.length; i++) {
                    const addonsList = yield index_1.addOnsModel.find({ vendorId: vendorId, itemId: itemId, addOns_CatId: itemAddOnsCategory[i]._id, isDelete: false });
                    obj = {
                        addonsCat: itemAddOnsCategory[i],
                        addonsList: addonsList
                    };
                    array.push(obj);
                }
                resolve({ result: array, count: itemAddOnsCategoryCount });
            }
            else {
                resolve({ result: [], count: itemAddOnsCategoryCount });
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
// Edit item addOns category
function EditItemAddOnsCategory(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false, '_id': { $ne: data.catId }, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace('{{catName}}', 'this'), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    quantity: data.quantity,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    // description: data.description,
                    // meso_description: data.meso_description,
                    position: data.position
                };
                yield index_1.addOns_categoryModel.updateOne({ '_id': data.catId, 'vendorId': vendorId, isDelete: false }, obj);
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
// Get Item addons category detail
function getItemAddOnsCategoryDetails(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.findOne({ 'vendorId': vendorId, isDelete: false, '_id': data.catId });
            if (itemAddOnsCategory) {
                resolve({ result: itemAddOnsCategory });
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
// Export default
exports.default = {
    AddItemAddOnsCategory,
    listAddOns_Category,
    EditItemAddOnsCategory,
    getItemAddOnsCategoryDetails
};
