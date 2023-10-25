import { userModel,recent_searchModel,favouriteModel,ratingModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
import mongoose  from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');
/**
 * Add Rating by user
 * 
 * @param Rating 
 * @returns 
 */
function AddRatingByUser(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            if(!userId || !data.rating || !data.vendorId || !data.orderId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const rating:any = await ratingModel.findOne({'userId':userId,'vendorId':data.vendorId,'orderId':data.orderId});
            if(rating){
                reject(new CustomError(message.accountAlreadyExist, StatusCodes.BAD_REQUEST))
            }else{
                var obj:any = {
                    'rating':data.rating,
                    'desc':data.desc,
                    'userId':userId,
                    'vendorId':data.vendorId,
                    'orderId':data.orderId,
                    'isActive':true,
                    'isDelete':false
                }
                var addRating:any = await new ratingModel(obj).save();
                var avgRating:any = await ratingModel.aggregate([
                    {
                        $match:{'vendorId':new ObjectId(data.vendorId)}
                    },
                    {
                        $group:{
                            ratingAvg:{$avg:'$rating'}
                        }
                    }
                ]);
                if(avgRating && avgRating.length){
                    await userModel.updateOne({'_id':data.vendorId},{'rating':avgRating[0].ratingAvg});
                }
                resolve({data:addRating});
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

// Get rating by vendor
function getRatingByVendor(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if(!userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }
            
            const rating:any = await ratingModel.find({'vendorId':userId}).populate([{path:'userId',select:'name'},{path:'orderId'}]).sort({'createdAt':-1}).skip(perPage*(pageNo-1)).limit(perPage);
            const avgRating:any = await ratingModel.aggregate([
                {
                    $match:{
                        'vendorId':new ObjectId(userId)
                    }
                },
                {
                    $group:{
                        ratingAvg:{$avg:'$rating'}
                    }
                }
            ]);
            if(rating && rating.length){
                if(avgRating && avgRating.length){
                    resolve({rating:rating,AvgRating:avgRating[0].ratingAvg});
                }else{
                    resolve({rating:rating,AvgRating:0});
                }
                
            }else{
               resolve({'rating':{},AvgRating:0});
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
    AddRatingByUser,
    getRatingByVendor
} as const;