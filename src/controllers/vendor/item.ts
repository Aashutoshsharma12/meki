import { userModel,menu_sizeModel,itemModel,addOnsModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
import { reject } from 'promise';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add item by vendor
 * 
 * @param  
 * @returns 
 */
function AddItemByVendor(data: any,userId:any,image:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!data.name || !data.meso_name || !data.price || !data.catId || !data.menu_type || !data.catId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const item:any = await itemModel.find({'vendorId':userId,'isDelete':false,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_lower_name.toLowerCase()}]});
            if(item && item.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj:any = {
                    catId: data.catId,
                    vendorId: userId,
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    price: data.price,
                    menuType: data.menuType,
                    time: data.time,
                    description: data.description,
                    meso_description: data.meso_description,
                    quantity: data.quantity,
                    addOn_count: 0,
                    menuSize_count: 0,
                    image: image[0].path,
                    isActive: true,
                    isDelete: false
                }

                var saveItem = await new itemModel(obj).save();
                await userModel.updateOne({'_id':userId},{$push:{'itemId':saveItem._id}});
                resolve({result:saveItem});
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

// Get Item vendor
function getItemByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var items:any = await itemModel.aggregate([
                {
                    $match:{
                        'vendorId':new ObjectId(userId),'isDelete':false
                    }
                },
                {
                    $group:{
                        '_id':'$catId'
                    }
                },
                {
                    $project:{
                        'catId': 1,
                        'name': 1,
                        'meso_name':1,
                        'menu_size_price': 1,
                        'price': 1,
                        'menuType': 1,
                        'time': 1,
                        'description': 1,
                        'meso_description': 1,
                        'quantity': 1,
                        'addOn_count': 1,
                        'menuSize_count': 1,
                        'image': 1
                    }
                },
                {
                    $sort:{'createdAt':-1}
                },
                {
                    $skip:perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            var itemCount = await itemModel.countDocuments({'vendorId':userId,'isDelete':false});
            if(items && items.length){
                resolve({result:items,count:itemCount});
            }else{
                resolve({result:items,count:itemCount});
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

// Edit item by vendor
function EditItemByVendor(data: any,userId:any,image:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.name || !data.meso_name || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const items:any = await itemModel.find({'vendorId':userId,'_id':{$ne:data.itemId},'isDelete':false,$or:[{'lower_name':data.name.toLowerCase()},{'meso_lower_name':data.meso_lower_name.toLowerCase()}]});
            if(items && items.length){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var obj:any = {
                    name: data.name,
                    lower_name:data.name.toLowerCase(),
                    meso_name:data.meso_name,
                    meso_lower_name:data.meso_name.toLowerCase(),
                    price: data.price,
                    menuType: data.menuType,
                    time: data.time,
                    description: data.description,
                    meso_description: data.meso_description,
                    quantity: data.quantity,
                    image: image ? image[0].path:data.oldImage,
                    isActive: true,
                    isDelete: false
                }
                await itemModel.updateOne({'_id':data.itemId,'vendorId':userId},obj);
                var data:any = await itemModel.findOne({'_id':data.itemId});
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

// Get Item detail
function getItemDetails(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const items:any = await itemModel.findOne({'vendorId':userId,'_id':data.items,'isDelete':false});
            if(items){
                resolve({result:items});
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

// Active or deactive item
function ActiveDeactiveItem(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const items:any = await itemModel.updateOne({'vendorId':userId,'_id':data.itemId},{'isActive':data.status});
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

// Delete item
function DeleteItemMenu(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.itemId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const items:any = await itemModel.updateOne({'vendorId':userId,'_id':data.itemId},{'isDelete':true});
            await userModel.updateOne({'_id':userId},{$pull:{'itemId':data.itemId}});
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

// Get Item vendor
function getItemByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            var acuserId = data.userId
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.itemId || !data.acuserId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var items:any = await itemModel.aggregate([
                {
                    $match:{
                        'vendorId':new ObjectId(acuserId),'isActive':true,'isDelete':false
                    }
                },
                {
                    $group:{
                        '_id':'$catId'
                    }
                },
                {
                    $project:{
                        'catId': 1,
                        'name': 1,
                        'meso_name':1,
                        'menu_size_price': 1,
                        'price': 1,
                        'menuType': 1,
                        'time': 1,
                        'description': 1,
                        'meso_description': 1,
                        'image': 1
                    }
                },
                {
                    $sort:{'createdAt':-1}
                },
                {
                    $skip:perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            var itemCount = await itemModel.countDocuments({'vendorId':userId,'isActive':true,'isDelete':false});
            if(items && items.length){
                resolve({result:items,count:itemCount});
            }else{
                resolve({result:items,count:itemCount});
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

// Get menu list count for user
function getMenuListCountByUser(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var vendorId = data.vendorId;
            if(!vendorId || !userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var menus: any = await itemModel.aggregate([
                {
                    $lookup: {
                        from: 'catId',
                        localField: 'catId',
                        foreignField: 'category',
                        as: 'catData'
                    }                    
                    
                },
                {
                    $group:{
                        '_id':'$catId',
                        'count':{$sum:1}
                    }
                },
                {
                    $match:{'vendorId':new ObjectId(vendorId),'isActive':true,'isDelete':false}
                }
            ]);
            if(menus && menus.length){
                resolve({result:menus});
            }else{
                resolve({result:[]});
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}


// Export default
export default {
    AddItemByVendor,
    getItemByVendor,
    EditItemByVendor,
    getItemDetails,
    ActiveDeactiveItem,
    DeleteItemMenu,
    getItemByUser,
    getMenuListCountByUser
} as const;