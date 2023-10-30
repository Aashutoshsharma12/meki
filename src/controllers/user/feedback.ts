import { feedbackModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import { resolve } from 'path';
import { reject } from 'promise';
const _ = require('lodash');

/**
 * Feedback
 * 
 * @param Feedback
 * @returns 
 */
// Send feedback
function sendFeedBack(data: any, userId: any, headers: any):Promise<any>{
    return new Promise(async (resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.feedback || !data.role){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var obj: any = {
                'userId':userId,
                'feedback':data.feedback,
                'role':data.role
            }
            var data: any = await new feedbackModel(obj).save();
            resolve({'result':data});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Get feedback
function getFeedback(data: any, userId: any, headers: any):Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var feedback: any = await feedbackModel.find({'userId':userId,'isActive':true,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            if(feedback){
                resolve({'result':feedback});
            }else{
                resolve({'result':feedback});
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
    sendFeedBack,
    getFeedback
} as const;