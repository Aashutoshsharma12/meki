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
const jwt = require('jsonwebtoken');
const _Custom_message_1 = require("../../Custom_message/index");
const _ = require('lodash');
/**
 * user address
 *
 * @param user
 * @returns
 */
function addressRegister(body, userId, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { type = "home", addressLine1, addressLine2, addressLine3, lat, long, landmark } = body;
            const { language, timezone } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const typeLower = type.toLowerCase().trim();
            const addData = yield index_1.addressModel.findOne({ userId: userId, type: typeLower });
            if (addData) {
                reject(new errors_1.CustomError(message.addressTypeUse.replace('{{type}}', typeLower), http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                body.userId = userId;
                body.type = typeLower;
                const addressData = yield index_1.addressModel.create(body);
                if (typeLower === "home") {
                    yield index_1.userModel.findOneAndUpdate({ _id: userId }, { $set: { lat: lat, long: long } });
                }
                resolve({ message: message.success });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
function addressEdit(body, userId, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { type, addressLine1, addressLine2, addressLine3, lat, long, landmark, addressId } = body;
            const { language, timezone } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const typeLower = type.toLowerCase().trim();
            const addData = yield index_1.addressModel.findOne({ _id: addressId, userId: userId });
            if (!addData) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                if (addData.type !== typeLower) {
                    const userAdd = yield index_1.addressModel.findOne({ userId: userId, type: type });
                    if (userAdd) {
                        reject(new errors_1.CustomError(message.addressTypeUse.replace('{{type}}', typeLower), http_status_codes_1.default.BAD_REQUEST));
                    }
                    else {
                        body.type = typeLower;
                        const addressDatas = yield index_1.addressModel.updateOne({ _id: addData._id }, body, { new: true });
                        if (typeLower === "home") {
                            yield index_1.userModel.findOneAndUpdate({ _id: userId }, { $set: { lat: lat, long: long } });
                        }
                        resolve({ message: message.success });
                    }
                }
                else {
                    body.type = typeLower;
                    const addressData = yield index_1.addressModel.updateOne({ _id: addData._id }, body, { new: true });
                    if (typeLower === "home") {
                        yield index_1.userModel.findOneAndUpdate({ _id: userId }, { $set: { lat: lat, long: long } });
                    }
                    resolve({ message: message.success });
                }
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
//****Address List****/
function addressList(query, userId, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const { page = 1, pageSize = 10, search, fromDate, toDate } = query;
            let condition = {
                isDelete: false, userId: userId
            };
            if (search && search != '' && fromDate && toDate) {
                condition = Object.assign(Object.assign({}, condition), { $or: [
                        { type: { $regex: search, $options: 'i' } },
                        { addressLine1: { $regex: search, $options: 'i' } },
                        { addressLine2: { $regex: search, $options: 'i' } },
                    ], createdAt: { $gte: fromDate, $lte: toDate } });
            }
            else if (fromDate && toDate) {
                condition = Object.assign(Object.assign({}, condition), { createdAt: { $gte: fromDate, $lte: toDate } });
            }
            if (search && search != '') {
                condition = Object.assign(Object.assign({}, condition), { $or: [
                        { type: { $regex: search, $options: 'i' } },
                        { addressLine1: { $regex: search, $options: 'i' } },
                        { addressLine2: { $regex: search, $options: 'i' } },
                    ] });
            }
            const response = yield index_1.addressModel.find(condition, { addressLine1: 1, addressLine2: 1, addressLine3: 1, landmark: 1, type: 1, lat: 1, long: 1 }).skip(Number(page - 1) * Number(pageSize))
                .limit(Number(pageSize)).sort({ createdAt: -1 });
            const Total = yield index_1.addressModel.count(condition);
            if (!response) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                resolve({ response, Total });
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
function addressDelete(query, userId, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { addressId } = query;
            const { language } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const addData = yield index_1.addressModel.findOne({ _id: addressId, userId: userId });
            if (!addData) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const addressData = yield index_1.addressModel.deleteOne({ _id: addData._id });
                resolve({ message: message.success });
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    addressRegister,
    addressEdit,
    addressList,
    addressDelete
};
