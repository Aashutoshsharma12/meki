import { userModel,roomModel,messageModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
import { resolve } from 'path';
import { reject } from 'promise';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Chat module
 * 
 * @param  
 * @returns 
 */
// Get rooms by user
function getRoomsbyUser(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var obj: any = {
                'isActive':true,
                'isDelete':false,
                'userId':userId
            }

            var rooms: any = await roomModel.find(obj).populate([{path:'userId',select:'name image countryCode phoneNumber'},{path:'deliveryPId',select:'name image countryCode phoneNumber'}]).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var roomCount = await roomModel.countDocuments(obj);
            if(rooms && rooms.length){
                resolve({result:rooms,count:roomCount});
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

// Get room by delivery person
function getRoomByPerson(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async (resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var obj: any = {
                'isActive':true,
                'isDelete':false,
                'deliveryPId':userId
            }

            var rooms: any = await roomModel.find(obj).populate([{path:'userId',select:'name image countryCode phoneNumber'},{path:'deliveryPId',select:'name image countryCode phoneNumber'}]).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var roomCount = await roomModel.countDocuments(obj);
            if(rooms && rooms.length){
                resolve({result: rooms, count: roomCount});
            }else{
                resolve({result: [], count: 0});
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

// Get messages
function getMessages(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async (resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.roomId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var messages: any = await messageModel.find({'roomId':data.roomId,'isActive':true,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var messageCount = await messageModel.countDocuments({'roomId':data.roomId,'isActive':true,'isDelete':false});
            if(messages && messages.length){
                resolve({result:messages, count: messageCount});
            }else{
                resolve({result:[], count: 0});
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
    getRoomsbyUser,
    getRoomByPerson,
    getMessages
} as const;