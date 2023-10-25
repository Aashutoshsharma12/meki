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
// sswdlkjdmewkdiewod32o
/**
 * Add item addOns  by Admin
 *
 * @param
 * @returns
 */
function AddItemAddOns(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            var addOns = yield index_1.addOnsModel.find({ 'vendorId': vendorId, itemId: data.itemId, addOns_CatId: data.addOns_CatId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns && addOns.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace('{{catName}}', 'this'), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: vendorId,
                    addOns_CatId: data.addOns_CatId,
                    itemId: data.itemId,
                    name: data.name,
                    addBy: "Admin",
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                };
                var save_data = yield new index_1.addOnsModel(obj).save();
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
// List Item AddOns   
function listAddOns_Category(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const itemAddOnsCategory = yield index_1.addOns_categoryModel.find({ 'vendorId': data.vendorId, isDelete: false }).sort({ 'createdAt': -1 });
            const itemAddOnsCategoryCount = yield index_1.addOns_categoryModel.countDocuments({ 'vendorId': data.vendorId, isDelete: false });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                resolve({ result: itemAddOnsCategory, count: itemAddOnsCategoryCount });
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
// Edit item addOns
function EditItemAddOns(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            // console.log(vendorId,"vendorId",data.itemId,"data.itemId",data.addaddons_catId,"addaddons_catId",data.addonsId,"addonsId")
            const itemAddOnsCategory = yield index_1.addOnsModel.find({ 'vendorId': vendorId, itemId: data.itemId, addOns_CatId: data.addOns_CatId, isDelete: false, '_id': { $ne: data.addonsId }, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            console.log(itemAddOnsCategory, "ite");
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace('{{catName}}', 'this'), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    addOns_CatId: data.addOns_CatId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                };
                yield index_1.addOnsModel.updateOne({ '_id': data.addonsId, 'vendorId': vendorId, isDelete: false }, obj);
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
// Get Item addons detail
function getItemAddOnsDetails(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { vendorId } = data;
            const itemAddOns = yield index_1.addOnsModel.findOne({ 'vendorId': vendorId, isDelete: false, '_id': data.addonsId });
            if (itemAddOns) {
                resolve({ result: itemAddOns });
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
// Delete addons
function DeleteItemAddons(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield index_1.addOnsModel.updateOne({ 'vendorId': data.vendorId, '_id': data.addonsId }, { 'isDelete': true });
            // await userModel.updateOne({ '_id': data.vendorId }, { $pull: { 'itemId': new ObjectId(data.itemId )} });
            resolve({ result: { 'isDelete': true } });
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
    AddItemAddOns,
    listAddOns_Category,
    EditItemAddOns,
    getItemAddOnsDetails,
    DeleteItemAddons
};
