import { userModel,addOns_categoryModel,itemModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item addOns category by vendor
 * 
 * @param  
 * @returns 
 */
function AddItemAddOnsCategory(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var addOns_category:any = await addOns_categoryModel.find({'vendorId':userId,'itemId':data.itemId,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_name.toLowerCase()}]});
            if(addOns_category && addOns_category.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    vendorId:userId,
                    itemId:data.itemId,
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    quantity:data.quantity,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    description:data.description,
                    meso_description:data.meso_description,
                    position: data.position 
                }
                var save_data = await new addOns_category(obj).save();
                await itemModel.updateOne({'_id':data.itemId},{$inc:{'addOn_Cat_count':1}});
                resolve({result:save_data});
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

// Get Item AddOns Category by vendor
function getAddOns_CategoryByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const itemAddOnsCategory:any = await addOns_categoryModel.find({'vendorId':userId,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const itemAddOnsCategoryCount:number = await addOns_categoryModel.countDocuments({'vendorId':userId,'isDelete':false});
            if(itemAddOnsCategory && itemAddOnsCategory.length){
                resolve({result:itemAddOnsCategory,count:itemAddOnsCategoryCount});
            }else{
                resolve({result:[],count:0});
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

// Edit item addOns category by vendor
function EditItemAddOnsCategoryByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.itemAddOnsCategoryId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const itemAddOnsCategory:any = await addOns_categoryModel.find({'vendorId':userId,'_id':{$ne:data.itemAddOnsCategoryId},'isDelete':false,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_lower_name.toLowerCase()}]});
            if(itemAddOnsCategory && itemAddOnsCategory.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    quantity:data.quantity,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    description:data.description,
                    meso_description:data.meso_description,
                    position: data.position 
                }
                await addOns_categoryModel.updateOne({'_id':data.itemAddOnsCategoryId,'vendorId':userId},obj);
                var data:any = await addOns_categoryModel.findOne({'_id':data.itemCategoryId});
                if(data){
                    resolve({result:data});
                }else{
                    resolve({result:data});
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

// Get Item addons category detail
function getItemAddOnsCategoryDetails(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemAddOnsCategoryId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const itemAddOnsCategory:any = await addOns_categoryModel.findOne({'vendorId':userId,'_id':data.itemAddOnsCategoryId,'isDelete':false});
            if(itemAddOnsCategory){
                resolve({result:itemAddOnsCategory});
            }else{
                resolve({result:{}});
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

// Active or deactive item addons category
function ActiveDeactiveItemAddOnsCategory(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemAddOnsCategoryId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const itemAddOnsCategory:any = await addOns_categoryModel.updateOne({'vendorId':userId,'_id':data.itemAddOnsCategoryId},{'isActive':data.status});
            resolve({result:{'isActive':data.status}});
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
    AddItemAddOnsCategory,
    getAddOns_CategoryByVendor,
    EditItemAddOnsCategoryByVendor,
    getItemAddOnsCategoryDetails,
    ActiveDeactiveItemAddOnsCategory
} as const;