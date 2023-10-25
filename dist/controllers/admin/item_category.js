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
 * Add item category by Admin
 *
 * @param
 * @returns
 */
// const deleteItem = async (item_categoryId: any, vendorId: any, itemId: any) => {
//     const item = await itemModel.find({ catId: item_categoryId, vendorId: vendorId, isDelete: false }, { name: 1 });
//     var arr1 = itemId
//     var arr2: any = []
//     item.map((data: any) => {
//         arr2.push(data._id)
//     })
//     console.log(arr1, "kks", arr2)
//     // Convert ObjectIds to strings
//     const arr1Strings: any = arr1.map((id: any) => id.toString());
//     const arr2Strings = arr2.map((id: any) => id.toString());
//     // Use filter to get elements from arr2 that are not in arr1
//     var arrStrings = arr1Strings.filter((item: any) => !arr2Strings.includes(item));
//     const result = arrStrings.map((id: any) => new ObjectId(id));
//     console.log(result, "lkk");
//     await userModel.updateOne({ _id: vendorId }, { itemId: result })
// }
// const update_catId = async (vendorId: any, catId: any) => {
//     const userDetails: any = await userModel.findOne({ _id: vendorId });
//     const all_catId = userDetails.categoryId
//     const arr = [catId.toString()]
//     const merge = [...all_catId, ...arr]
//     await userModel.updateOne({ _id: vendorId }, { categoryId: merge })
// }
function AddItemCategory(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var itemCategory = yield index_1.item_categoryModel.find({ 'vendorId': data.vendorId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace("{{catName}}", "this"), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    vendorId: data.vendorId,
                    name: data.name,
                    addBy: 'Admin',
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                };
                var save_data = yield new index_1.item_categoryModel(obj).save();
                yield index_1.userModel.updateOne({ _id: data.vendorId }, { $push: { 'categoryId': save_data._id } });
                resolve(save_data);
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Item Category by admin
function ItemCategoryList(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const pageNo = data.page ? data.page : 1;
            const perPage = data.perPage ? data.perPage : 10;
            var array = [];
            var obj = {};
            const itemCategory = yield index_1.item_categoryModel.find({ 'vendorId': data.vendorId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const itemCategoryCount = yield index_1.item_categoryModel.countDocuments({ 'vendorId': data.vendorId, 'isDelete': false });
            if (itemCategory && itemCategory.length) {
                // await Promise.all(itemCategory.map(async (data: any) => {
                //     console.log(data._id, "slslslsls")
                //     const itemList = await itemModel.find({ catId: data._id, isDelete: false });
                //     obj = {
                //         catDetails: data._id,
                //         itemDetails: itemList
                //     }
                //     array.push(obj)
                // }))
                for (let i = 0; i < itemCategory.length; i++) {
                    const itemList = yield index_1.itemModel.find({ catId: itemCategory[i]._id, isDelete: false });
                    obj = {
                        catDetails: itemCategory[i],
                        itemDetails: itemList
                    };
                    array.push(obj);
                }
                resolve({ array, count: itemCategoryCount });
            }
            else {
                resolve({ result: [], count: 0 });
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
// Edit item category by vendor
function EditItemCategory(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const itemCategory = yield index_1.item_categoryModel.find({ 'vendorId': data.vendorId, '_id': { $ne: data.itemCategoryId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.categoryWithSameName.replace("{{catName}}", "this"), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                };
                yield index_1.item_categoryModel.updateOne({ '_id': data.itemCategoryId, 'vendorId': data.vendorId }, obj);
                var data1 = yield index_1.item_categoryModel.findOne({ '_id': data.itemCategoryId });
                if (data1) {
                    resolve(data1);
                }
                else {
                    resolve(data1);
                }
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
// Get Item category detail
function getItemCategoryDetails(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const itemCategory = yield index_1.item_categoryModel.findOne({ 'vendorId': data.vendorId, '_id': data.itemCategoryId, 'isDelete': false });
            if (itemCategory) {
                resolve(itemCategory);
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
// Delete item category
function deleteItemCategory(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const check = yield index_1.userModel.findOne({ _id: data.vendorId }, { categoryId: 1, itemId: 1 });
            if (check) {
                const item = yield index_1.itemModel.find({ catId: data.itemCategoryId, isDelete: false }, { catId: 1 });
                const removeItem = [];
                item.map((id) => {
                    removeItem.push(id._id);
                });
                console.log(removeItem, "remove");
                yield index_1.item_categoryModel.updateOne({ 'vendorId': data.vendorId, '_id': data.itemCategoryId }, { 'isDelete': true });
                yield index_1.userModel.updateOne({ _id: data.vendorId }, { $pull: { 'categoryId': new ObjectId(data.itemCategoryId), 'itemId': { $in: removeItem } } });
                resolve({ success: true });
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
// const array = [2, 3, 4, 5, 3, 2, 1, 3, 4, 5, 6, , 7, 7, 8, 2, 3, 5, 6, 7, 8, 9, 8, 76, 5, 5, 4, 4, 9, 9]
// var elementCounts = {}
// array.forEach(function (element: any) {
//     if (elementCounts[element] === undefined) {
//         elementCounts[element] = 1
//     } else {
//         elementCounts[element]++;
//     }
// })
// var uniqueArray = array.filter(function(element){
//     return elementCounts[element] === 1
// })
// console.log(uniqueArray)
// Export default
exports.default = {
    AddItemCategory,
    ItemCategoryList,
    EditItemCategory,
    getItemCategoryDetails,
    deleteItemCategory
};
