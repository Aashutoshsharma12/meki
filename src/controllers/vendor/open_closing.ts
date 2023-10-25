import { userModel,menu_sizeModel,itemModel,orderModel,open_closingModel } from '@models/index';
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
 * Vendor open closing
 * 
 * @param  
 * @returns 
 */

// Add/Edit opening closing time
function AddVendorOpenClosing(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            var open_closing:any = await open_closingModel.findOne({'vendorId':userId});
            if(open_closing){
                var updateobj:any = {
                    'sunday': data.sunday ? data.sunday:open_closing.sunday,
                    'monday': data.monday ? data.monday:open_closing.monday,
                    'tuesday': data.tuesday ? data.tuesday:open_closing.tuesday,
                    'wednesday': data.wednesday ? data.wednesday:open_closing.wednesday,
                    'thursday': data.thursday ? data.thursday:open_closing.thursday,
                    'friday': data.friday ? data.friday:open_closing.friday,
                    'saturday': data.saturday ? data.saturday:open_closing.saturday,
                }
                await open_closing.updateOne({'vendorId':userId},updateobj);
                var open_closeData = await open_closingModel.findOne({'vendorId':userId});
                resolve({result:open_closeData});
            }else{
                var obj:any = {
                    'vendorId':userId,
                    'sunday': data.sunday ? data.sunday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'monday': data.monday ? data.monday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'tuesday': data.tuesday ? data.tuesday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'wednesday': data.wednesday ? data.wednesday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'thursday': data.thursday ? data.thursday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'friday': data.friday ? data.friday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                    'saturday': data.saturday ? data.saturday:{'open':'00:00 AM','close':"00:00 AM", status:false},
                }

                var time = await new open_closingModel(obj).save();
                resolve({result:time});
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

// Get vendor open closing time
function getVendorOpenClosing(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId){
                reject(new CustomError(message.noDatafound,StatusCodes.BAD_REQUEST));
            }

            var open_closing: any = await open_closingModel.findOne({'vendorId':userId});
            if(open_closing){
                resolve({result:open_closing});
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

// Get open closing details
function getOpenCloseDetail(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var day = data.day;
            if(!userId || !data.day){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var openClose: any = await open_closingModel.findOne({'vendorId':userId},{day :1});
            if(openClose){
                resolve({result:openClose});
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

// Delete open close
function deleteOpenClose(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var day = data.day;
            if(!userId || !day){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var openClose: any = await open_closingModel.updateOne({'vendorId':userId},{day:{}});
            var openCloseData: any = await open_closingModel.findOne({'vendorId':userId});
            if(openCloseData){
                resolve({result:openCloseData});
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


// Export default
export default {
    AddVendorOpenClosing,
    getVendorOpenClosing,
    getOpenCloseDetail,
    deleteOpenClose
} as const;