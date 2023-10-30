"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const errors_1 = require("../../utils/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const _Custom_message_1 = require("../../Custom_message/index");
const _ = require('lodash');
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
/**
 * Resturant Listing for user based on search,category,food type and item
 *
 * @param list
 * @returns
 */
function ResturantListForUserCategory(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const nearby = 10; // KM
            var obj = {
                'isActive': true,
                'isDelete': false,
                'role': 'vendor',
                'status': 'Approved'
            };
            var sortData = {
                'createdAt': -1
            };
            if (data.rating) { // Rating filter
                obj.rating = { $gte: 4 };
            }
            if (data.food_type) { // Food_type filter
                obj.food_type = { $in: data.food_type };
            }
            if (data.categoryId) { // category filter
                obj.categoryId = { $in: data.categoryId };
            }
            if (data.search && data.search != '') {
                obj.lower_name = { $regex: data.search.toLowerCase(), $options: 'i' };
                var searchData = yield index_1.recent_searchModel.findOne({ 'lower_name': data.search.toLowerCase() });
                if (!searchData) {
                    yield new index_1.recent_searchModel({ 'name': data.name, 'lower_name': data.search.toLowerCase(), 'userId': userId }).save();
                }
            }
            if (data.sort == 'plTh') { // Low to high price sorting
                sortData = {
                    'item_price': 1
                };
            }
            if (data.sort == 'phtl') { // High to low price sorting
                sortData = {
                    'item_price': -1
                };
            }
            if (data.sort == 'rhtl') { // High to low rating sorting
                sortData = {
                    'rating': -1
                };
            }
            if (data.lat && data.long) {
                obj.location = {
                    $geoWithin: {
                        $centerSphere: [[Number(data.long), Number(data.lat)], Number(nearby) / 3963.2]
                    }
                };
            }
            const vendors = yield index_1.userModel.aggregate([
                {
                    $match: obj
                },
                {
                    $project: {
                        '_id': 1,
                        'name': 1,
                        'restaurantName': 1,
                        'restaurant_mesoName': 1,
                        'rating': 1,
                        'delivery_time': 1,
                        'restaurantImage': 1,
                        'image': 1,
                        'lat': 1,
                        'long': 1
                    }
                },
                {
                    $sort: sortData
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            const vendorsCount = yield index_1.userModel.countDocuments(obj);
            if (vendors && vendors.length) {
                var arr = [];
                for (var i = 0; i < vendors.length; i++) {
                    var distance = getDistanceFromLatLonInKm(data.lat, data.long, vendors[i].lat, vendors[i].long);
                    var obj = {
                        '_id': vendors[i]._id,
                        'name': vendors[i].name,
                        'restaurantName': vendors[i].restaurantName,
                        'restaurant_mesoName': vendors[i].restaurant_mesoName,
                        'rating': vendors[i].rating,
                        'delivery_time': vendors[i].delivery_time,
                        'restaurantImage': vendors[i].restaurantImage,
                        'image': vendors[i].image,
                        'fav': false,
                        'distance': distance
                    };
                    var fav = yield index_1.favouriteModel.findOne({ 'userId': userId, 'vendorId': vendors[i]._id });
                    if (fav) {
                        obj.fav = true;
                    }
                    arr.push(obj);
                }
                resolve({ vendors: arr, count: vendorsCount });
            }
            else {
                resolve({ vendors: [], count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Get Restro list for home
function ResturantListForUserHome(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const nearby = 10; // KM
            var obj = {
                'isActive': true,
                'isDelete': false,
                'role': 'vendor',
                'status': 'Approved'
            };
            var sortData = {
                'createdAt': -1
            };
            if (data.rating) { // Rating filter
                obj.rating = { $gte: 4 };
            }
            if (data.search && data.search != '') {
                obj.lower_name = { $regex: data.search.toLowerCase(), $options: 'i' };
                var searchData = yield index_1.recent_searchModel.findOne({ 'lower_name': data.search.toLowerCase() });
                if (!searchData) {
                    yield new index_1.recent_searchModel({ 'name': data.name, 'lower_name': data.search.toLowerCase(), 'userId': userId }).save();
                }
            }
            if (data.sort == 'plTh') { // Low to high price sorting
                sortData = {
                    'item_price': 1
                };
            }
            if (data.sort == 'phtl') { // High to low price sorting
                sortData = {
                    'item_price': -1
                };
            }
            if (data.sort == 'rhtl') { // High to low rating sorting
                sortData = {
                    'rating': -1
                };
            }
            if (data.lat && data.long) {
                obj.location = {
                    $geoWithin: {
                        $centerSphere: [[Number(data.long), Number(data.lat)], Number(nearby) / 3963.2]
                    }
                };
            }
            const vendors = yield index_1.userModel.aggregate([
                {
                    $match: obj
                },
                {
                    $project: {
                        '_id': 1,
                        'name': 1,
                        'restaurantName': 1,
                        'restaurant_mesoName': 1,
                        'rating': 1,
                        'delivery_time': 1,
                        'restaurantImage': 1,
                        'image': 1,
                        'lat': 1,
                        'long': 1
                    }
                },
                {
                    $sort: sortData
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            const vendorsCount = yield index_1.userModel.countDocuments(obj);
            if (vendors && vendors.length) {
                var arr = [];
                for (var i = 0; i < vendors.length; i++) {
                    var distance = getDistanceFromLatLonInKm(data.lat, data.long, vendors[i].lat, vendors[i].long);
                    var obj = {
                        '_id': vendors[i]._id,
                        'name': vendors[i].name,
                        'restaurantName': vendors[i].restaurantName,
                        'restaurant_mesoName': vendors[i].restaurant_mesoName,
                        'rating': vendors[i].rating,
                        'delivery_time': vendors[i].delivery_time,
                        'restaurantImage': vendors[i].restaurantImage,
                        'image': vendors[i].image,
                        'fav': false,
                        'distance': distance
                    };
                    var fav = yield index_1.favouriteModel.findOne({ 'userId': userId, 'vendorId': vendors[i]._id });
                    if (fav) {
                        obj.fav = true;
                    }
                    arr.push(obj);
                }
                resolve({ vendors: arr, count: vendorsCount });
            }
            else {
                resolve({ vendors: [], count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
function recentSearch(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const recent_search = yield index_1.recent_searchModel.find({ 'userId': userId }, { 'name': 1 });
            const searchCount = yield index_1.userModel.countDocuments({ 'userId': userId });
            if (recent_search && recent_search.length) {
                resolve({ recent_search: recent_search, count: searchCount });
            }
            else {
                resolve({ recent_search: [], count: 0 });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
function AddrecentSearch(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!data.search || !userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const getRecent = yield index_1.recent_searchModel.findOne({ 'lower_name': data.search.toLowerCase(), 'userId': userId });
            if (!getRecent) {
                var obj = {
                    'lower_name': data.search.toLowerCase(),
                    'name': data.search,
                    'userId': userId
                };
                var data = yield new index_1.recent_searchModel(obj).save();
                resolve({ data: data });
            }
            else {
                resolve({ data: {} });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    ResturantListForUserHome,
    ResturantListForUserCategory,
    recentSearch,
    AddrecentSearch
};
