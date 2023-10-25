import { userModel,menu_sizeModel,itemModel,orderModel,open_closingModel,offerModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import mongoose  from 'mongoose';
import moment from 'moment-timezone';
import { resolve } from 'path';
import { reject } from 'promise';
import { off } from 'process';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Offers
 * 
 * @param  
 * @returns 
 */
// Add offers by vendor
function AddOfferByVendor(data: any, userId: any, image: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            const count = await offerModel.countDocuments();
            const offerId = identityGenerator(count, "Id");
            var obj: any = {
                vendorId: userId,
                offer_token: offerId,
                name: data.name,
                lower_name: data.name.toLowerCase(),
                meso_name: data.meso_name,
                meso_lower_name: data.meso_name.toLowerCase(),
                description: data.description,
                meso_description: data.meso_description,
                min_order_amount: data.min_order_amount,
                max_offer_amount: data.max_offer_amount,
                offer_per: data.offer_per,
                start_date: data.start_date,
                end_data: data.end_data,
                image: image[0].path
            }

            var saveData: any = await new offerModel(obj).save();
            resolve({result:saveData});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Edit offer by vendor
function EditOfferByVendor(data: any, userId: any, image: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.offerId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var offer: any = await offerModel.findOne({'_id':data.offerId,'vendorId':userId,'isActive':true,'isDelete':false});
            if(offer){
                var obj: any = {
                    name: data.name ? data.name : offer.name,
                    lower_name: data.name.toLowerCase() ? data.name.toLowerCase() : offer.lower_name,
                    meso_name: data.meso_name ? data.meso_name : offer.meso_name,
                    meso_lower_name: data.meso_name.toLowerCase() ? data.meso_name.toLowerCase() : offer.meso_lower_name,
                    description: data.description ? data.description : offer.description,
                    meso_description: data.meso_description ? data.meso_description : offer.meso_description,
                    min_order_amount: data.min_order_amount ? data.min_order_amount : offer.min_order_amount,
                    max_offer_amount: data.max_offer_amount ? data.max_offer_amount : offer.max_offer_amount,
                    offer_per: data.offer_per ? data.offer_per : offer.offer_per,
                    start_date: data.start_date ? data.start_date : offer.start_date,
                    end_data: data.end_data ? data.end_data : offer.end_data,
                    image: image[0].path ? image[0].path : offer.image
                }
                await offerModel.updateOne({'_id':data.offerId},obj);
                var offerData: any = await offerModel.findOne({'_id':data.offerId});
                resolve({result:offerData});
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

// Vendor offer lists
function GetOfferListingByVendor(data: any, userId: any, headers: any):Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var offers: any = await offerModel.find({'vendorId':userId,'isDelete':false},{'lower_name':0,'meso_lower_name':0,'vendorId':0,'createdAt':0,'updatedAt':0}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var offerCount = await offerModel.countDocuments({'vendorId':userId,'isDelete':false});
            if(offers && offers.length){
                resolve({ result: offers, count: offerCount});
            }else{
                reject({ result: [], count: 0});
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

// Get offer details
function GetOfferDetailsByVendor(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject) =>{
        try{
            const { language } = headers;
            var message:any = messages(language);
            if(!userId || !data.offerId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var offer: any = await offerModel.findOne({'_id':data.offerId,'vendorId':userId},{'lower_name':0,'meso_lower_name':0,'vendorId':0,'createdAt':0,'updatedAt':0});
            if(offer){
                resolve({ result: offer});
            }else{
                resolve({ result: {}});
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Update offer status
function updateOfferStatusByVendor(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages('language');
            if(!userId || !data.offerId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await offerModel.updateOne({'_id':data.offerId,'vendorId':userId},{'isActive':data.status});
            resolve({result:{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Delete offer by vendor
function DeleteOfferByVendor(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{    
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.offerId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await offerModel.updateOne({'_id':data.offerId,'vendorId':userId},{'isDelete':false});
            resolve({result:{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Get vendor offers by user
function getOffersByUser(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.vendorId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var offers = await offerModel.find({'vendorId':data.vendorId,'isActive':true,'isDelete':false},{'vendorId':0,'lower_name':0,'meso_lower_name':0,'isDelete':0,'createdAt':0,'updatedAt':0});
            var offerCount = await offerModel.countDocuments({'vendorId':data.vendorId,'isActive':true,'isDelete':false});
            if(offers && offers.length){
                resolve({resolve: offers, count: offerCount});
            }else{
                resolve({result: [], count: 0});
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Get offer details by user
function getOfferDetailsByUser(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || data.offerId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var offerDetails = await offerModel.findOne({'_id': data.offerId,'isActive':true, 'isDelete':false},{'vendorId':0,'lower_name':0,'meso_lower_name':0,'isDelete':0,'createdAt':0,'updatedAt':0});
            if(offerDetails){
                resolve({result: offerDetails});
            }else{
                resolve({result: {} });
            }
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}


// Export default
export default {
    AddOfferByVendor,
    EditOfferByVendor,
    GetOfferListingByVendor,
    GetOfferDetailsByVendor,
    updateOfferStatusByVendor,
    DeleteOfferByVendor,
    getOffersByUser,
    getOfferDetailsByUser
} as const;