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
const mongoose_1 = __importDefault(require("mongoose"));
const jwt = require('jsonwebtoken');
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Delivery Boy Order
 *
 * @param
 * @returns
 */
// Update order status by delivery boy
function updateOrderStatusByDp(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ '_id': data.orderId });
            if (order) {
                yield index_1.orderModel.updateOne({ '_id': data.orderId }, { $set: { 'deliveryPerson_Status': data.status }, $push: { 'track_status': { 'status': data.status, 'statusDate': (0, moment_timezone_1.default)().format() } } });
                resolve({ 'result': {} });
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
// Get yesterday earning
function GetYesterdayEarningByDPerson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var date = (0, moment_timezone_1.default)().format();
            var date1 = (0, moment_timezone_1.default)().subtract(1, 'day').format();
            var count = yield index_1.orderModel.aggregate([
                {
                    $match: { 'order_Date': { $gte: date1, $lt: date }, 'delivery_personId': new ObjectId(userId) }
                },
                {
                    $group: {
                        '_id': null,
                        'amount': { '$sum': '$delivery_charge' }
                    }
                }
            ]);
            resolve({ 'result': count });
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
// Update collect item by delivery person
function updateCollectItemStatusBydPerson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.orderModel.updateOne({ '_id': data.orderId }, { 'item_collect': data.item_collect });
            resolve({ 'result': {} });
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
// Get delivery person experience message
function getDpExperienceMessage(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dpExpMessage = yield index_1.dpExpMessageModel.find({ 'isActive': true, 'isDelete': false });
            if (dpExpMessage) {
                resolve({ 'result': dpExpMessage });
            }
            else {
                resolve({ 'result': {} });
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
// Update delivery person experience message
function updateDpExpMessage(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            yield index_1.dpExpMessageModel.updateOne({ '_id': data.orderId }, { 'dpExpMessageId': data.dpExpMessageId });
            resolve({ 'result': {} });
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
// Get ongoing Order
function getOngoingOrderByDperson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var obj = {
                'delivery_personId': userId,
                $and: [{ 'status': 'completed' }, { 'status': 'cancelled' }]
            };
            var order = yield index_1.orderModel.findOne(obj, { 'orderId': 1, 'address': 1, 'paymentType': 1, 'petAtHome': 1, 'leaveAtDoor': 1, 'grand_total': 1, 'vendorId': 1, 'userId': 1, 'items': 1 }).populate([{ path: 'vendorId', select: 'name address phoneNumber countryCode' }, { path: 'userId', select: 'name phoneNumber countryCode' }, { path: 'items.items' }]);
            resolve({ 'result': order });
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
// Get orders based on status
function GetOrderListingBasedOnStatus(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.find({ 'delivery_personId': userId, 'status': data.status }, { 'orderId': 1, 'address': 1, 'paymentType': 1, 'petAtHome': 1, 'leaveAtDoor': 1, 'grand_total': 1, 'vendorId': 1, 'userId': 1, 'items': 1, 'order_date': 1, 'order_time': 1, 'status': 1 }).populate([{ path: 'vendorId', select: 'name address phoneNumber countryCode' }, { path: 'userId', select: 'name phoneNumber countryCode' }, { path: 'items.items' }]).sort({ 'order_Date': -1, 'order_time': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var orderCount = yield index_1.orderModel.countDocuments({ 'delivery_personId': userId, 'status': data.status });
            if (orders && orders.length) {
                resolve({ 'result': orders, 'count': orderCount });
            }
            else {
                resolve({ 'result': {}, 'count': 0 });
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
// Get order details by delivery person
function getOrderDetailsByDPerson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ '_id': data.orderId }, { 'orderId': 1, 'address': 1, 'paymentType': 1, 'petAtHome': 1, 'leaveAtDoor': 1, 'grand_total': 1, 'vendorId': 1, 'userId': 1, 'items': 1, 'order_date': 1, 'order_time': 1, 'status': 1 }).populate([{ path: 'vendorId', select: 'name address phoneNumber countryCode' }, { path: 'userId', select: 'name phoneNumber countryCode' }, { path: 'items.items' }]);
            if (order) {
                resolve({ 'result': order });
            }
            else {
                resolve({ 'result': {} });
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
    updateOrderStatusByDp,
    GetYesterdayEarningByDPerson,
    updateCollectItemStatusBydPerson,
    getDpExperienceMessage,
    updateDpExpMessage,
    getOngoingOrderByDperson,
    GetOrderListingBasedOnStatus,
    getOrderDetailsByDPerson
};
