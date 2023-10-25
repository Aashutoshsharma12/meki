import { userModel, addOns_categoryModel, addOnsModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose from 'mongoose';
import { error } from 'console';
import { errors } from '@constants';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item addOns category by Admin
 * 
 * @param  
 * @returns 
 */
function AddItemAddOnsCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            var addOns_category: any = await addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns_category && addOns_category.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace('{{catName}}', 'this'), StatusCodes.BAD_REQUEST));
            } else {
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
                }
                var save_data = await new addOns_categoryModel(obj).save();
                resolve({ result: save_data });
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

// List Item AddOns Category 
function listAddOns_Category(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            var obj = {}
            var array = []
            const { vendorId, page = 1, perPage = 10, itemId } = data
            if (!vendorId) {
                reject(new CustomError("VendorId required", StatusCodes.BAD_REQUEST));
            }
            if (!itemId) {
                reject(new CustomError("itemId required", StatusCodes.BAD_REQUEST));
            }
            const itemAddOnsCategory: any = await addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false }).sort({ 'createdAt': -1 }).skip(perPage * (page - 1)).limit(perPage);
            const itemAddOnsCategoryCount: number = await addOns_categoryModel.countDocuments({ 'vendorId': vendorId, isDelete: false });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                for (let i = 0; i < itemAddOnsCategory.length; i++) {
                    const addonsList = await addOnsModel.find({ vendorId: vendorId, itemId: itemId, addOns_CatId: itemAddOnsCategory[i]._id, isDelete: false })
                    obj = {
                        addonsCat: itemAddOnsCategory[i],
                        addonsList: addonsList
                    }
                    array.push(obj)
                }
                resolve({ result: array, count: itemAddOnsCategoryCount });
            } else {
                resolve({ result: [], count: itemAddOnsCategoryCount });
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

// Edit item addOns category
function EditItemAddOnsCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            const itemAddOnsCategory: any = await addOns_categoryModel.find({ 'vendorId': vendorId, isDelete: false, '_id': { $ne: data.catId }, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace('{{catName}}', 'this'), StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    quantity: data.quantity,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    // description: data.description,
                    // meso_description: data.meso_description,
                    position: data.position
                }
                await addOns_categoryModel.updateOne({ '_id': data.catId, 'vendorId': vendorId, isDelete: false }, obj);
                resolve({ success: true });
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

// Get Item addons category detail
function getItemAddOnsCategoryDetails(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            const itemAddOnsCategory: any = await addOns_categoryModel.findOne({ 'vendorId': vendorId, isDelete: false, '_id': data.catId });
            if (itemAddOnsCategory) {
                resolve({ result: itemAddOnsCategory });
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





// Export default
export default {
    AddItemAddOnsCategory,
    listAddOns_Category,
    EditItemAddOnsCategory,
    getItemAddOnsCategoryDetails
} as const;