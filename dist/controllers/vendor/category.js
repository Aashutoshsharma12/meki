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
 * Category Listing
 *
 * @param category
 * @returns
 */
function categoryListForUser(data, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            var obj = {
                'isActive': true,
                'isDelete': false
            };
            if (data.search && data.search != '') {
                var obj = {
                    'isActive': true,
                    'isDelete': false,
                    'lower_name': { $regex: data.search.toLowerCase(), $options: 'i' }
                };
            }
            const category = yield index_1.categoryModel.find(obj, { 'isDelete': 0, 'isActive': 0, 'lower_name': 0 }).sort({ 'postion': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const categoryCount = yield index_1.categoryModel.countDocuments(obj);
            if (category && category.length) {
                resolve({ category: category, count: categoryCount });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
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
/**
 * Explore Listing
 *
 * @param explore
 * @returns
 */
function exploreListForUser(data, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const pageNo = data.pageNo ? data.pageNo : 1;
            const perPage = data.perPage ? data.perPage : 10;
            var obj = {
                'isActive': true,
                'isDelete': false
            };
            if (data.search && data.search != '') {
                var obj = {
                    'isActive': true,
                    'isDelete': false,
                    'lower_name': { $regex: data.search.toLowerCase(), $options: 'i' }
                };
            }
            const explore = yield index_1.exploreModel.find(obj, { 'isDelete': 0, 'isActive': 0, 'lower_name': 0 }).sort({ 'postion': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            const exploreCount = yield index_1.exploreModel.countDocuments(obj);
            if (explore && explore.length) {
                resolve({ explore: explore, count: exploreCount });
            }
            else {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
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
    categoryListForUser,
    exploreListForUser
};
