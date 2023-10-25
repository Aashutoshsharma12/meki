import { userModel,recent_searchModel,favouriteModel } from '@models/index';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";
const _ = require('lodash');
function getDistanceFromLatLonInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg:any) {
    return deg * (Math.PI/180)
}

/**
 * Resturant Listing for user based on search,category,food type and item
 * 
 * @param list 
 * @returns 
 */
function ResturantListForUserCategory(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const nearby = 10; // KM
            var obj:any = {
                'isActive':true,
                'isDelete':false,
                'role':'vendor',
                'status':'Approved'
            };
            
            var sortData:any={
                'createdAt':-1
            }
            
            if(data.rating){ // Rating filter
                obj.rating = {$gte:4};
            }
            if(data.food_type){ // Food_type filter
                obj.food_type = {$in:data.food_type};
            }
            if(data.categoryId){ // category filter
                obj.categoryId = {$in:data.categoryId};
            }
            if(data.search && data.search != ''){
                obj.lower_name={$regex: data.search.toLowerCase(), $options: 'i'};
                var searchData = await recent_searchModel.findOne({'lower_name':data.search.toLowerCase()});
                if(!searchData){
                    await new recent_searchModel({'name':data.name,'lower_name':data.search.toLowerCase(),'userId':userId}).save();
                }
            }
            if(data.sort == 'plTh'){ // Low to high price sorting
                sortData = {
                    'item_price':1
                };
            }
            if(data.sort == 'phtl'){ // High to low price sorting
                sortData = {
                    'item_price':-1
                };
            }
            if(data.sort == 'rhtl'){ // High to low rating sorting
                sortData = {
                    'rating':-1
                };
            }
            if(data.lat && data.long){
                obj.location= {
                    $geoWithin:
                    {
                        $centerSphere: [[Number(data.long), Number(data.lat)], Number(nearby) / 3963.2]
                    }
                }
            }
            
            const vendors = await userModel.aggregate([
                {
                    $match:obj
                },
                {
                    $project:{
                        '_id':1,
                        'name':1,
                        'restaurantName':1,
                        'restaurant_mesoName':1,
                        'rating':1,
                        'delivery_time':1,
                        'restaurantImage':1,
                        'image':1,
                        'lat':1,
                        'long':1
                    }
                },
                {
                    $sort:sortData
                },
                {
                    $skip:perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            const vendorsCount = await userModel.countDocuments(obj);
            if(vendors && vendors.length){
                var arr:any = [];
                for(var i=0; i<vendors.length;i++){
                    var distance:Number = getDistanceFromLatLonInKm(data.lat,data.long,vendors[i].lat,vendors[i].long);
                    var obj:any = {
                        '_id':vendors[i]._id,
                        'name':vendors[i].name,
                        'restaurantName':vendors[i].restaurantName,
                        'restaurant_mesoName':vendors[i].restaurant_mesoName,
                        'rating':vendors[i].rating,
                        'delivery_time':vendors[i].delivery_time,
                        'restaurantImage':vendors[i].restaurantImage,
                        'image':vendors[i].image,
                        'fav':false,
                        'distance':distance
                    }
                    var fav = await favouriteModel.findOne({'userId':userId,'vendorId':vendors[i]._id});
                    if(fav){
                        obj.fav = true;
                    }
                    arr.push(obj);
                }
                resolve({vendors:arr,count:vendorsCount});
            }else{
                resolve({vendors:[],count:0});
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

// Get Restro list for home
function ResturantListForUserHome(data: any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const nearby = 10; // KM
            var obj:any = {
                'isActive':true,
                'isDelete':false,
                'role':'vendor',
                'status':'Approved'
            };
            
            var sortData:any={
                'createdAt':-1
            }
            
            if(data.rating){ // Rating filter
                obj.rating = {$gte:4};
            }
            if(data.search && data.search != ''){
                obj.lower_name={$regex: data.search.toLowerCase(), $options: 'i'};
                var searchData = await recent_searchModel.findOne({'lower_name':data.search.toLowerCase()});
                if(!searchData){
                    await new recent_searchModel({'name':data.name,'lower_name':data.search.toLowerCase(),'userId':userId}).save();
                }
            }
            if(data.sort == 'plTh'){ // Low to high price sorting
                sortData = {
                    'item_price':1
                };
            }
            if(data.sort == 'phtl'){ // High to low price sorting
                sortData = {
                    'item_price':-1
                };
            }
            if(data.sort == 'rhtl'){ // High to low rating sorting
                sortData = {
                    'rating':-1
                };
            }
            if(data.lat && data.long){
                obj.location= {
                    $geoWithin:
                    {
                        $centerSphere: [[Number(data.long), Number(data.lat)], Number(nearby) / 3963.2]
                    }
                }
            }
            
            const vendors = await userModel.aggregate([
                {
                    $match:obj
                },
                {
                    $project:{
                        '_id':1,
                        'name':1,
                        'restaurantName':1,
                        'restaurant_mesoName':1,
                        'rating':1,
                        'delivery_time':1,
                        'restaurantImage':1,
                        'image':1,
                        'lat':1,
                        'long':1
                    }
                },
                {
                    $sort:sortData
                },
                {
                    $skip:perPage*(pageNo-1)
                },
                {
                    $limit:perPage
                }
            ]);
            const vendorsCount = await userModel.countDocuments(obj);
            if(vendors && vendors.length){
                var arr:any = [];
                for(var i=0; i<vendors.length;i++){
                    var distance:Number = getDistanceFromLatLonInKm(data.lat,data.long,vendors[i].lat,vendors[i].long);
                    var obj:any = {
                        '_id':vendors[i]._id,
                        'name':vendors[i].name,
                        'restaurantName':vendors[i].restaurantName,
                        'restaurant_mesoName':vendors[i].restaurant_mesoName,
                        'rating':vendors[i].rating,
                        'delivery_time':vendors[i].delivery_time,
                        'restaurantImage':vendors[i].restaurantImage,
                        'image':vendors[i].image,
                        'fav':false,
                        'distance':distance
                    }
                    var fav = await favouriteModel.findOne({'userId':userId,'vendorId':vendors[i]._id});
                    if(fav){
                        obj.fav = true;
                    }
                    arr.push(obj);
                }
                resolve({vendors:arr,count:vendorsCount});
            }else{
                resolve({vendors:[],count:0});
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

function recentSearch(data:any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);           
            const recent_search = await recent_searchModel.find({'userId':userId},{'name':1});
            const searchCount = await userModel.countDocuments({'userId':userId});
            if(recent_search && recent_search.length){
                resolve({recent_search:recent_search,count:searchCount});
            }else{
                resolve({recent_search:[],count:0});
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

function AddrecentSearch(data:any,userId:any,headers:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = headers;
            var message: any = messages(language);           
            if(!data.search || !userId){
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST));
            }

            const getRecent = await recent_searchModel.findOne({'lower_name':data.search.toLowerCase(),'userId':userId});
            if(!getRecent){
                var obj:any = {
                    'lower_name':data.search.toLowerCase(),
                    'name':data.search,
                    'userId':userId
                }
                var data:any = await new recent_searchModel(obj).save();
                resolve({data:data});
            }else{
                resolve({data:{}});
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
    ResturantListForUserHome,
    ResturantListForUserCategory,
    recentSearch,
    AddrecentSearch
} as const;