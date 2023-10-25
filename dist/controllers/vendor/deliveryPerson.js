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
const ObjectId = mongoose_1.default.Types.ObjectId;
const _ = require('lodash');
/**
 * Delivery Boy
 *
 * @param
 * @returns
 */
// login delivery boy
function deliveryBoyLogin(body, headers, deviceip) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber, countryCode, role = "user" } = body;
            const { devicetoken, devicetype, timezone, language, currentversion } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const userData = yield index_1.deliveryPersonModel.findOne({
                phoneNumber,
                countryCode
            });
            if (!userData) {
                reject(new errors_1.CustomError(message.noSuchAccountExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else if (!userData.isPhoneVerified) {
                if (role == 'vendor')
                    reject(new errors_1.CustomError(message.accountUnverifiedAdmin, http_status_codes_1.default.UNAUTHORIZED));
                else
                    reject(new errors_1.CustomError(message.accountUnverifiedAdmin, http_status_codes_1.default.UNAUTHORIZED));
            }
            if (userData.isActive == false) {
                reject(new errors_1.CustomError(message.accountBlocked, http_status_codes_1.default.UNAUTHORIZED));
            }
            const token = jwt.sign({
                id: userData.id,
                role: 'delivery'
            }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' });
            const sessionObj = {
                deviceType: devicetype,
                deviceIp: deviceip,
                timezone: timezone,
                language: language,
                currentVersion: currentversion,
                deviceToken: devicetoken,
                role: 'delivery',
                jwtToken: token,
                userId: userData.id
            };
            // Login for single or multiple device and limited device
            // await userSessionModel.updateMany({"userId": userData.id}, { $set: { "isActive" : false } })
            yield index_1.userSessionModel.create(sessionObj);
            resolve({
                token,
                name: userData.name,
                image: userData === null || userData === void 0 ? void 0 : userData.image,
                email: userData.email,
                _id: userData._id,
                countryCode: userData.countryCode,
                phoneNumber: userData.phoneNumber,
                message: message.loginSuccessful
            });
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
        }
    }));
}
// Check delivery boy 
function checkAccount(user, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber, countryCode, role } = user;
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            const userData = yield index_1.deliveryPersonModel.findOne({
                phoneNumber,
                countryCode
            });
            if (!userData) {
                resolve({ isUser: false, message: message.noSuchAccountExist });
            }
            else {
                if (userData.isActive) {
                    resolve({ isUser: true, isVerified: userData.isPhoneVerified });
                }
                else {
                    reject(new errors_1.CustomError(message.accountBlocked, http_status_codes_1.default.UNAUTHORIZED));
                }
            }
        }
        catch (err) {
            reject(err);
        }
    }));
}
// Logout delivery boy
function logOut(headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = headers.authorization;
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            yield index_1.deliveryPersonModel.deleteOne({ jwtToken: token });
            resolve({ success: true, message: message.logOutSuccessful });
        }
        catch (err) {
            reject(err);
        }
    }));
}
// Edit delivery boy profile
function EditDeliveryProfile(data, userId, image, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dBoy = yield index_1.deliveryPersonModel.findOne({ '_id': userId });
            if (dBoy) {
                var obj = {
                    'name': data.name ? data.name : dBoy.name,
                    'countryCode': data.countryCode ? data.countryCode : dBoy.countryCode,
                    'phoneNumber': data.phoneNumber ? data.phoneNumber : dBoy.phoneNumber,
                    'image': image[0].path ? image[0].path : dBoy.image
                };
                yield index_1.deliveryPersonModel.updateOne({ '_id': userId }, obj);
                var Persondata = yield index_1.deliveryPersonModel.findOne({ '_id': userId });
                resolve({ result: Persondata });
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
// Update online status
function UpdateStatusByDeliveryPerson(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dPerson = yield index_1.deliveryPersonModel.findOne({ '_id': userId });
            if (dPerson) {
                var obj = {
                    'status': data.status
                };
                yield index_1.deliveryPersonModel.updateOne({ '_id': userId }, obj);
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
// Update notification status
function UpdateNotificationStatusByDeliveryBoy(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dPerson = yield index_1.deliveryPersonModel.findOne({ '_id': userId });
            if (dPerson) {
                var obj = {
                    'notificationStatus': data.notificationStatus
                };
                yield index_1.deliveryPersonModel.updateOne({ '_id': userId }, obj);
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
// Update language by delivery boy
function UpdateLanguageByDeliveryBoy(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dPerson = yield index_1.deliveryPersonModel.findOne({ '_id': userId });
            if (dPerson) {
                var obj = {
                    'language': data.language
                };
                yield index_1.deliveryPersonModel.updateOne({ '_id': userId }, obj);
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
        }
    }));
}
// Update location by delivery body
function UpdateLocationByDeliveryBoy(data, userId, headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            if (!userId || !data.lat || !data.long) {
                reject(new errors_1.CustomError(message.noDatafound, http_status_codes_1.default.BAD_REQUEST));
            }
            var dPerson = yield index_1.deliveryPersonModel.find({ '_id': userId });
            if (dPerson) {
                var obj = {
                    'lat': data.lat ? data.lat : dPerson.lat,
                    'long': data.long ? data.long : dPerson.long
                };
                yield index_1.deliveryPersonModel.updateOne({ '_id': userId }, obj);
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
// Export default
exports.default = {
    deliveryBoyLogin,
    checkAccount,
    logOut,
    EditDeliveryProfile,
    UpdateStatusByDeliveryPerson,
    UpdateNotificationStatusByDeliveryBoy,
    UpdateLanguageByDeliveryBoy,
    UpdateLocationByDeliveryBoy
};
