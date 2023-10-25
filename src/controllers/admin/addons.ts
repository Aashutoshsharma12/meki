import { userModel, addOnsModel, addOns_categoryModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose from 'mongoose';
import { error } from 'console';
import { errors } from '@constants';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item addOns  by Admin
 * 
 * @param  
 * @returns 
 */
function AddItemAddOns(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            var addOns: any = await addOnsModel.find({ 'vendorId': vendorId, itemId: data.itemId, addOns_CatId: data.addOns_CatId, isDelete: false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (addOns && addOns.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace('{{catName}}', 'this'), StatusCodes.BAD_REQUEST));
            } else {
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
                }
                var save_data = await new addOnsModel(obj).save();
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

// List Item AddOns   
function listAddOns_Category(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const itemAddOnsCategory: any = await addOns_categoryModel.find({ 'vendorId': data.vendorId, isDelete: false }).sort({ 'createdAt': -1 });
            const itemAddOnsCategoryCount: number = await addOns_categoryModel.countDocuments({ 'vendorId': data.vendorId, isDelete: false });
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                resolve({ result: itemAddOnsCategory, count: itemAddOnsCategoryCount });
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

// Edit item addOns
function EditItemAddOns(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            // console.log(vendorId,"vendorId",data.itemId,"data.itemId",data.addaddons_catId,"addaddons_catId",data.addonsId,"addonsId")
            const itemAddOnsCategory: any = await addOnsModel.find({ 'vendorId': vendorId,itemId:data.itemId,addOns_CatId:data.addOns_CatId, isDelete: false, '_id': { $ne: data.addonsId }, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            console.log(itemAddOnsCategory,"ite")
            if (itemAddOnsCategory && itemAddOnsCategory.length) {
                reject(new CustomError(errors.en.categoryWithSameName.replace('{{catName}}', 'this'), StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    addOns_CatId: data.addOns_CatId,
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                }
                await addOnsModel.updateOne({ '_id': data.addonsId, 'vendorId': vendorId, isDelete: false }, obj);
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

// Get Item addons detail
function getItemAddOnsDetails(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { vendorId } = data
            const itemAddOns: any = await addOnsModel.findOne({ 'vendorId': vendorId, isDelete: false, '_id': data.addonsId });
            if (itemAddOns) {
                resolve({ result: itemAddOns });
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

// Delete addons
function DeleteItemAddons(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const items: any = await addOnsModel.updateOne({ 'vendorId': data.vendorId, '_id': data.addonsId }, { 'isDelete': true });
            // await userModel.updateOne({ '_id': data.vendorId }, { $pull: { 'itemId': new ObjectId(data.itemId )} });
            resolve({ result: { 'isDelete': true } });
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
    AddItemAddOns,
    listAddOns_Category,
    EditItemAddOns,
    getItemAddOnsDetails,
    DeleteItemAddons
} as const;