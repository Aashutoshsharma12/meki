import { userModel, menu_sizeModel, itemModel, addOnsModel, item_categoryModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose from 'mongoose';
import { errors } from '@constants';
const ObjectId = mongoose.Types.ObjectId;
import sharp from 'sharp';
const _ = require('lodash');

const d = async (image: any) => {
    console.log(':s;s;s;s',image)
    sharp(image)
        .resize(200, 100)
        .toFile('output.jpg', (err, info) => {
            if (err) {
                console.error(err);
            }
        });
}

/**
 * Add item by Admin
 * 
 * @param  
 * @returns 
 */
function AddItem(data: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('enter',data,"slslsls")
            if (!image) {
                reject(new CustomError('Image Required', StatusCodes.BAD_REQUEST));
            } else {
                
                // sharp('input.jpg')
                //     .resize(200, 100)
                //     .toFile('output.jpg', (err, info) => {
                //         if (err) {
                //             console.error(err);
                //         }
                //     });
                const item: any = await itemModel.find({ 'vendorId': data.vendorId, 'catId': data.catId, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
                if (item && item.length) {
                    reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
                } else {
                    var obj: any = {
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
                    }
                    var saveItem = await new itemModel(obj).save();
                    await userModel.updateOne({ '_id': data.vendorId }, { $push: { 'itemId': saveItem._id } });
                    resolve(saveItem);
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
function EditItem(data: any, image: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const items: any = await itemModel.find({ vendorId: data.vendorId, '_id': { $ne: data.itemId }, 'isDelete': false, $or: [{ 'lower_name': data.name.toLowerCase() }, { 'meso_lower_name': data.meso_name.toLowerCase() }] });
            if (items && items.length) {
                reject(new CustomError(errors.en.alreadyExist, StatusCodes.BAD_REQUEST));
            } else {
                var obj: any = {
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
                }
                await itemModel.updateOne({ '_id': data.itemId, 'vendorId': data.vendorId }, obj);
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

// Get Item detail
function getItemDetails(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const items: any = await itemModel.findOne({ 'vendorId': data.vendorId, '_id': data.itemId, 'isDelete': false }).populate({ path: 'catId', select: 'name' });
            if (items) {
                resolve(items);
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

// Delete item
function DeleteItemMenu(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const items: any = await itemModel.updateOne({ 'vendorId': data.vendorId, '_id': data.itemId }, { 'isDelete': true });
            await userModel.updateOne({ '_id': data.vendorId }, { $pull: { 'itemId': new ObjectId(data.itemId) } });
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

// Item Category with items by admin
function ItemCategoryList(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const itemCategory: any = await item_categoryModel.find({ 'vendorId': data.vendorId, 'isDelete': false }).sort({ 'createdAt': -1 });
            const itemCategoryCount: number = await item_categoryModel.countDocuments({ 'vendorId': data.vendorId, 'isDelete': false });
            if (itemCategory && itemCategory.length) {
                resolve({ result: itemCategory, count: itemCategoryCount });
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

// Export default
export default {
    AddItem,
    EditItem,
    getItemDetails,
    DeleteItemMenu,
    ItemCategoryList
} as const;