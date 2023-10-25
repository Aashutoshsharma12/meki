import { categoryModel,exploreModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
const _ = require('lodash');

/**
 * Category Listing
 * 
 * @param category 
 * @returns 
 */
function categoryListForUser(data: any ,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            var obj:any = {
                'isActive':true,
                'isDelete':false
            };
            if(data.search && data.search != ''){
                var obj:any = {
                    'isActive':true,
                    'isDelete':false,
                    'lower_name':{$regex: data.search.toLowerCase(), $options: 'i'}
                }
            }
            const category = await categoryModel.find(obj,{'isDelete':0,'isActive':0,'lower_name':0}).sort({'postion':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const categoryCount = await categoryModel.countDocuments(obj);
            if(category && category.length){
                resolve({category:category,count:categoryCount});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
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

/**
 * Explore Listing
 * 
 * @param explore 
 * @returns 
 */
function exploreListForUser(data: any ,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;    
            const perPage = data.perPage ? data.perPage : 10;  
            var obj:any = {
                'isActive':true,
                'isDelete':false
            };        
            if(data.search && data.search !=''){
                var obj:any = {
                    'isActive':true,
                    'isDelete':false,
                    'lower_name':{$regex: data.search.toLowerCase(), $options: 'i'}
                }; 
            }
            const explore = await exploreModel.find(obj,{'isDelete':0,'isActive':0,'lower_name':0}).sort({'postion':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const exploreCount = await exploreModel.countDocuments(obj);
            if(explore && explore.length){
                resolve({explore:explore,count:exploreCount});
            }else{
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
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


// Export default
export default {
    categoryListForUser,
    exploreListForUser
} as const;