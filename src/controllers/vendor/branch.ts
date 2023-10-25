import { userModel,ratingModel, open_closingModel} from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import { identityGenerator } from '@utils/helpers';
import mongoose  from 'mongoose';
import moment from 'moment-timezone';
import { resolve } from 'path';
import { reject } from 'promise';
import { off } from 'process';
import { userInfo } from 'os';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * branch
 * 
 * @param  
 * @returns 
 */
// Get Vendor branch
function GetVendorBranchs(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;

            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var branchs: any = await userModel.find({'vendorId':userId,'isDelete':false},{'name':1,'status':1,'isActive':1,'image':1,'branchId':1,'rating':1}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var branchCount = await userModel.countDocuments({'vendorId':userId,'isDelete':false});
            if(branchs && branchs.length){
                resolve({'result':branchs, count: branchCount});
            }else{
                resolve({'result':{}, count: 0});
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

// Get branch details by vendor
function GetBranchDetailsByVendor(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.branchId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var branch: any = await userModel.findOne({'_id':data.branchId},{'name':1,'image':1,'address':1,'rating':1,'branchId':1}).populate({path:'itemId',select:'name'});
            if(branch){
                var data:any = branch.toObject();
                var rating: any = await ratingModel.aggregate([
                    {
                        $match:{'vendorId':new ObjectId(data.branchId)}
                    },
                    {
                        $group:{
                            '_id':null,
                            'count':{$sum:1}
                        }
                    }
                ]);
                if(rating && rating.length){
                    data.reviewCount = rating[0].count;
                }else{
                    data.reviewCount = 0;
                }
                
                var openClose: any = await open_closingModel.findOne({'vendorId':data.branchId},{'isActive':0,'isDelete':0,'createdAt':0,'updatedAt':0});
                if(openClose){
                    data.open_close = openClose;
                }else{
                    data.open_close = {}
                }
                resolve({'result':data});
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

// Edit branch image by vendor
function EditBranchImageByVendor(data: any, userId: any, image: any, headers: any): Promise<any>{
    return new Promise( async( resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.branchId || !image){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await userModel.updateOne({'_id':data.branchId},{$set:{'image':image[0].path}});
            resolve({result:{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            reject(err);
        }
    });
}

// Edit branch number by vendor
function EditBranchMobileByVendor(data: any, userId: any, headers: any): Promise<any>{
    return new Promise( async(resolve, reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.branchId || !data.phoneNumber){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await userModel.updateOne({'_id':data.branchId},{'phoneNumber':data.phoneNumber});
            resolve({result:{}});
        }catch(err){
            console.log(err);
            if(err.code == 11000){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
        }
    });
}

// Search vendor branch
function SearchVendorBranch(data: any, userId: any, headers: any): Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;

            if(!userId || !data.search){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            var obj = {'vendorId':userId,'isDelete':false,'lower_name':{$regex: data.search.toLowerCase(), $options: 'i'}};
            var branches: any = await userModel.find(obj,{'name':1,'status':1,'isActive':1,'image':1,'branchId':1,'rating':1}).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            var branchCount = await userModel.countDocuments(obj);
            if(branches && branches.length){
                resolve({'result': branches, count: branchCount});
            }else{
                resolve({'result': [], count: 0});
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

// Update online offline status
function UpdateOnlineOfflineStatus(data: any, userId: any, headers: any):Promise<any>{
    return new Promise( async(resolve, reject) =>{
        try{
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.branchId || !data.status){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            await userModel.updateOne({'_id':data.branchId},{'status':data.status});
            resolve({'result':{}});
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
    GetVendorBranchs,
    GetBranchDetailsByVendor,
    EditBranchImageByVendor,
    EditBranchMobileByVendor,
    SearchVendorBranch,
    UpdateOnlineOfflineStatus
} as const;