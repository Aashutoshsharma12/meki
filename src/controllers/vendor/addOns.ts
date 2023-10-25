import { userModel,addOnsModel,addOns_categoryModel,itemModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item addOns by vendor
 * 
 * @param  
 * @returns 
 */
function AddItemAddOns(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.addOns_CatId || !data.price || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var addOns:any = await addOnsModel.find({'vendorId':userId,'addOns_CatId':data.addOns_CatId,'itemId':data.itemId,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_name.toLowerCase()}]});
            if(addOns && addOns.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    vendorId:userId,
                    itemId:data.itemId,
                    addOns_CatId:data.addOns_CatId,
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    price:data.price
                }
                var save_data = await new addOnsModel(obj).save();
                await addOns_categoryModel.updateOne({'_id':data.addOns_CatId},{$inc:{'addOns_count':1}});
                await itemModel.updateOne({'_id':data.itemId},{$inc:{'addOn_count':1}});
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

// Get Item AddOns by vendor based on category
function getAddOnsByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.addOns_CatId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const addOns:any = await addOnsModel.find({'vendorId':userId,'addOns_CatId':data.addOns_CatId,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const addOnsCount:number = await addOnsModel.countDocuments({'vendorId':userId,'addOns_CatId':data.addOns_CatId,'isDelete':false});
            if(addOns && addOns.length){
                resolve({result:addOns,count:addOnsCount});
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

// Edit item addOns by vendor
function EditItemAddOnsByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.addOnsId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const addOns:any = await addOnsModel.find({'vendorId':userId,'_id':{$ne:data.addOnsId},'isDelete':false,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_lower_name.toLowerCase()}]});
            if(addOns && addOns.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    price:data.price,
                    meso_lower_name:data.meso_name.toLowerCase()
                }
                await addOnsModel.updateOne({'_id':data.addOnsId,'vendorId':userId},obj);
                var data:any = await addOnsModel.findOne({'_id':data.addOnsId});
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

// Get Item addons detail
function getItemAddOnsDetails(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.addOnsId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const addOns:any = await addOnsModel.findOne({'vendorId':userId,'_id':data.addOnsId,'isDelete':false});
            if(addOns){
                resolve({result:addOns});
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

// Active or deactive item addons
function ActiveDeactiveItemAddOns(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.addOnsId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const addOns:any = await addOnsModel.updateOne({'vendorId':userId,'_id':data.addOnsId},{'isActive':data.status});
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

// Delete item addons
function DeleteItemAddOns(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.addOnsId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const addOns:any = await addOnsModel.updateOne({'vendorId':userId,'_id':data.addOnsId},{'isDelete':true});
            var addOnData = await addOnsModel.findOne({'_id':data.addOnsId},{'addOns_CatId':1});
            if(addOnData){
                await addOns_categoryModel.updateOne({'_id':addOnData.addOns_CatId},{$inc:{'addOns_count':-1}});
                await itemModel.updateOne({'_id':addOnData.itemId},{$inc:{'addOn_count':-1}});
            }
            resolve({result:{'isDelete':true}});
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
    AddItemAddOns,
    getAddOnsByVendor,
    EditItemAddOnsByVendor,
    getItemAddOnsDetails,
    ActiveDeactiveItemAddOns,
    DeleteItemAddOns
} as const;