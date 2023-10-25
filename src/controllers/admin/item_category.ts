import { userModel, item_categoryModel, itemModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose from 'mongoose';
import { errors } from '@constants';
import item_category from '@controllers/vendor/item_category';
const ObjectId = mongoose.Types.ObjectId;
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
function AddItemCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            var itemCategory: any = await item_categoryModel.find({ 'vendorId': data.vendorId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace("{{catName}}", "this"), StatusCodes.BAD_REQUEST));
            } else {
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
                }
                var save_data = await new item_categoryModel(obj).save();
                await userModel.updateOne({ _id: data.vendorId }, { $push: { 'categoryId': save_data._id } })
                resolve(save_data);
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Item Category by admin
function ItemCategoryList(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const pageNo = data.page ? data.page : 1;
            const perPage = data.perPage ? data.perPage : 10;
            var array: any = [];
            var obj = {}
            const itemCategory: any = await item_categoryModel.find({ 'vendorId': data.vendorId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const itemCategoryCount: number = await item_categoryModel.countDocuments({ 'vendorId': data.vendorId, 'isDelete': false });
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
                    const itemList = await itemModel.find({ catId: itemCategory[i]._id, isDelete: false });
                    obj = {
                        catDetails: itemCategory[i],
                        itemDetails: itemList
                    }
                    array.push(obj)
                }
                resolve({ array, count: itemCategoryCount });
            } else {
                resolve({ result: [], count: 0 });
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Edit item category by vendor
function EditItemCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const itemCategory: any = await item_categoryModel.find({ 'vendorId': data.vendorId, '_id': { $ne: data.itemCategoryId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace("{{catName}}", "this"), StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                }
                await item_categoryModel.updateOne({ '_id': data.itemCategoryId, 'vendorId': data.vendorId }, obj);
                var data1: any = await item_categoryModel.findOne({ '_id': data.itemCategoryId });
                if (data1) {
                    resolve(data1);
                } else {
                    resolve(data1);
                }
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get Item category detail
function getItemCategoryDetails(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const itemCategory: any = await item_categoryModel.findOne({ 'vendorId': data.vendorId, '_id': data.itemCategoryId, 'isDelete': false });
            if (itemCategory) {
                resolve(itemCategory);
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Delete item category
function deleteItemCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const check: any = await userModel.findOne({ _id: data.vendorId }, { categoryId: 1, itemId: 1 });
            if (check) {
                const item: any = await itemModel.find({ catId: data.itemCategoryId, isDelete: false }, { catId: 1 });
                const removeItem: any = []
                item.map((id: any) => {
                    removeItem.push(id._id)
                })
                console.log(removeItem, "remove")
                await item_categoryModel.updateOne({ 'vendorId': data.vendorId, '_id': data.itemCategoryId }, { 'isDelete': true });
                await userModel.updateOne({ _id: data.vendorId }, { $pull: { 'categoryId': new ObjectId(data.itemCategoryId), 'itemId': { $in: removeItem } } });
                resolve({ success: true });
            } else {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST))
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(errors.en.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
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
export default {
    AddItemCategory,
    ItemCategoryList,
    EditItemCategory,
    getItemCategoryDetails,
    deleteItemCategory
} as const;