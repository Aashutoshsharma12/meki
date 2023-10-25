import { favouriteModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
const _ = require('lodash');

/**
 * Add favourite
 * 
 * @param favourite 
 * @returns 
 */
function AddFavourite(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);            
            const getFav:any = await favouriteModel.findOne({'userId':userId,'vendorId':data.vendorId});
            if(getFav && getFav.length){
                await favouriteModel.deleteOne({'userId':userId,'vendorId':data.vendorId});
                resolve({fav:{}});
            }else{
                var favData:any = await new favouriteModel({'userId':userId,'vendorId':data.vendorId}).save();
                resolve({fav:favData});
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

// Get favourite list
function GetUserFavList(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;            
            const favList = await favouriteModel.find({'userId':userId}).populate({path:'vendorId',select:'name'}).skip(perPage*(pageNo-1)).limit(perPage);
            const favCount = await favouriteModel.countDocuments({'userId':userId});
            if(favList && favList.length){
                resolve({fav:favList,count:favCount});
            }else{
                resolve({fav:favList,count:0});
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
    AddFavourite,
    GetUserFavList
} as const;