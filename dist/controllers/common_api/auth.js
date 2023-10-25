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
 * user SignUp
 *
 * @param user
 * @returns
 */
function signUp(user, header, deviceip) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { countryCode, phoneNumber, role } = user;
            let { devicetoken, devicetype, timezone, language, currentversion } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const users = yield index_1.userModel.findOne({ countryCode: countryCode, phoneNumber: phoneNumber, role: role });
            if (users) {
                reject(new errors_1.CustomError(message.accountAlreadyExist, http_status_codes_1.default.BAD_REQUEST));
            }
            else {
                const userData = yield index_1.userModel.create(user);
                const token = jwt.sign({
                    id: userData._id,
                    role,
                    userId: userData._id
                }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' });
                const sessionObj = {
                    deviceType: devicetype,
                    deviceIp: deviceip,
                    timezone: timezone,
                    language: language,
                    currentVersion: currentversion,
                    deviceToken: devicetoken,
                    jwtToken: token,
                    userId: userData.id,
                    role: role
                };
                yield index_1.userSessionModel.create(sessionObj);
                resolve({
                    token,
                    name: userData.name,
                    email: userData.email,
                    countryCode: userData.countryCode,
                    phoneNumber: userData.phoneNumber,
                    _id: userData._id,
                    message: message.signupSuccessful
                });
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
/**
 * user signIn.
 * @returns
 */
function login(body, header, deviceip) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber, countryCode, role = "user" } = body;
            const { devicetoken, devicetype, timezone, language, currentversion } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const userData = yield index_1.userModel.findOne({
                phoneNumber,
                countryCode,
                role
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
                role
            }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30d' });
            const sessionObj = {
                deviceType: devicetype,
                deviceIp: deviceip,
                timezone: timezone,
                language: language,
                currentVersion: currentversion,
                deviceToken: devicetoken,
                role: role,
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
            reject(err);
        }
    }));
}
/**
 * user Account verification
 *
 * @param user
 * @returns
 */
function checkAccount(user, header) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { phoneNumber, countryCode, role } = user;
            const { language } = header;
            var message = (0, _Custom_message_1.messages)(language);
            const userData = yield index_1.userModel.findOne({
                phoneNumber,
                countryCode,
                role
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
function logOut(headers) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = headers.authorization;
            const { language } = headers;
            var message = (0, _Custom_message_1.messages)(language);
            yield index_1.userSessionModel.deleteOne({ jwtToken: token });
            resolve({ success: true, message: message.logOutSuccessful });
        }
        catch (err) {
            reject(err);
        }
    }));
}
// Export default
exports.default = {
    login,
    signUp,
    checkAccount,
    logOut
};
