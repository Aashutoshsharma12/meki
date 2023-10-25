import { userModel,menu_sizeModel,itemModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item menu size by vendor
 * 
 * @param  
 * @returns 
 */
function AddItemMenuSize(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.itemId || !data.price){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var menu_size:any = await menu_sizeModel.find({'vendorId':userId,'itemId':data.itemId,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_name.toLowerCase()}]});
            if(menu_size && menu_size.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    vendorId:userId,
                    itemId:data.itemId,
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    price:data.price
                }
                var save_data = await new menu_sizeModel(obj).save();
                await itemModel.updateOne({'_id':data.itemId},{$inc:{'menuSize_count':1}});
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

// Get Item Menu size by vendor based on item
function getMenuSizeByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.find({'vendorId':userId,'itemId':data.itemId,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const menu_sizeCount:number = await menu_sizeModel.countDocuments({'vendorId':userId,'itemId':data.itemId,'isDelete':false});
            if(menu_size && menu_size.length){
                resolve({result:menu_size,count:menu_sizeCount});
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

// Edit item Menu size by vendor
function EditItemMenuSizeByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.menu_sizeId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.find({'vendorId':userId,'_id':{$ne:data.menu_sizeId},'isDelete':false,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_lower_name.toLowerCase()}]});
            if(menu_size && menu_size.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj = {
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    price:data.price,
                    meso_lower_name:data.meso_name.toLowerCase()
                }
                await menu_sizeModel.updateOne({'_id':data.menu_sizeId,'vendorId':userId},obj);
                var data:any = await menu_sizeModel.findOne({'_id':data.menu_sizeId});
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

// Get Item Menu Size detail
function getItemMenuSizeDetails(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.menu_sizeId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.findOne({'vendorId':userId,'_id':data.menu_sizeId,'isDelete':false});
            if(menu_size){
                resolve({result:menu_size});
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

// Active or deactive item Menu Size
function ActiveDeactiveItemMenuSize(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.menu_sizeId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.updateOne({'vendorId':userId,'_id':data.menu_sizeId},{'isActive':data.status});
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

// Delete item menu size
function DeleteItemMenuSize(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.menu_sizeId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.updateOne({'vendorId':userId,'_id':data.menu_sizeId},{'isDelete':true});
            var menuSizeData = await menu_sizeModel.findOne({'_id':data.menu_sizeId},{'itemId':1});
            if(menuSizeData){
                await itemModel.updateOne({'_id':menuSizeData.itemId},{$inc:{'menuSize_count':-1}});
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

// Get item menu size based on item
function getItemMenuSizeByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const menu_size:any = await menu_sizeModel.find({'itemId':data.itemId,'isActive':true,'isDelete':false});
            var menuSizeData = await menu_sizeModel.countDocuments({'itemId':data.itemId,'isActive':true,'isDelete':false});
            if(menu_size && menu_size.length){
               resolve({result:menu_size,count:menuSizeData});
            }else{
                resolve({result:menu_size,count:menuSizeData});
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
    AddItemMenuSize,
    getMenuSizeByVendor,
    EditItemMenuSizeByVendor,
    getItemMenuSizeDetails,
    ActiveDeactiveItemMenuSize,
    DeleteItemMenuSize,
    getItemMenuSizeByUser
} as const;