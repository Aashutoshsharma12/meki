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
const sharp_1 = __importDefault(require("sharp"));
const _ = require('lodash');
const d = (image) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(':s;s;s;s', image);
    (0, sharp_1.default)(image)
        .resize(200, 100)
        .toFile('output.jpg', (err, info) => {
        if (err) {
            console.error(err);
        }
    });
});
/**
 * Add item by Admin
 *
 * @param
 * @returns
 */
function AddItem(data, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('enter', data, "slslsls");
            if (!image) {
                reject(new errors_1.CustomError('Image Required', http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                // sharp('input.jpg')
                //     .resize(200, 100)
                //     .toFile('output.jpg', (err, info) => {
                //         if (err) {
                //             console.error(err);
                //         }
                //     });
                const item = yield index_1.itemModel.find({ 'vendorId': data.vendorId, 'catId': data.catId, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
                if (item && item.length) {
                    reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
                }
                else {
                    var obj = {
                        catId: data.catId,
                        vendorId: data.vendorId,
                        name: data.name,
                        lower_name: data.name.toLowerCase(),
                        meso_name: data.meso_name,
                        meso_lower_name: data.meso_name.toLowerCase(),
                        price: data.price,
                        menuType: data.menuType,
                        addBy: 'Admin',
                        description: data.description,
                        meso_description: data.meso_description,
                        available: data.available,
                        // quantity: data.quantity,
                        addOn_count: 0,
                        menuSize_count: 0,
                        image: image[0].path,
                        isActive: true,
                        isDelete: false
                    };
                    var saveItem = yield new index_1.itemModel(obj).save();
                    yield index_1.userModel.updateOne({ '_id': data.vendorId }, { $push: { 'itemId': saveItem._id } });
                    resolve(saveItem);
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
// // Get Item vendor
// function getItem(data: any): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { language } = headers;
//             var message: any = messages(language);
//             const pageNo = data.pageNo ? data.pageNo : 1;
//             const perPage = data.perPage ? data.perPage : 10;
//             if (!data.vendorId || !data.itemId) {
//                 reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
//             }
//             var items: any = await itemModel.aggregate([
//                 {
//                     $match: {
//                         'vendorId': new ObjectId(data.vendorId), 'isDelete': false
//                     }
//                 },
//                 {
//                     $group: {
//                         '_id': '$catId'
//                     }
//                 },
//                 {
//                     $project: {
//                         'catId': 1,
//                         'name': 1,
//                         'meso_name': 1,
//                         'menu_size_price': 1,
//                         'price': 1,
//                         'menuType': 1,
//                         'time': 1,
//                         'description': 1,
//                         'meso_description': 1,
//                         'quantity': 1,
//                         'addOn_count': 1,
//                         'menuSize_count': 1,
//                         'image': 1
//                     }
//                 },
//                 {
//                     $sort: { 'createdAt': -1 }
//                 },
//                 {
//                     $skip: perPage * (pageNo - 1)
//                 },
//                 {
//                     $limit: perPage
//                 }
//             ]);
//             var itemCount = await itemModel.countDocuments({ 'vendorId': data.vendorId, 'isDelete': false });
//             if (items && items.length) {
//                 resolve({ result: items, count: itemCount });
//             } else {
//                 resolve({ result: items, count: itemCount });
//             }
//         } catch (err) {
//             console.log(err);
//             if (err.code == 11000) {
//                 reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
//             }
//             reject(err);
//         }
//     });
// }
// Edit item by vendor
function EditItem(data, image) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield index_1.itemModel.find({ vendorId: data.vendorId, '_id': { $ne: data.itemId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (items && items.length) {
                reject(new errors_1.CustomError(_constants_1.errors.en.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    catId: data.catId,
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price,
                    menuType: data.menuType,
                    // time: data.time,
                    description: data.description,
                    meso_description: data.meso_description,
                    // quantity: data.quantity,
                    image: image ? image[0].path : data.oldImage,
                    isActive: true,
                    isDelete: false
                };
                yield index_1.itemModel.updateOne({ '_id': data.itemId, 'vendorId': data.vendorId }, obj);
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
// Get Item detail
function getItemDetails(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield index_1.itemModel.findOne({ 'vendorId': data.vendorId, '_id': data.itemId, 'isDelete': false }).populate({ path: 'catId', select: 'name' });
            if (items) {
                resolve(items);
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
// Delete item
function DeleteItemMenu(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield index_1.itemModel.updateOne({ 'vendorId': data.vendorId, '_id': data.itemId }, { 'isDelete': true });
            yield index_1.userModel.updateOne({ '_id': data.vendorId }, { $pull: { 'itemId': new ObjectId(data.itemId) } });
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
// Item Category with items by admin
function ItemCategoryList(data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const itemCategory = yield index_1.item_categoryModel.find({ 'vendorId': data.vendorId, 'isDelete': false }).sort({ 'createdAt': -1 });
            const itemCategoryCount = yield index_1.item_categoryModel.countDocuments({ 'vendorId': data.vendorId, 'isDelete': false });
            if (itemCategory && itemCategory.length) {
                resolve({ result: itemCategory, count: itemCategoryCount });
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
// Export default
exports.default = {
    AddItem,
    EditItem,
    getItemDetails,
    DeleteItemMenu,
    ItemCategoryList
};
