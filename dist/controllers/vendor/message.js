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
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Chat module
 *
 * @param
 * @returns
 */
// Get rooms by user
function getRoomsbyUser(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var obj = {
                'isActive': true,
                'isDelete': false,
                'userId': userId
            };
            var rooms = yield index_1.roomModel.find(obj).populate([{ path: 'userId', select: 'name image countryCode phoneNumber' }, { path: 'deliveryPId', select: 'name image countryCode phoneNumber' }]).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var roomCount = yield index_1.roomModel.countDocuments(obj);
            if (rooms && rooms.length) {
                resolve({ result: rooms, count: roomCount });
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
// Get room by delivery person
function getRoomByPerson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var obj = {
                'isActive': true,
                'isDelete': false,
                'deliveryPId': userId
            };
            var rooms = yield index_1.roomModel.find(obj).populate([{ path: 'userId', select: 'name image countryCode phoneNumber' }, { path: 'deliveryPId', select: 'name image countryCode phoneNumber' }]).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var roomCount = yield index_1.roomModel.countDocuments(obj);
            if (rooms && rooms.length) {
                resolve({ result: rooms, count: roomCount });
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
// Get messages
function getMessages(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = messages(language);
            var pageNo = data.pageNo ? data.pageNo : 1;
            var perPage = data.perPage ? data.perPage : 10;
            if (!userId || !data.roomId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var messages = yield index_1.messageModel.find({ 'roomId': data.roomId, 'isActive': true, 'isDelete': false }).sort({ 'createdAt': -1 }).skip(perPage * (pageNo - 1)).limit(perPage);
            var messageCount = yield index_1.messageModel.countDocuments({ 'roomId': data.roomId, 'isActive': true, 'isDelete': false });
            if (messages && messages.length) {
                resolve({ result: messages, count: messageCount });
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
// Export default
exports.default = {
    getRoomsbyUser,
    getRoomByPerson,
    getMessages
};
