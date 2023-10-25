import { userModel, menu_sizeModel, itemModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
// import { errors.ens } from "@Custom_errors.en";
import mongoose from 'mongoose';
import { errors } from '@constants';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item menu size 
 * 
 * @param  
 * @returns 
 */
function AddItemMenuSize(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            var menu_size: any = await menu_sizeModel.find({ 'vendorId': data.vendorId, isDelete: false, 'itemId': data.itemId, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    vendorId: data.vendorId,
                    itemId: data.itemId,
                    name: data.name,
                    addBy:"Admin",
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase(),
                    price: data.price
                }
                var save_data = await new menu_sizeModel(obj).save();
                await itemModel.updateOne({ '_id': data.itemId }, { $inc: { 'menuSize_count': 1 } });
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

// List Item Menu size by vendor based on item
function listMenuSize(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {

            const page = data.page ? data.page : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const menu_size: any = await menu_sizeModel.find({ 'vendorId': data.vendorId, 'itemId': data.itemId, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (page - 1)).limit(perPage);
            const menu_sizeCount: number = await menu_sizeModel.countDocuments({ 'vendorId': data.vendorId, 'itemId': data.itemId, 'isDelete': false });
            if (menu_size && menu_size.length) {
                resolve({ result: menu_size, count: menu_sizeCount });
            } else {
                resolve({ result: [], count: menu_sizeCount });
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

// Edit item Menu size
function EditItemMenuSize(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const menu_size: any = await menu_sizeModel.find({ 'vendorId': data.vendorId, '_id': { $ne: data.menu_sizeId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (menu_size && menu_size.length) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                var obj = {
                    name: data.name,
                    lower_name: data.name.toLowerCase(),
                    meso_name: data.meso_name,
                    price: data.price,
                    meso_lower_name: data.meso_name.toLowerCase()
                }
                await menu_sizeModel.updateOne({ '_id': data.menu_sizeId, 'vendorId': data.vendorId }, obj);
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

// Get Item Menu Size detail
function getItemMenuSizeDetails(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const menu_size: any = await menu_sizeModel.findOne({ 'vendorId': data.vendorId, '_id': data.menu_sizeId, 'isDelete': false });
            if (menu_size) {
                resolve({ result: menu_size });
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

// Delete item menu size
function DeleteItemMenuSize(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const menu_size: any = await menu_sizeModel.updateOne({ 'vendorId': data.vendorId, '_id': data.menu_sizeId }, { 'isDelete': true });
            var menuSizeData = await menu_sizeModel.findOne({ '_id': data.menu_sizeId }, { 'itemId': 1 });
            if (menuSizeData) {
                await itemModel.updateOne({ '_id': menuSizeData.itemId }, { $inc: { 'menuSize_count': -1 } });
            }
            resolve({ success: true });
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
    AddItemMenuSize,
    listMenuSize,
    EditItemMenuSize,
    getItemMenuSizeDetails,
    DeleteItemMenuSize,
} as const;