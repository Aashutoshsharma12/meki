import { report_issueModel,report_issue_messageModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import { resolve } from 'path';
import { reject } from 'promise';
const _ = require('lodash');

/**
 * Report & Issue
 * 
 * @param Report & Issue 
 * @returns 
 */
// Add report and issue
function addReportAndIssue(data: any, userId: any, image: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.title || !data.mess_title){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            var count = await report_issueModel.countDocuments();
            const orderId = identityGenerator(count, "Id");
            var obj: any = {
                'title':data.title,
                'meso_title':data.meso_title,
                'desc':data.desc,
                'meso_desc':data.meso_desc,
                'image':image[0].path,
                'userId':userId
            }
            var data: any = await new report_issueModel(obj).save();
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

// Get report and issue by user
function getReportAndIssueByUser(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const {language} = headers;
            var message: any= messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var reportAndIssue: any = await report_issueModel.find({'userId':userId,'isActive':true,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            if(reportAndIssue && reportAndIssue.length){
                resolve({'result':reportAndIssue});
            }else{
                resolve({'result':reportAndIssue});
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

// Get report and issue details
function getReportAndIssueDetails(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const {language} = headers;
            var message: any = messages(language);
            if(!userId || !data.reportIssueId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var details: any = await report_issueModel.find({'userId':userId});
            if(details){
                resolve({'result':details});
            }else{
                resolve({'result':details});
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

// Get report and issue messages
function getReportAndIssueMessage(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const {language} = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.reportId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var messages: any = await report_issue_messageModel.find({'roomId':data.reportId}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            if(messages && messages.length){
                resolve({'result':messages});
            }else{
                resolve({'result':messages});
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
    addReportAndIssue,
    getReportAndIssueByUser,
    getReportAndIssueDetails,
    getReportAndIssueMessage
} as const;