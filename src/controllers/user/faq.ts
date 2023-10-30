import { faqModel,faq_catModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { resolve } from 'path';
import { reject } from 'promise';
import faq from '@controllers/common_api/faq';
const _ = require('lodash');

/**
 * Faqs
 * 
 * @param faq 
 * @returns 
 */
// Get faq category
function getFaqCatList(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any= messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var faqCats: any = await faq_catModel.find({'isActive':true,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            if(faqCats && faqCats.length){
                resolve({result:faqCats});
            }else{
                resolve({result:faqCats});
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

// Get faqs based on category and role
function getFaqs(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId || !data.faq_catId || !data.role){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var getFaqs: any = await faqModel.find({'faq_cat':data.faq_catId,'role':data.role,'isActive':true,'isDelete':false}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            if(getFaqs && getFaqs.length){
                resolve({result:getFaqs});
            }else{
                resolve({result:getFaqs});
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
    getFaqCatList,
    getFaqs
} as const;