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
/**
 * Add favourite
 *
 * @param favourite
 * @returns
 */
function AddFavourite(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const getFav = yield index_1.favouriteModel.findOne({ 'userId': userId, 'vendorId': data.vendorId });
            if (getFav && getFav.length) {
                yield index_1.favouriteModel.deleteOne({ 'userId': userId, 'vendorId': data.vendorId });
                resolve({ fav: {} });
            }
            else {
                var favData = yield new index_1.favouriteModel({ 'userId': userId, 'vendorId': data.vendorId }).save();
                resolve({ fav: favData });
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
// Get favourite list
function GetUserFavList(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            const favList = yield index_1.favouriteModel.find({ 'userId': userId }).populate({ path: 'vendorId', select: 'name' }).skip(perPage * (pageNo - 1)).limit(perPage);
            const favCount = yield index_1.favouriteModel.countDocuments({ 'userId': userId });
            if (favList && favList.length) {
                resolve({ fav: favList, count: favCount });
            }
            else {
                resolve({ fav: favList, count: 0 });
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
    AddFavourite,
    GetUserFavList
};
