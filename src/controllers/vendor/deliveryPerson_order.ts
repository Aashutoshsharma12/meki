import { orderModel,dpExpMessageModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import mongoose  from 'mongoose';
const jwt = require('jsonwebtoken');
import moment, { lang } from 'moment-timezone';
import { resolve } from 'path';
import { reject } from 'promise';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Delivery Boy Order
 * 
 * @param  
 * @returns 
 */
// Update order status by delivery boy
function updateOrderStatusByDp(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async( resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var order: any = await orderModel.findOne({'_id':data.orderId});
            if(order){
                await orderModel.updateOne({'_id':data.orderId},{$set:{'deliveryPerson_Status':data.status},$push:{'track_status':{'status':data.status,'statusDate':moment().format()}}});
                resolve({'result':{}});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
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

// Get yesterday earning
function GetYesterdayEarningByDPerson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var date = moment().format();
            var date1 = moment().subtract(1, 'day').format();

            var count = await orderModel.aggregate([
                {
                    $match:{'order_Date':{$gte:date1,$lt:date},'delivery_personId':new ObjectId(userId)}
                },
                {
                    $group:{
                        '_id':null,
                        'amount':{'$sum':'$delivery_charge'}
                    }
                }
            ]);
            resolve({'result':count});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Update collect item by delivery person
function updateCollectItemStatusBydPerson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async( resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await orderModel.updateOne({'_id':data.orderId},{'item_collect':data.item_collect});
            resolve({'result':{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get delivery person experience message
function getDpExperienceMessage(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var dpExpMessage: any = await dpExpMessageModel.find({'isActive':true,'isDelete':false});
            if(dpExpMessage){
                resolve({'result':dpExpMessage});
            }else{
                resolve({'result':{}});
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

// Update delivery person experience message
function updateDpExpMessage(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await dpExpMessageModel.updateOne({'_id':data.orderId},{'dpExpMessageId':data.dpExpMessageId});
            resolve({'result':{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get ongoing Order
function getOngoingOrderByDperson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var obj: any = {
                'delivery_personId':userId,
                $and:[{'status':'completed'},{'status':'cancelled'}]
            }
            
            var order: any = await orderModel.findOne(obj,{'orderId':1,'address':1,'paymentType':1,'petAtHome':1,'leaveAtDoor':1,'grand_total':1,'vendorId':1,'userId':1,'items':1}).populate([{path:'vendorId', select:'name address phoneNumber countryCode'},{path:'userId', select:'name phoneNumber countryCode'},{path:'items.items'}]);
            resolve({'result':order});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get orders based on status
function GetOrderListingBasedOnStatus(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var orders: any = await orderModel.find({'delivery_personId':userId,'status':data.status},{'orderId':1,'address':1,'paymentType':1,'petAtHome':1,'leaveAtDoor':1,'grand_total':1,'vendorId':1,'userId':1,'items':1,'order_date':1,'order_time':1,'status':1}).populate([{path:'vendorId', select:'name address phoneNumber countryCode'},{path:'userId', select:'name phoneNumber countryCode'},{path:'items.items'}]).sort({'order_Date':-1,'order_time':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var orderCount = await orderModel.countDocuments({'delivery_personId':userId,'status':data.status});
            if(orders && orders.length){
                resolve({'result': orders, 'count': orderCount});
            }else{
                resolve({'result': {}, 'count': 0});
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

// Get order details by delivery person
function getOrderDetailsByDPerson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var order: any = await orderModel.findOne({'_id':data.orderId},{'orderId':1,'address':1,'paymentType':1,'petAtHome':1,'leaveAtDoor':1,'grand_total':1,'vendorId':1,'userId':1,'items':1,'order_date':1,'order_time':1,'status':1}).populate([{path:'vendorId', select:'name address phoneNumber countryCode'},{path:'userId', select:'name phoneNumber countryCode'},{path:'items.items'}]);
            if(order){
                resolve({'result':order});
            }else{
                resolve({'result':{}});
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
    updateOrderStatusByDp,
    GetYesterdayEarningByDPerson,
    updateCollectItemStatusBydPerson,
    getDpExperienceMessage,
    updateDpExpMessage,
    getOngoingOrderByDperson,
    GetOrderListingBasedOnStatus,
    getOrderDetailsByDPerson
} as const;