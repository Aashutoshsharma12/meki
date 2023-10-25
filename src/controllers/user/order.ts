import { userModel,menu_sizeModel,itemModel,orderModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import mongoose  from 'mongoose';
import moment from 'moment-timezone';
import { resolve } from 'path';
import { reject } from 'promise';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Order
 * 
 * @param  
 * @returns 
 */
function AddCartByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.vendorId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            const count = await orderModel.countDocuments();
            const orderId = identityGenerator(count, "Id");
            var oldCart:any = await orderModel.findOne({'vendorId':{$ne:data.vendorId},'userId':userId,'status':'AddToCart'});
            if(oldCart){
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST));
            }else{
                var cart:any = await orderModel.findOne({'vendorId':data.vendorId,'userId':userId});
                if(cart){
                    var obj:any = {
                        "userId": userId,
                        "vendorId": data.vendorId,
                        "items": data.items,
                        "timeStamp": data.timeStamp,
                        "promocode": data.promocode,
                        "note": data.note,
                        "promoCode_Amount": data.promoCode_Amount,
                        "sub_total": data.sub_total,
                        "convience_tax": data.convience_tax,
                        "grand_total": data.grand_total,
                        "total_discount": data.total_discount,
                        "tax": data.tax,
                        "address": data.address,
                        "city": data.city,
                        "order_lat": data.order_lat,
                        "order_long": data.order_long,
                        "status": 'AddToCart',
                        "order_Date": data.order_Date,
                        "order_time": data.order_time,
                        "admin_tax": data.admin_tax
                    };

                    await orderModel.updateOne({'_id':cart.cartId},obj);
                    obj._id = cart.cartId;
                    resolve({result:obj});
                }else{
                    var obj:any = {
                        "userId": userId,
                        "vendorId": data.vendorId,
                        "orderId": orderId,
                        "items": data.items,
                        "timeStamp": data.timeStamp,
                        "promocode": data.promocode,
                        "note": data.note,
                        "promoCode_Amount": data.promoCode_Amount,
                        "sub_total": data.sub_total,
                        "convience_tax": data.convience_tax,
                        "grand_total": data.grand_total,
                        "total_discount": data.total_discount,
                        "tax": data.tax,
                        "address": data.address,
                        "city": data.city,
                        "order_lat": data.order_lat,
                        "order_long": data.order_long,
                        "status": 'AddToCart',
                        "order_Date": data.order_Date,
                        "order_time": data.order_time,
                        "admin_tax": data.admin_tax
                    };
                    var cartData = await new orderModel(obj).save();
                    resolve({result:cartData});
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

// Make an order
function MakeAnOrderByUser(data:any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) =>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            const cartId:any =  data.cartId;
            if(!userId || !cartId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var cart: any = await orderModel.findOne({'_id':data.cartId, 'userId':userId,'status':'AddToCart'});
            if(cart){
                var obj:any = {
                    'status':'pending',
                    'paymentType':'cash',
                    'paymentStatus':true,
                    'delivery_time':data.delivery_time
                }
                await orderModel.updateOne({'_id':data.cartId},obj);
                var cartData = await orderModel.findOne({'_id':data.cartId});
                if(cartData){
                    resolve({result:cartData});
                }else{
                    resolve({result:{}});
                }
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

// Get order listing by user
function GetOrderListByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            

            var orders:any = await orderModel.find({'userId':userId,'status':{$ne:'AddToCart'}},{'orderId':1,'vendorId':1,'items':1,'order_date':1,'order_time':1,'rating':1,'status':1,'grand_total':1}).populate([{path:'vendorId',select:'_id name image address'},{path:'items.itemId',select:'name'}]).sort({'order_date':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var orderCount = await orderModel.countDocuments({'userId':userId,'status':{$ne:'AddToCart'}});
            if(orders && orders.length){
                resolve({result:orders,count:orderCount});
            }else{
                resolve({result:orders,count:orderCount});
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

// Get order details by user
function GetOrderDetailsByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }            

            var order:any = await orderModel.findOne({'_id':data.orderId,'userId':userId}).populate([{path:'vendorId',select:'_id name image address'},{path:'items.itemId',select:'name meso_name'},{path:'items.size',select:'name meso_name'},{path:'items.addOn.addOnsId',select:'name meso_name'}]);
            if(order && order.length){
                resolve({result:order});
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

// Update order status by user
function UpdateOrderStatusByUser(data:any,userId:any,headers:any):Promise<any>{
    return new Promise(async (resolve, reject)=>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            if(!userId || !data.orderId || !data.status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var order:any = await orderModel.findOne({'userId':userId,'_id':data.orderId});
            if(order){
                await orderModel.updateOne({'userId':userId,'_id':data.orderId},{$set:{'status':data.status},$push:{'track_status':{'status':data.status,'statusDate':moment().format()}}});
                resolve({result:{}});
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

// Get order Listing by vendor
function GetOrderListByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            var status = data.status;
            if(!userId || !status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            

            var orders:any = await orderModel.find({'vendorId':userId,'status':status},{'orderId':1,'vendorId':1,'items':1,'order_date':1,'order_time':1,'rating':1,'status':1,'grand_total':1}).populate([{path:'vendorId',select:'_id name image address'},{path:'items.itemId',select:'name'}]).sort({'order_date':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var orderCount = await orderModel.countDocuments({'vendorId':userId,'status':status});
            if(orders && orders.length){
                resolve({result:orders,count:orderCount});
            }else{
                resolve({result:orders,count:orderCount});
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

// Get Order history by vendor
function GetOrderHistoryByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            

            var orders:any = await orderModel.find({'vendorId':userId,$or:[{'status':'completed'},{'status':'cancelled'}]},{'orderId':1,'vendorId':1,'items':1,'order_date':1,'order_time':1,'rating':1,'status':1,'grand_total':1}).populate([{path:'vendorId',select:'_id name image address'},{path:'items.itemId',select:'name'}]).sort({'order_date':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var orderCount = await orderModel.countDocuments({'vendorId':userId,$or:[{'status':'completed'},{'status':'cancelled'}]});
            if(orders && orders.length){
                resolve({result:orders,count:orderCount});
            }else{
                resolve({result:orders,count:orderCount});
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

// Get order details by vendor
function GetOrderDetailsByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }            

            var order:any = await orderModel.findOne({'_id':data.orderId,'vendorId':userId}).populate([{path:'vendorId',select:'_id name image address'},{path:'items.itemId',select:'name meso_name'},{path:'items.size',select:'name meso_name'},{path:'items.addOn.addOnsId',select:'name meso_name'}]);
            if(order && order.length){
                resolve({result:order});
            }else{
                resolve({result:order});
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

// Update order status by vendor
function UpdateOrderStatusByVendor(data: any, userId:any, headers:any): Promise<any>{
    return new Promise(async (resolve, reject)=>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            if(!userId || !data.orderId || !data.status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var order:any = await orderModel.findOne({'_id':data.orderId,'vendorId':userId});
            if(order){
                await orderModel.updateOne({'_id':data.orderId,'vendorId':userId},{$set:{'status':data.status},$push:{'track_status':{'status':data.status,'statusDate':moment().format()}}});
                resolve({result:{}});
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

// Update delivery time in order by vendor
function UpdateDeliveryTimeByVendor(data:any, userId:any, headers:any) :Promise<any>{
    return new Promise(async (resolve,reject)=>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            if(!userId || !data.orderId || !data.delivery_time){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var order:any = await orderModel.findOne({'vendorId':userId,'_id':data.orderId});
            if(order){
                await orderModel.updateOne({'_id':data.orderId},{'delivery_time':data.delivery_time});
                resolve({result:{}});
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

// Get order listing for user
function getOrderListingForU(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;

            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var orders:any = await orderModel.aggregate([
                {
                    $match:{'userId':new ObjectId(userId),'status':{$ne:'AddToCart'}}
                },
                {
                    $group:{
                        '_id':'$categoryId'
                    }
                },
                {
                    $sort:{'order_Date':-1}
                },
                {
                    $skip: perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            var orderCount = await orderModel.countDocuments({'userId':userId,'status':{$ne:'AddToCart'}});
            if(orders && orders.length){
                resolve({result:orders,count:orderCount});
            }else{
                resolve({result:[],count:0});
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

// Get order listing for vendor
function GetOrderListingForVen(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            var status = data.status;
            if(!userId || !status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var orders: any = await orderModel.aggregate([
                {
                    $match:{'userId':new ObjectId(userId),'status':status}
                },
                {
                    $group:{
                        '_id':'$categoryId'
                    }
                },
                {
                    $sort:{'order_Date':-1}
                },
                {
                    $skip:perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            var orderCount = await orderModel.countDocuments({'userId':userId,'status':status});
            if(orders && orders.length){
                resolve({result:orders,count:orderCount});
            }else{
                resolve({result:[],count:0});
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

// Get Orders Count based on status for vendor
function getOrderStatusCountByVendor(userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var pending: any = await orderModel.countDocuments({'vendorId': userId,'status': 'pending'});
            var preparing: any = await orderModel.countDocuments({'vendorId': userId,'status': 'preparing'});
            var ready: any = await orderModel.countDocuments({'vendorId': userId,'status': 'ready'});
            var pickup: any = await orderModel.countDocuments({'vendorId': userId,'status': 'pickup'});
            var rejectCount: any = await orderModel.countDocuments({'vendorId': userId,'status': 'reject'});
            var delivered: any = await orderModel.countDocuments({'vendorId': userId,'status': 'delivered'});
            resolve({result:{'pending':pending,'preparing':preparing,'ready':ready,'pickup':pickup,'reject':rejectCount,'delivered':delivered}});
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
    AddCartByUser,
    GetOrderListByUser,
    GetOrderDetailsByUser,
    GetOrderListByVendor,
    GetOrderHistoryByVendor,
    GetOrderDetailsByVendor,
    UpdateOrderStatusByUser,
    UpdateOrderStatusByVendor,
    MakeAnOrderByUser,
    UpdateDeliveryTimeByVendor,
    getOrderListingForU,
    GetOrderListingForVen,
    getOrderStatusCountByVendor
} as const;