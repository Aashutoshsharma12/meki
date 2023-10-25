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
const helpers_1 = require("../../utils/helpers");
const mongoose_1 = __importDefault(require("mongoose"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Order
 *
 * @param
 * @returns
 */
function AddCartByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.vendorId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            const count = yield index_1.orderModel.countDocuments();
            const orderId = (0, helpers_1.identityGenerator)(count, "Id");
            var oldCart = yield index_1.orderModel.findOne({ 'vendorId': { $ne: data.vendorId }, 'userId': userId, 'status': 'AddToCart' });
            if (oldCart) {
                reject(new errors_1.CustomError(message.alreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                var cart = yield index_1.orderModel.findOne({ 'vendorId': data.vendorId, 'userId': userId });
                if (cart) {
                    var obj = {
                        "userId": userId,
                        "vendorId": data.vendorId,
                        "items": data.items,
                        "timeStamp": data.timeStamp,
                        "promocode": data.promocode,
                        "note": data.note,
                        "promoCode_Amount": data.promoCode_Amount,
                        "sub_total": data.sub_total,
                        "convience_tax": data.convience_tax,
                        "grand_total": data.grand_total,
                        "total_discount": data.total_discount,
                        "tax": data.tax,
                        "address": data.address,
                        "city": data.city,
                        "order_lat": data.order_lat,
                        "order_long": data.order_long,
                        "status": 'AddToCart',
                        "order_Date": data.order_Date,
                        "order_time": data.order_time,
                        "admin_tax": data.admin_tax
                    };
                    yield index_1.orderModel.updateOne({ '_id': cart.cartId }, obj);
                    obj._id = cart.cartId;
                    resolve({ result: obj });
                }
                else {
                    var obj = {
                        "userId": userId,
                        "vendorId": data.vendorId,
                        "orderId": orderId,
                        "items": data.items,
                        "timeStamp": data.timeStamp,
                        "promocode": data.promocode,
                        "note": data.note,
                        "promoCode_Amount": data.promoCode_Amount,
                        "sub_total": data.sub_total,
                        "convience_tax": data.convience_tax,
                        "grand_total": data.grand_total,
                        "total_discount": data.total_discount,
                        "tax": data.tax,
                        "address": data.address,
                        "city": data.city,
                        "order_lat": data.order_lat,
                        "order_long": data.order_long,
                        "status": 'AddToCart',
                        "order_Date": data.order_Date,
                        "order_time": data.order_time,
                        "admin_tax": data.admin_tax
                    };
                    var cartData = yield new index_1.orderModel(obj).save();
                    resolve({ result: cartData });
                }
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
// Make an order
function MakeAnOrderByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const cartId = data.cartId;
            if (!userId || !cartId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var cart = yield index_1.orderModel.findOne({ '_id': data.cartId, 'userId': userId, 'status': 'AddToCart' });
            if (cart) {
                var obj = {
                    'status': 'pending',
                    'paymentType': 'cash',
                    'paymentStatus': true,
                    'delivery_time': data.delivery_time
                };
                yield index_1.orderModel.updateOne({ '_id': data.cartId }, obj);
                var cartData = yield index_1.orderModel.findOne({ '_id': data.cartId });
                if (cartData) {
                    resolve({ result: cartData });
                }
                else {
                    resolve({ result: {} });
                }
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
// Get order listing by user
function GetOrderListByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.find({ 'userId': userId, 'status': { $ne: 'AddToCart' } }, { 'orderId': 1, 'vendorId': 1, 'items': 1, 'order_date': 1, 'order_time': 1, 'rating': 1, 'status': 1, 'grand_total': 1 }).populate([{ path: 'vendorId', select: '_id name image address' }, { path: 'items.itemId', select: 'name' }]).sort({ 'order_date': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var orderCount = yield index_1.orderModel.countDocuments({ 'userId': userId, 'status': { $ne: 'AddToCart' } });
            if (orders && orders.length) {
                resolve({ result: orders, count: orderCount });
            }
            else {
                resolve({ result: orders, count: orderCount });
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
// Get order details by user
function GetOrderDetailsByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ '_id': data.orderId, 'userId': userId }).populate([{ path: 'vendorId', select: '_id name image address' }, { path: 'items.itemId', select: 'name meso_name' }, { path: 'items.size', select: 'name meso_name' }, { path: 'items.addOn.addOnsId', select: 'name meso_name' }]);
            if (order && order.length) {
                resolve({ result: order });
            }
            else {
                resolve({ result: {} });
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
// Update order status by user
function UpdateOrderStatusByUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId || !data.status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ 'userId': userId, '_id': data.orderId });
            if (order) {
                yield index_1.orderModel.updateOne({ 'userId': userId, '_id': data.orderId }, { $set: { 'status': data.status }, $push: { 'track_status': { 'status': data.status, 'statusDate': (0, moment_timezone_1.default)().format() } } });
                resolve({ result: {} });
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
// Get order Listing by vendor
function GetOrderListByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            var status = data.status;
            if (!userId || !status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.find({ 'vendorId': userId, 'status': status }, { 'orderId': 1, 'vendorId': 1, 'items': 1, 'order_date': 1, 'order_time': 1, 'rating': 1, 'status': 1, 'grand_total': 1 }).populate([{ path: 'vendorId', select: '_id name image address' }, { path: 'items.itemId', select: 'name' }]).sort({ 'order_date': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var orderCount = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': status });
            if (orders && orders.length) {
                resolve({ result: orders, count: orderCount });
            }
            else {
                resolve({ result: orders, count: orderCount });
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
// Get Order history by vendor
function GetOrderHistoryByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.find({ 'vendorId': userId, $or: [{ 'status': 'completed' }, { 'status': 'cancelled' }] }, { 'orderId': 1, 'vendorId': 1, 'items': 1, 'order_date': 1, 'order_time': 1, 'rating': 1, 'status': 1, 'grand_total': 1 }).populate([{ path: 'vendorId', select: '_id name image address' }, { path: 'items.itemId', select: 'name' }]).sort({ 'order_date': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var orderCount = yield index_1.orderModel.countDocuments({ 'vendorId': userId, $or: [{ 'status': 'completed' }, { 'status': 'cancelled' }] });
            if (orders && orders.length) {
                resolve({ result: orders, count: orderCount });
            }
            else {
                resolve({ result: orders, count: orderCount });
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
// Get order details by vendor
function GetOrderDetailsByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ '_id': data.orderId, 'vendorId': userId }).populate([{ path: 'vendorId', select: '_id name image address' }, { path: 'items.itemId', select: 'name meso_name' }, { path: 'items.size', select: 'name meso_name' }, { path: 'items.addOn.addOnsId', select: 'name meso_name' }]);
            if (order && order.length) {
                resolve({ result: order });
            }
            else {
                resolve({ result: order });
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
// Update order status by vendor
function UpdateOrderStatusByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId || !data.status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ '_id': data.orderId, 'vendorId': userId });
            if (order) {
                yield index_1.orderModel.updateOne({ '_id': data.orderId, 'vendorId': userId }, { $set: { 'status': data.status }, $push: { 'track_status': { 'status': data.status, 'statusDate': (0, moment_timezone_1.default)().format() } } });
                resolve({ result: {} });
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
// Update delivery time in order by vendor
function UpdateDeliveryTimeByVendor(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.orderId || !data.delivery_time) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var order = yield index_1.orderModel.findOne({ 'vendorId': userId, '_id': data.orderId });
            if (order) {
                yield index_1.orderModel.updateOne({ '_id': data.orderId }, { 'delivery_time': data.delivery_time });
                resolve({ result: {} });
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
// Get order listing for user
function getOrderListingForU(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.aggregate([
                {
                    $match: { 'userId': new ObjectId(userId), 'status': { $ne: 'AddToCart' } }
                },
                {
                    $group: {
                        '_id': '$categoryId'
                    }
                },
                {
                    $sort: { 'order_Date': -1 }
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            var orderCount = yield index_1.orderModel.countDocuments({ 'userId': userId, 'status': { $ne: 'AddToCart' } });
            if (orders && orders.length) {
                resolve({ result: orders, count: orderCount });
            }
            else {
                resolve({ result: [], count: 0 });
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
// Get order listing for vendor
function GetOrderListingForVen(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            var status = data.status;
            if (!userId || !status) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var orders = yield index_1.orderModel.aggregate([
                {
                    $match: { 'userId': new ObjectId(userId), 'status': status }
                },
                {
                    $group: {
                        '_id': '$categoryId'
                    }
                },
                {
                    $sort: { 'order_Date': -1 }
                },
                {
                    $skip: perPage * (pageNo - 1)
                },
                {
                    $limit: perPage
                }
            ]);
            var orderCount = yield index_1.orderModel.countDocuments({ 'userId': userId, 'status': status });
            if (orders && orders.length) {
                resolve({ result: orders, count: orderCount });
            }
            else {
                resolve({ result: [], count: 0 });
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
// Get Orders Count based on status for vendor
function getOrderStatusCountByVendor(userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var pending = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'pending' });
            var preparing = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'preparing' });
            var ready = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'ready' });
            var pickup = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'pickup' });
            var rejectCount = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'reject' });
            var delivered = yield index_1.orderModel.countDocuments({ 'vendorId': userId, 'status': 'delivered' });
            resolve({ result: { 'pending': pending, 'preparing': preparing, 'ready': ready, 'pickup': pickup, 'reject': rejectCount, 'delivered': delivered } });
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
    AddCartByUser,
    GetOrderListByUser,
    GetOrderDetailsByUser,
    GetOrderListByVendor,
    GetOrderHistoryByVendor,
    GetOrderDetailsByVendor,
    UpdateOrderStatusByUser,
    UpdateOrderStatusByVendor,
    MakeAnOrderByUser,
    UpdateDeliveryTimeByVendor,
    getOrderListingForU,
    GetOrderListingForVen,
    getOrderStatusCountByVendor
};
