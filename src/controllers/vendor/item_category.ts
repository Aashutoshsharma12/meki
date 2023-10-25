import { userModel, item_categoryModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item category by vendor
 * 
 * @param  
 * @returns 
 */
function AddItemCategory(data: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if (!userId || !data.name || !data.meso_name) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var itemCategory: any = await item_categoryModel.find({ 'vendorId': userId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    vendorId: userId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    description: data.description,
                    meso_description: data.meso_description,
                    position: data.position
                }
                var save_data = await new item_categoryModel(obj).save();
                resolve({ result: save_data });
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Item Category by vendor
function getItemCategoryByVendor(data: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const itemCategory: any = await item_categoryModel.find({ 'vendorId': userId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const itemCategoryCount: number = await item_categoryModel.countDocuments({ 'vendorId': userId, 'isDelete': false });
            if (itemCategory && itemCategory.length) {
                resolve({ result: itemCategory, count: itemCategoryCount });
            } else {
                resolve({ result: [], count: 0 });
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Edit item category by vendor
function EditItemCategoryByVendor(data: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if (!userId || !data.name || !data.meso_name || !data.itemCategoryId) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const itemCategory: any = await item_categoryModel.find({ 'vendorId': userId, '_id': { $ne: data.itemCategoryId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_lower_name.toLowerCase() }] });
            if (itemCategory && itemCategory.length) {
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
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
                await item_categoryModel.updateOne({ '_id': data.itemCategoryId, 'vendorId': userId }, obj);
                var data: any = await item_categoryModel.findOne({ '_id': data.itemCategoryId });
                if (data) {
                    resolve({ result: data });
                } else {
                    resolve({ result: data });
                }
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get Item category detail
function getItemCategoryDetails(data: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if (!userId || !data.itemCategoryId) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const itemCategory: any = await item_categoryModel.findOne({ 'vendorId': userId, '_id': data.itemCategoryId, 'isDelete': false });
            if (itemCategory) {
                resolve({ result: itemCategory });
            } else {
                resolve({ result: {} });
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Active or deactive item category
function ActiveDeactiveItemCategory(data: any, userId: any, headers: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if (!userId || !data.itemCategoryId) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const itemCategory: any = await item_categoryModel.updateOne({ 'vendorId': userId, '_id': data.itemCategoryId }, { 'isActive': data.status });
            resolve({ result: { 'isActive': data.status } });
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}




// Export default
export default {
    AddItemCategory,
    getItemCategoryByVendor,
    EditItemCategoryByVendor,
    getItemCategoryDetails,
    ActiveDeactiveItemCategory
} as const;